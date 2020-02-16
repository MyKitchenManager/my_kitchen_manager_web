import React, {Component} from 'react';
import {Modal} from "@ant-design/react-native";
import {Button, Icon, Input, Item, Right, Text, View} from "native-base";
import ModalDropdown from "react-native-modal-dropdown";

class ShoppingListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    showShoppingListModal = () => {
        this.setState({
            showModal: true,
        })
    }

    onPressAddButton() {
        alert('I want shopping');
    }
    render() {
        return (
            <Modal
                style={{width: 320}}
                ref={"ShoppingListModal"}
                title="Title"
                transparent
                onClose={()=>{
                    this.setState({showModal:false});
                }}
                maskClosable
                animationType = 'slide'
                visible={this.state.showModal}
                title = {<Text style = {{fontWeight:"bold", fontSize:18, textAlign: "center"}}>Shopping List</Text>}
                closable
            >

                <View style={{ paddingVertical: 20 }}>

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
                        this.setState({showModal: false
                        })
                    }}>
                    <Text >Finish Shopping</Text>
                </Button>
            </Modal>
        );
    }
}

export default ShoppingListModal;