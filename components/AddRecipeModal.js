import React, {Component} from 'react';
import {Button, Icon, Input, Item, Right, Text, View} from "native-base";
import ModalDropdown from "react-native-modal-dropdown";
import {Modal} from "@ant-design/react-native";

class AddRecipeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    showAddRecipeModal() {
        this.setState({
            showModal: true,
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
                    <Text>Add your recipe here</Text>
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
                    }}>
                    <Text >ADD</Text>
                </Button>
            </Modal>
        );
    }
}

export default AddRecipeModal;