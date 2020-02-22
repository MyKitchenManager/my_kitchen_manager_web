import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, TextInput, Image, AsyncStorage, StyleSheet, FlatList} from 'react-native';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Left,
    ListItem,
    Right,
    Title,
    Picker,
    Toast,
    Row
} from "native-base";
import {Actions} from "react-native-router-flux";
import {Modal, Provider} from "@ant-design/react-native";
import {API_URL, TOKEN_KEY} from "../constant";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import Autocomplete from "react-native-autocomplete-input"
import {backgroundColor} from "react-native-calendars/src/style";

class AddRecipePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contributorId: 0,
            recipeId: 0,
            recipeName:"",
            instructions: "",
            searchIngredient: "",
            ingredients: [],
            searchable: [],
            ingredientItem: {},
            ingredientVolume: 0,
            unit: 12,
            image: ""
        }
    }

    // showAddRecipeModal() {
    //     this.setState({
    //         showModal: true,
    //         recipeId: 0
    //     })
    // }

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

    findIngredient(query){
        let text = query.toLowerCase();
        let trucks = this.state.searchable;
        let filtered = trucks.filter((item)=>{
            return item.ingredientName.toLowerCase().match(text);
        });
        if(!text||text==""){
            return [];
        }else if(!Array.isArray(filtered) && !filtered.length){
            return [];
        }else if(Array.isArray(filtered)){
            return filtered;
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
        this.setState({searchIngredient: "", ingredientVolume: ""})
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
                                Actions.meal_pool();
                            } else {
                                console.log('fail to add recipe');
                                console.log(response);
                            }
                        }).then(() => {
                            this.props.data();
                            this.setState({
                                recipeName:"",
                                instructions: "",
                                ingredientItem: {},
                                ingredients:[],
                                ingredientVolume: 0,
                                image: ""
                            });
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

    deleteItemById(id) {
        const filteredData = this.state.ingredients.filter(item => item.ingredientId !== id);
        this.setState({
            ingredients: filteredData
        })
    }

    render() {
        let search = this.findIngredient(this.state.searchIngredient);
        return (
            <Provider>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => {Actions.pop()}}>
                                <Icon name='arrow-back' style={{color: '#00BBF2', paddingLeft: 10}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Add Recipe</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <ScrollView style={{height: 680}}>
                        <View style={[styles.container,{ paddingVertical: 20, paddingHorizontal: 20}]}>
                            <Form>
                                <Item rounded style={{marginBottom: 5, alignSelf: "center",marginRight: 10, marginLeft: 10}}>
                                    {/*<Icon name="ios-search"/>*/}
                                    <Input
                                        placeholder='  Recipe Name'
                                        placeholderTextColor="lightgrey"
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
                                            <Icon type="MaterialIcons" name="clear" style={{marginLeft: 50, color: '#00BBF2'}}></Icon>
                                        </Button>
                                    </Right>
                                </Item>
                                <Row>
                                <Item rounded style={{margin: 10, alignSelf: "center", marginLeft: 10, marginRight: 0, width: 310, marginBottom: 80}}>
                                    <Icon name="ios-search"/>
                                    <Autocomplete
                                        onChangeText={text=>this.setState({searchIngredient: text})}
                                        value={this.state.searchIngredient}
                                        placeholder="Search Ingredient"
                                        data = {search}
                                        containerStyle={styles.autocompleteContainer}
                                        listStyle={{backgroundColor: 'white'}}
                                        inputContainerStyle={{width: 150, borderColor: "white"}}
                                        listContainerStyle={{width: 150}}
                                        renderItem={({item})=>(
                                                <TouchableOpacity
                                                    style={{alignItems: 'center',
                                                        backgroundColor: '#DDDDDD',
                                                        padding: 5}}
                                                    onPress={() => {
                                                        this.setState({ searchIngredient: item.ingredientName, ingredientItem: item })
                                                        search = [];
                                                    }}>
                                                    <Text>
                                                        {item.ingredientName}
                                                    </Text>
                                                </TouchableOpacity>
                                        )}
                                    />

                                    <Right>
                                        <Input
                                            placeholder='Amount'
                                            style={{marginRight:10, width: 75}}
                                            value={this.state.ingredientVolume}
                                            onChangeText={(text) => this.setState({ingredientVolume: parseInt(text)})}
                                        />
                                    </Right>

                                </Item>
                                <View style={{marginTop: 10}}>
                                    <Button transparent onPress = {() => {
                                        this.onPressAdd()
                                    }}>
                                        <Icon name='add-circle' style={{color: '#00BBF2', fontSize: 35, fontWeight: 'bold'}} />
                                    </Button>
                                </View>
                                </Row>

                                <View style={{}}>
                                    <FlatList
                                        data={this.state.ingredients}
                                        renderItem={({ item }) =>
                                            <View>
                                                <ListItem>
                                                    <Left>
                                                        <Text>{item.ingredientName}</Text>
                                                    </Left>

                                                    <Right style={{width: 50}}>
                                                        <Text style={{marginRight: 10}}>{`${item.ingredientVolume} ${item.unitsOfMeasure}`}</Text>
                                                    </Right>

                                                    <Button transparent onPress={
                                                        () => this.deleteItemById(item.ingredientId)
                                                    }>
                                                        <Icon type="MaterialIcons" name="clear" style={{marginLeft: 50, color: '#00BBF2'}}></Icon>
                                                    </Button>

                                                </ListItem>
                                            </View>
                                        }

                                        keyExtractor={item => item.ingredientId}
                                    >
                                    </FlatList>
                                </View>

                                {/*<View style={{}}>*/}
                                {/*    {this.state.ingredients.map((item)=>{*/}
                                {/*        return<ListItem key={item.id}>*/}
                                {/*            <Left>*/}
                                {/*                <Text>{item.ingredientName}</Text>*/}
                                {/*            </Left>*/}

                                {/*            <Right style={{width: 50}}>*/}
                                {/*                <Text style={{marginRight: 10}}>{`${item.ingredientVolume} ${item.unitsOfMeasure}`}</Text>*/}
                                {/*            </Right>*/}
                                {/*        </ListItem>*/}
                                {/*    })}*/}
                                {/*</View>*/}

                                <TextInput
                                    multiline
                                    style={{height: 100, margin:10, paddingTop:10, borderColor:"grey",borderWidth:1, elevation:5}}
                                    placeholder="Type your method!"
                                    onChangeText={text=>this.setState({instructions: text})}
                                    value = {this.state.instructions}
                                />
                            </Form>
                            <Button transparent onPress={this._pickImage}>
                                <Icon name="camera" style={{color: '#00BBF2', fontSize: 35, fontWeight: 'bold'}}/>
                            </Button>
                            <View style={{alignItems: 'center'}}>
                            {this.state.image?
                                <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200}} />
                                : <View></View>}
                            </View>
                        </View>
                        </ScrollView>
                        <Button
                            style = {{
                                alignSelf:'center',
                                justifyContent:'center',
                                backgroundColor:"deepskyblue",
                                width: 360,
                                }}
                            onPress={()=>{
                                if(this.state.image===""){
                                    alert("Please upload your image")
                                }else{this.setState({
                                    showModal:false,
                                });
                                    this.onAddItem();
                                }
                            }}>
                            <Text >ADD</Text>
                        </Button>
                    </Content>
                </Container>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 8
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }
});


export default AddRecipePage;