import React, {Component} from 'react';
import { Text, View } from 'react-native';
import {Modal} from '@ant-design/react-native';

class EditShoppingListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }


    showEditShoppingListModal = () => {
        this.setState({
            showModal: true,
        })
    }

    render() {
        return (
            <Modal
                style={{width: 320}}
                ref={"EditShoppingListModal"}
                title="Title"
                transparent
                onClose={()=>{
                    this.setState({
                        showModal:false,
                    });
                }}
                maskClosable
                animationType = 'fade'
                visible={this.state.showModal}
                title = {<Text style = {{fontWeight:"bold", fontSize:18, textAlign: "center"}}>Enter Amount</Text>}
                closable
            >
                <View>

                </View>

            </Modal>
        );
    }
}

export default EditShoppingListModal;