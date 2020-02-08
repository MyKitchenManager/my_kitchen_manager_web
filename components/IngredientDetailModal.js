import React, {Component} from 'react';
import {Button, Text, View, Input, Item, Form, Picker, Icon, Grid, Col } from "native-base";
import {Modal} from "@ant-design/react-native";

//import Modal from 'react-native-modalbox';

/*
This modal component shows inventory item info adding to inventory
 */
class IngredientDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selected2: undefined,
            newItemName: '',
            newItemVolume: '',
            newItemUnit: '',
        }
    }

    showIngredientDetailModal = () => {
        //this.refs.InventoryAddItemModal.open();
        this.setState({showModal: true})
    }

    onValueChange(value) {
        this.setState({
            selected2: value,
        });
    }

    render() {
        return (
            <Modal
                ref={"IngredientDetailModal"}
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
                    <Item>
                        <Input
                            placeholder='Item Name'
                            value={this.state.newItemName}
                            onChangeText={(text) => this.setState({newItemName: text})}
                        />
                        <Icon name="ios-search" />
                    </Item>

                    <Item  style={{ textAlign: 'center', padding: 10, height: 35 }}>
                        <Input
                            placeholder='Item Volume'
                            value={this.state.newItemName}
                            onChangeText={(text) => this.setState({newItemVolume: text})}
                        />
                    </Item>

                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select the Unit"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected2}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="LB" value="key0" />
                            <Picker.Item label="KG" value="key1" />
                            <Picker.Item label="G" value="key2" />
                        </Picker>
                    </Item>
                </View>

                <Button style = {{margin: 10,
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

export default IngredientDetailModal;

/*
<Modal
    ref={"InventoryAddItemModal"}
    style={{
        justifyContent: 'center',
        borderRadius: 20,
        shadowRadius: 10,
        width: 280,
        height: 280
    }}
    position='center'
    backdrop={true}
    onClosed={ () => {
        //alert("Modal Closed");
    }}
>
    <Text>New food's information</Text>
</Modal>

 */