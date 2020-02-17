import React, {Component} from 'react';
import {Button, Icon, Input, Item, Right, Text, View, Picker, Form} from "native-base";
import ModalDropdown from "react-native-modal-dropdown";
import {Modal} from "@ant-design/react-native";
import {AsyncStorage} from "react-native"
import {API_URL, TOKEN_KEY} from "../constant"
import {acc} from "react-native-reanimated"

class AddRecipeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            recipeId: 0,
            recipeName:"",
            instructions: "",
            ingredients: [{}],
            searchable: [],
            ingredientId: 0,
            ingredientVolume: 0,
            unit: 6
        }
    }

    showAddRecipeModal() {
        this.setState({
            showModal: true,
            recipeId: 0
        })
    }

    onValueChange(value){
        this.setState({ingredientId: value})
    }

    onPressAdd(){
        const item = {
            ingredientId : this.state.ingredientId,
            ingredientVolume : this.state.ingredientVolume,
            unitsOfMeasure : this.state.unit
        }
        this.setState(prevState=>({
            ingredients: [...prevState.ingredients, item]
        }));
        console.log(this.state.ingredients);
    }
    componentDidMount() {
        this.setState({searchable:[]});
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
                }
            })
    }

    onAddItem(){
        if(this.state.recipeId==0){
            alert("Please select a recipe");
        }
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    let list = this.state.searchable;
                    let id = this.state.recipeId;
                    fetch(`${API_URL}/recipe/add`, {
                        method:"POST",
                        headers:{
                            'Authorization':accessToken,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            recipeCategory: list[id-1].recipeCategory,
                            contributorId: 241,
                            prepTime: 10,
                            timesCooked: 10,
                            recipeName: list[id-1].recipeName,
                            instructions: list[id-1].instructions,
                            recipeDetails: list[id-1].recipeDetails
                        }),
                    }).then((response)=>{
                        if(response.status=="200"){
                            console.log("Successfully Added recipe");
                        }
                    }).then(()=>{
                        this.props.data();
                    })
                        .catch((error)=>{
                        console.log(`Unable to add recipe -->${error}`);
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
                    this.setState({showModal:false});
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
                            <Icon name="ios-search"/>
                            <Input
                                placeholder='Enter Recipe Name'
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
                        {this.state.ingredients.map((item)=>{
                            return <Item rounded style={{margin: 10, width: 290, height:50, alignSelf: "center"}}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholder="Select Ingredient"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={{ width: 160 }}
                                    selectedValue={this.state.ingredientId}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    {this.state.searchable.map((item)=>{
                                        return <Picker.Item label={item.ingredientName} value={item.ingredientId}/>
                                    })}
                                </Picker>
                                <Right>
                                   <Input
                                       placeholder='Amount'
                                       value={this.state.ingredientVolume}
                                       onChangeText={(text) => this.setState({ingredientVolume: parseInt(text)})}
                                   />
                                </Right>
                            </Item>
                        })}
                        <Button transparent onPress = {() => this.onPressAdd()}>
                            <Icon name='add-circle' />
                        </Button>
                    </Form>
                </View>

                <Button
                    style = {{margin: 10,
                        padding: 15,
                        alignSelf:'center',
                        justifyContent:'center',
                        backgroundColor:"deepskyblue",
                        width:200}}
                    onPress={()=>{
                        this.setState({showModal: false
                        })
                        this.onAddItem();
                    }}>
                    <Text >ADD</Text>
                </Button>
            </Modal>
        );
    }
}

export default AddRecipeModal;