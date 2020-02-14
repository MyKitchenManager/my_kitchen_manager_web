import React, {Component} from 'react';
import {Button, Text, View} from "native-base";
import {Modal} from "@ant-design/react-native";

class RecipeDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    showRecipeDetailModal() {
        this.setState({
            showModal: true
        });
    }
    render() {
        return (
            <Modal
                style={{width: 320}}
                ref={"RecipeDetailModal"}
                title="Title"
                transparent
                onClose={()=>{
                    this.setState({showModal:false});
                }}
                maskClosable
                animationType = 'slide'
                visible={this.state.showModal}
                title = {<Text style = {{fontWeight:"bold", fontSize:18, textAlign: "center"}}>Recipe Detail</Text>}
                closable
            >

                <View style={{ paddingVertical: 20 }}>
                    <Text>See recipe details here</Text>
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
                    <Text >Update</Text>
                </Button>
            </Modal>
        );
    }
}

export default RecipeDetailModal;