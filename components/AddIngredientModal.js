import React, {Component} from 'react';
import {Button, Text, View, Input, Item, Form, Picker, Icon, Grid, Col, Right} from "native-base";
import {Modal} from "@ant-design/react-native";
import ModalDropdown from "react-native-modal-dropdown";
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
            searchIngredient: "",
            newItemName: "",
            newItemVolume: "",
            newItemUnit: "",
        }
    }

    showAddIngredientModal = () => {
        //this.refs.InventoryAddItemModal.open();
        this.setState({showModal: true})
    }

    onValueChange(value) {
        this.setState({
            selected2: value,
        });
    }

    onPressAddButton() {
        //add item to My Inventory


        //then clean the table

    }

    render() {
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
                        <Input
                            placeholder='Name'
                            value={this.state.searchIngredient}
                            onChangeText={(text) => this.setState({searchIngredient: text})}
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
                    width:200}} onPress={()=>{
                    this.setState({showModal: false})

                }}>
                    <Text >ADD</Text>
                </Button>
            </Modal>


        );
    }
}

export default AddIngredientModal;
