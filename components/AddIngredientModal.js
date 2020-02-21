import React, {Component} from 'react';
import {Button, Text, View, Input, Item, Form, Picker, Icon, Grid, Col, Right} from "native-base";
import {Modal} from "@ant-design/react-native";
import ModalDropdown from "react-native-modal-dropdown";
import {AsyncStorage, TouchableOpacity} from "react-native"
import {API_URL, TOKEN_KEY} from "../constant"
import Autocomplete from "react-native-autocomplete-input";
//import Modal from 'react-native-modalbox';

/*
This modal component shows inventory item info adding to inventory
 */
class AddIngredientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selected2: undefined,
            searchable: [],
            searchIngredient: "",
            newItemName: "",
            newItemVolume: "",
            newItemUnit: "",
        }
    }

    showAddIngredientModal = () => {
        //this.refs.InventoryAddItemModal.open();
        this.setState({
            showModal: true,
        })
    }

    onValueChange(value) {
        this.setState({
            selected2: value,
        });
    }

    componentDidMount() {
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
            }).catch((error)=>{
                console.log(`Cannot get Token --> ${error}`);
        })
    }

    onAddItem(){
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    if(this.state.newItemVolume==""||this.state.newItemUnit==""){
                        alert("Every entry should not be empty");
                    }else{
                        console.log(accessToken);
                        fetch(`${API_URL}/inventory`, {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization':  accessToken
                            },
                            body: JSON.stringify({
                                ingredientId : 80,
                                inventoryVolume: this.state.newItemVolume,
                                unitsOfMeasure: 13,
                                userId: this.props.data,
                                purchaseDate:"2020-02-04T12:00:00.000+0000",
                                expirationDate:"2020-02-19T12:00:00.000+0000"
                            })
                        }).then((response)=>{
                            if(response.status == "201"){
                                alert("Item successfully added");
                            }else{
                                console.log(response.status);
                            }
                        }).catch((error)=>{
                            console.log(`Error in adding item in inventory --> ${error}`);
                        })
                    }
                }
            })
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

    render() {
        const search = this.findIngredient(this.state.searchIngredient);
        console.log(search);
        return (
            <Modal
                style={{width: 320}}
                ref={"AddIngredientModal"}
                title="Title"
                transparent
                onClose={()=>{
                    this.setState({showModal:false});
                }}
                maskClosable
                animationType = 'slide'
                visible={this.state.showModal}
                title = {<Text style = {{fontWeight:"bold", fontSize:18, textAlign: "center"}}>Add Item</Text>}
                closable
            >

                <View style={{ paddingVertical: 20 }}>
                    {/*Search Bar*/}
                    <Item rounded style={{margin: 10, width: 290, height:50, alignSelf: "center"}}>
                        <Icon name="ios-search"/>
                        <Autocomplete
                            onChangeText={text=>this.setState({searchIngredient: text})}
                            placeholder="Search Ingredient"
                            data = {search}
                            inputContainerStyle={{width: 100}}
                            listContainerStyle={{width: 100}}
                            renderItem={({ingredientName})=>(
                                <TouchableOpacity onPress={() => this.setState({ searchIngredient: ingredientName })}>
                                    <Text>
                                        {ingredientName}
                                    </Text>
                                </TouchableOpacity>
                            )}
                       />

                        <Right>
                            <Button transparent onPress={
                                ()=>{
                                    if(this.state.searchIngredient!=""){
                                        this.setState({searchIngredient:""});
                                    }
                                }
                            }>
                                <Icon type="MaterialIcons" name="clear"></Icon>
                            </Button>
                        </Right>
                    </Item>

                    <Item  rounded style={{ alignSelf: "center", margin: 10, width: 290, height: 50 }}>
                        <Input
                            style={{marginLeft: 10}}
                            placeholder='Volume'
                            value={this.state.newItemVolume}
                            onChangeText={(text) => this.setState({newItemVolume: text})}
                        />
                        <Right>
                            <ModalDropdown
                                animated
                                options={['lbs', 'g', 'kg','ounce',]}
                                style={{marginRight:10}}
                                dropdownStyle={{width: 80, marginTop: 10, height: 150}}
                                dropdownTextStyle={{fontSize: 14}}
                                onSelect={(index, value)=>{
                                    this.setState({newItemUnit: value});
                                }}
                            >
                                <Text style={{fontSize:15, color:'grey', alignSelf: "center", justifyContent:"center"}}>{
                                    this.state.newItemUnit==""?"Select Unit":this.state.newItemUnit
                                }</Text>
                            </ModalDropdown>
                        </Right>
                    </Item>
                </View>

                <Button
                    onPress={() => {this.onPressAddButton()}}
                    style = {{margin: 10,
                    padding: 15,
                    alignSelf:'center',
                    justifyContent:'center',
                    backgroundColor:"deepskyblue",
                    width:200}}
                        onPress={()=>{
                        this.onAddItem();
                        this.props.data2();
                        this.setState({showModal: false
                    })
                }}>
                    <Text >ADD</Text>
                </Button>
            </Modal>


        );
    }
}

export default AddIngredientModal;
