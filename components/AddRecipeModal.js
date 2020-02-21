import React, {Component} from 'react';
import {Button, Icon, Input, Item, Right, Text, View, Picker, Form, Left, ListItem} from "native-base";
import {Modal} from "@ant-design/react-native";
import {AsyncStorage, TextInput, ScrollView, Image} from "react-native"
import {API_URL, TOKEN_KEY} from "../constant"
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";



class AddRecipeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            contributorId: 0,
            recipeId: 0,
            recipeName:"",
            instructions: "",
            ingredients: [],
            searchable: [],
            ingredientItem: {},
            ingredientVolume: 0,
            unit: 12,
            image: ""
        }
    }

    showAddRecipeModal() {
        this.setState({
            showModal: true,
            recipeId: 0
        })
    }

    onValueChange(value){
        this.setState({ingredientItem: value})
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
        console.log('image URL in state:' + this.state.image);
    }

    onPressAdd(){
        console.log(this.state.ingredientItem);
        const item = {
            ingredientId : this.state.ingredientItem.ingredientId,
            ingredientName: this.state.ingredientItem.ingredientName,
            ingredientVolume : this.state.ingredientVolume,
            unitsOfMeasure : "g"
        }
        this.setState(prevState=>({
            ingredients: [...prevState.ingredients, item]
        }));
        console.log(this.state.ingredients);
    }
    componentDidMount() {
        this.setState({searchable:[]});
        this.getPermissionAsync();
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    fetch(`${API_URL}/listentry/ingredients`,{
                        method: "GET",
                        headers:{
                            "Authorization": accessToken
                        }
                    }).then((response)=>{
                        if(response.status=="200"){
                            return response.json();
                        }else{
                            alert("Cannot get ingredient list");
                        }
                    }).then((responseData)=>{
                        console.log(responseData);
                        this.setState({searchable:responseData});
                    }).done()
                    return accessToken;
                }
            }).then((accessToken)=>{
                if(accessToken!=null){
                    fetch(`${API_URL}/`,{
                        method: "GET",
                        headers:{
                            "Authorization": accessToken
                        }
                    }).then((response)=>{
                        if(response.status=='200'){
                            return response.json();
                        }
                    }).then((responseData)=>{
                        this.setState({contributorId: responseData.userId});
                    }).catch((error)=>{
                        console.log(`Error in fetching user id --> ${error}`);
                    })
                }
        })
    }

    onAddItem(){
        let list = [];
            console.log(this.state.ingredients);
            for (let i = 0; i < this.state.ingredients.length; i++) {
                let item = {
                    ingredientId: this.state.ingredients[i].ingredientId,
                    ingredientVolume: this.state.ingredients[i].ingredientVolume,
                    unitsOfMeasure: this.state.unit
                }
                console.log(item);
                list.push(item);
            }
        console.log(list);
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                   if(accessToken!=null) {
                       console.log(list);
                       let formData = new FormData();
                       formData.append("image", {
                           uri: this.state.image,
                           type: 'image',
                           name: 'image'
                       });
                       console.log(formData);

                       fetch(`${API_URL}/uploadimage`, {
                           method:"POST",
                           headers:{
                               'Accept': 'application/json',
                               'Content-Type':'multipart/form-data',
                               'Authorization': accessToken,
                           },
                           body: formData
                       }).then(response => {
                           if (response.status == "200") {
                               console.log('Get image url successfully');
                               return response.json();
                           } else {
                               alert("Cannot get image response");
                           }
                       }).then(response  => {
                           console.log('result below:-----');
                           console.log(response.image_url);
                           fetch(`${API_URL}/recipe/add`, {
                               method: "POST",
                               headers: {
                                   'Authorization': accessToken,
                                   'Accept': 'application/json',
                                   'Content-Type': 'application/json',
                               },
                               body: JSON.stringify({
                                   contributorId: this.state.contributorId,
                                   prepTime: 10,
                                   timesCooked: 10,
                                   recipeName: this.state.recipeName,
                                   instructions: this.state.instructions,
                                   recipeDetails: list,
                                   recipeImageUrl: response.image_url
                               }),
                           }).then((response) => {
                               if (response.status == "200") {
                                   console.log("Successfully Added recipe");
                               } else {
                                   console.log('fail to add recipe');
                                   console.log(response);
                               }
                           }).then(() => {
                               this.props.data();
                           })
                               .catch((error) => {
                                   console.log(`Unable to add recipe -->${error}`);
                               })
                       }).catch((error) => {
                           console.log(`Unable to upload image -->${error}`);
                       })

                   }
            }).catch((error)=>{
                console.log(`Unable to get token --> ${error}`);
        })
    }

    render() {
        return (
            <Modal
                style={{width: 320}}
                ref={"AddRecipeModal"}
                title="Title"
                transparent
                onClose={()=>{
                    this.setState({
                        showModal:false,
                        recipeName:"",
                        instructions: "",
                        ingredientItem: {},
                        ingredients:[],
                        ingredientVolume: 0,
                        image: ""
                    });
                }}
                maskClosable
                animationType = 'slide'
                visible={this.state.showModal}
                title = {<Text style = {{fontWeight:"bold", fontSize:18, textAlign: "center"}}>Add Recipe</Text>}
                closable
            >

                <View style={{ paddingVertical: 20 }}>
                    <Form>
                        <Item rounded style={{margin: 10, width: 290, height:50, alignSelf: "center"}}>
                            {/*<Icon name="ios-search"/>*/}
                            <Input
                                placeholder='Recipe Name'
                                value={this.state.recipeName}
                                onChangeText={(text) => this.setState({recipeName: text})}
                            />
                            <Right>
                                <Button transparent onPress={
                                    ()=>{
                                        if(this.state.recipeName!=""){
                                            this.setState({recipeName:""});
                                        }
                                    }
                                }>
                                    <Icon type="MaterialIcons" name="clear"></Icon>
                                </Button>
                            </Right>
                        </Item>
                        <Item rounded style={{margin: 10, width: 290, height:50, alignSelf: "center"}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder="Select Ingredient"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={{ width: 160 }}
                                selectedValue={this.state.ingredientItem}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {this.state.searchable.map((item)=>{
                                    return <Picker.Item label={item.ingredientName} value={item}/>
                                })}
                            </Picker>
                            <Right>
                                <Input
                                    placeholder='Amount'
                                    style={{marginRight:10, width: 75}}
                                    value={this.state.ingredientVolume}
                                    onChangeText={(text) => this.setState({ingredientVolume: parseInt(text)})}
                                />
                            </Right>
                        </Item>
                        <ScrollView>
                            {this.state.ingredients.map((item)=>{
                                return <ListItem>
                                    <Left>
                                        <Text>{item.ingredientName}</Text>
                                    </Left>

                                    <Right style={{width: 50}}>
                                        <Text style={{marginRight: 10}}>{`${item.ingredientVolume} ${item.unitsOfMeasure}`}</Text>
                                    </Right>
                                </ListItem>
                            })}
                        </ScrollView>
                        <Button transparent onPress = {() => this.onPressAdd()}>
                            <Icon name='add-circle' />
                        </Button>

                        <TextInput
                            multiline
                            style={{height: 100, margin:10, paddingTop:10, borderColor:"grey",borderWidth:1, elevation:5}}
                            placeholder="Type your method!"
                            onChangeText={text=>this.setState({instructions: text})}
                            value = {this.state.instructions}
                        />
                    </Form>

                    <Button transparent onPress={this._pickImage}>
                        <Icon name="camera"/>
                    </Button>
                    {this.state.image?
                        <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
                        : <View></View>}

                </View>

                <Button
                    style = {{margin: 10,
                        padding: 15,
                        alignSelf:'center',
                        justifyContent:'center',
                        backgroundColor:"deepskyblue",
                        width:200}}
                    onPress={()=>{
                        this.setState({
                            showModal:false,
                            recipeName:"",
                            instructions: "",
                            ingredientItem: {},
                            ingredients:[],
                            ingredientVolume: 0,
                            image: ""
                        });
                        this.onAddItem();
                    }}>
                    <Text >ADD</Text>
                </Button>
            </Modal>
        );
    }
}

export default AddRecipeModal;