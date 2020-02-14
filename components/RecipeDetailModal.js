import React, {Component} from 'react';
import {Button, Card, CardItem, Item, Right, Text, Thumbnail, View, Container, List, ListItem, Left} from "native-base";
import {ScrollView} from "react-native";
import {Col, Grid} from "react-native-easy-grid";
import {Modal, WhiteSpace} from "@ant-design/react-native";
import meal from "../assets/meal.jpeg";
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
                style={{width: 380}}
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
                    <Thumbnail source={meal} style ={{height: 200, width: 200, alignSelf:"center"}}/>
                    <View>
                        <Text style={{fontSize: 25, fontWeight: '4', alignSelf: 'center', margin: 20}}>Orange Chicken</Text>
                    </View>

                    <WhiteSpace />

                    <ScrollView>
                        <Text style={{marginRight: 10, fontSize: 20, marginBottom:10, fontWeight: "bold"}}>Recipe</Text>
                        <List>
                            <ListItem>
                                <Left>
                                    <Text>Name</Text>
                                </Left>

                                <Right style={{width: 50}}>
                                    <Text style={{marginRight: 10}}>Amount</Text>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>Saffron</Text>
                                </Left>

                                <Right style={{width: 50}}>
                                    <Text style={{marginRight: 10}}>10 g</Text>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>Yam</Text>
                                </Left>

                                <Right style={{width: 50}}>
                                    <Text style={{marginRight: 10}}>50 g</Text>
                                </Right>
                            </ListItem>
                        </List>



                    <View>
                        <Text style={{marginRight: 10, fontSize: 20, marginBottom:15, marginTop: 20, fontWeight: "bold"}}>Method</Text>
                        <WhiteSpace/>
                        <Text>this is the detail of cooking this food</Text>
                    </View>
                    </ScrollView>
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