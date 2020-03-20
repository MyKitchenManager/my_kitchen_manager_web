import React, {Component} from 'react';
import { Modal, Text, View } from 'react-native';

class EditShoppingListModal extends Component {
    state = {
        showModal: false
    }

    showEditShoppingListModal = () => {
        this.setState({
            showModal: true,
        })
    }
    render() {
        return (
            <div>
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
                    animationType = 'slide'
                    visible={this.state.showModal}
                    title = {<Text style = {{fontWeight:"bold", fontSize:18, textAlign: "center"}}>Enter Actual Amount</Text>}
                    closable
                >
                    <View>

                    </View>

                </Modal>
            </div>
        );
    }
}

export default EditShoppingListModal;