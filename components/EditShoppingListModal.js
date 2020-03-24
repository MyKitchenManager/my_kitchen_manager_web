import React, {Component} from 'react';
import { View } from 'react-native';
import {Modal} from '@ant-design/react-native';
import {Form, Input, Item, Button, Text} from "native-base"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

class EditShoppingListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            item: {
                id: 0,
                volume: 0,
            },
        }
    }

    showEditShoppingListModal = (item) => {
        this.setState({
            showModal: true,
            item: item
        })
        //console.log(item);
    }

    render() {
        return (
            <Modal
                style={{width: wp("70%")}}
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
                title = {<Text style = {{fontWeight:"bold", fontSize: 18, textAlign: "center"}}>Edit Amount</Text>}
                closable
            >
                <View style={{marginTop: 20}}>
                    <Item rounded style={{marginBottom: 5, alignSelf: "center",marginRight: 10, marginLeft: 10}}>

                        <Input
                            placeholder='  Edited Amount'
                            placeholderTextColor="lightgrey"
                            value={this.state.item.volume}
                            onChangeText={(text) => {
                                let newItem = this.state.item;
                                newItem.volume = text;
                                this.setState({item: newItem});
                            }}
                        />
                    </Item>
                    <Button primary
                            style={{margin: 15, paddingTop: 10, justifyContent: "center"}}
                            onPress={()=>{
                                console.log(this.state.item);
                                this.props.data(this.state.item);
                                this.setState({showModal : false})
                        }}>
                        <Text style={{fontSize: 16, textAlign: "center", color: "white", justifyContent: "center"}}>Edit</Text>
                    </Button>
                </View>
            </Modal>
        );
    }
}

export default EditShoppingListModal;