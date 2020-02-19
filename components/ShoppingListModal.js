import React, {Component} from 'react';
import {Modal} from "@ant-design/react-native";
import {
    Body,
    Button,
    Icon,
    Input,
    Item,
    Left,
    List,
    ListItem,
    Right,
    Row,
    Text,
    Thumbnail,
    View,
    CheckBox,
    Spinner,
    Content
} from "native-base";
import {SafeAreaView, FlatList, StyleSheet, ScrollView, AsyncStorage} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import PickerCheckBox from 'react-native-picker-checkbox';
import Constants from 'expo-constants';
import meal from '../assets/meal.jpeg';
import {API_URL, TOKEN_KEY} from "../constant";

class ShoppingListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            loading: true,
            checkedBox: [],
            items: [],
        }
    }

    getShoppingList(){
        this.setState({items: [], loading: true});
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    fetch(`${API_URL}/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': accessToken
                        }
                    }).then((response) => {
                        if (response.status == '200') {
                            return response.json();
                        }
                    }).then((responseData) => {
                        let userId = responseData.userId;
                        fetch(`${API_URL}/shoppinglist/${userId}`, {
                            method: "GET",
                            headers:{
                                "Authorization": accessToken
                            }
                        }).then((response)=>{
                            if(response.status == "200"){
                                return response.json();
                            }else{
                                alert(`Error in fetching data --> status ${response.status}`);
                            }
                        }).then((responseData)=>{
                            for (let i = 0; i < responseData[0].length; i++) {
                                console.log('responseData[i]:' + responseData[0][i]);
                                let id = responseData[0][i].i.ingredientId
                                let name = responseData[0][i].i.ingredientName;
                                let image = responseData[0][i].i.imageUrl;
                                let volume = responseData[0][i].volume;
                                const item = {
                                    id: id,
                                    name: name,
                                    image: image,
                                    volume: volume
                                };
                                const list = this.state.items.concat(item);
                                this.setState({items: list, loading: false});
                            }
                        }).done()
                    })
                }
            })
            .catch((error)=>{
                console.log("Error in fetching recipe list");
            })
    }

    showShoppingListModal = () => {
        this.setState({
            showModal: true,
        })
        this.getShoppingList();
    }

    onFinishShoppingButton() {
        console.log('pressed finish shopping button')
    }

    onPressCheckBox(id) {
        let tmp = this.state.checkedBox;

        if ( tmp.includes( id ) ) {
            tmp.splice( tmp.indexOf(id), 1 );
        } else {
            tmp.push( id );
        }

        this.setState({
            checkedBox: tmp
        });
    }

    render() {
        return (
            <Modal
                style={{width: 350, height: 580}}
                ref={"ShoppingListModal"}
                title="Title"
                transparent
                onClose={()=>{
                    this.setState({showModal:false});
                }}
                maskClosable
                animationType = 'slide'
                visible={this.state.showModal}
                title = {<Text style = {{fontWeight:"bold", fontSize: 20, textAlign: "center"}}>Shopping List</Text>}
                closable
            >
                {
                    this.state.loading ?
                        <View>
                            <Spinner color='deepskyblue'/>
                        </View>
                        :
                        <ScrollView style={{marginTop: 20, height: 430}}>
                            <List>
                                {this.state.items ? this.state.items.map((item)=>{
                                    return <ListItem thumbnail key={item.id}>
                                        <Left>
                                            <Thumbnail square source={{ uri: item.image}} />
                                        </Left>
                                        <Body>
                                            <Text style={{fontSize: 16, fontWeight: '15', marginBottom: 5}}>{item.name}</Text>
                                            <Text note numberOfLines={1} style={{fontWeight: '15'}}>{item.volume} g</Text>
                                        </Body>
                                        <Right>
                                            <CheckBox style={{marginRight: 20}} checked={this.state.checkedBox.includes(item.id) ? true : false}
                                                      onPress={()=>this.onPressCheckBox(item.id)}/>
                                        </Right>
                                    </ListItem>
                                }):<ListItem>
                                    <body>
                                    <Text>There is no items in shopping list!</Text>
                                    </body>
                                </ListItem>}
                            </List>
                        </ScrollView>
                }

                <Button
                    style = {{margin: 10,
                        padding: 15,
                        alignSelf:'center',
                        justifyContent:'center',
                        backgroundColor:"deepskyblue",
                        width:200,
                        marginTop: 20
                    }}
                    onPress={()=>{
                        this.onFinishShoppingButton(),
                        this.setState({
                            showModal: false,
                            items: [],
                            loading: false,
                            checkedBox: []
                        })
                    }}>
                    <Text >Finish Shopping</Text>
                </Button>
            </Modal>
        );
    }
}

export default ShoppingListModal;