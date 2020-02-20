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
            recipe: {}
        }
    }

    onUpdate(){

    }

    showRecipeDetailModal(item) {
        this.setState({
            showModal: true,
            recipe: item
        });
        console.log(this.state.recipe);
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
                    <Thumbnail source={{uri:this.state.recipe.image}} style ={{height: 200, width: 200, alignSelf:"center"}}/>
                    <View>
                        <Text style={{fontSize: 25, fontWeight: '400', alignSelf: 'center', margin: 20}}>{this.state.recipe.name}</Text>
                    </View>

                    <WhiteSpace />

                    <ScrollView style = {{height: 270}}>
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
                            {this.state.recipe.detail?this.state.recipe.detail.map((item)=>{
                                return <ListItem>
                                    <Left>
                                        <Text>{item.ingredientIdJoin.ingredientName}</Text>
                                    </Left>

                                    <Right style={{width: 50}}>
                                        <Text style={{marginRight: 10}}>{`${item.ingredientVolume} ${item.unitsOfMeasureListEntry.entry}`}</Text>
                                    </Right>
                                </ListItem>
                            }):<ListItem></ListItem>}

                        </List>
                        <View>
                            <Text style={{marginRight: 10, fontSize: 20, marginBottom:15, marginTop: 20, fontWeight: "bold"}}>Method</Text>
                            <WhiteSpace/>
                            <Text>{this.state.recipe.method}</Text>
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
                        this.onUpdate.bind(this);
                        this.setState({showModal: false})
                    }}>
                    <Text >Update</Text>
                </Button>
            </Modal>
        );
    }
}

export default RecipeDetailModal;