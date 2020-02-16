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
            searchable: []
        }
    }

    showAddRecipeModal() {
        this.setState({
            showModal: true,
            recipeId: 0
        })
    }

    onValueChange(value){
        this.setState({recipeId: value});
    }

    componentDidMount() {
        this.setState({searchable:[]});
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    fetch(`${API_URL}/recipe/all`,{
                        method: "GET",
                        headers:{
                            "Authorization": accessToken
                        }
                    }).then((response)=>{
                        if(response.status=="200"){
                            return response.json();
                        }else{
                            alert("Cannot get recipe list");
                        }
                    }).then((responseData)=>{
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
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name={"arrow-down"}/>}
                            placeholder = {<Text>Select Recipe</Text>}
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="deepskyblue"
                            selectedValue={this.state.recipeId}
                            onValueChange = {this.onValueChange.bind(this)}
                        >
                            <Picker.Item label={<Text style={{color: "#bfc6ea"}}>Select Recipe</Text>} value={0}/>
                            {this.state.searchable.map((item)=>{
                                return <Picker.Item label={item.recipeName} value={item.id} key={item.id}/>
                            })}
                        </Picker>
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