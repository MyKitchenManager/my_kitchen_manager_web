import React, {Component} from 'react';
import {Button, Card, CardItem, Item, Right, Text, Thumbnail, View, Container, List, ListItem, Left} from "native-base";
import {ScrollView, TextInput} from "react-native";
import {Col, Grid} from "react-native-easy-grid";
import {Modal, WhiteSpace} from "@ant-design/react-native";
import meal from "../assets/meal.jpeg";
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from "react-native"
import {API_URL, TOKEN_KEY} from "../constant"

class RecipeDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            recipe: {}
        }
    }

    onUpdate(){
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!==null){
                    console.log(this.state.recipe.detail);
                    let detail = [];
                    for(let i = 0; i < this.state.recipe.detail.length; i++){
                        const item ={
                            ingredientId: this.state.recipe.detail[i].ingredientId,
                            ingredientVolume: this.state.recipe.detail[i].ingredientVolume,
                            unitsOfMeasure: 12
                        }
                        detail.push(item);
                    }
                    console.log(detail);
                    const params = {
                        recipeCategory: null,
                        contributorId: this.state.recipe.contributorId,
                        prepTime: 10,
                        timesCooked: 10,
                        recipeName: this.state.recipe.name,
                        instructions: this.state.recipe.method,
                        recipeDetails: detail,
                        recipeImageUrl: this.state.recipe.image
                    }
                    fetch(`${API_URL}/recipe/update/${this.state.recipe.id}`, {
                        method:"PUT",
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': accessToken
                        },
                        body: JSON.stringify(params)
                    })
                        .then((response)=>{
                            if(response.status=="200"){
                                alert("Update Success");
                                this.props.data();
                            }else{
                                console.log(response.status);
                                //console.log(response);
                            }
                        }).catch((error)=>{
                            console.log(`cannot update recipe --> ${error}`)
                    })
                }
            }).catch((error)=>{
                console.log(`Cannot get token --> ${error}`);
        })
    }

    showRecipeDetailModal(item) {
        this.setState({
            showModal: true,
            recipe: item
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
                                        <TextInput
                                            style={{alignSelf: "center", fontSize: 16, marginRight: 10, borderColor:"transparent"}}
                                            onChangeText={text=>{
                                                item.ingredientVolume = text;
                                            }}
                                        >{`${item.ingredientVolume}`}
                                        </TextInput>
                                        <Text style={{alignSelf: "center", fontSize: 16}}>{`${item.unitsOfMeasureListEntry.entry}`}</Text>
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

                {
                    Actions.currentScene == 'recipe' ?
                        <View></View>
                        :
                        <View>
                            <Button
                                style = {{margin: 10,
                                    padding: 15,
                                    alignSelf:'center',
                                    justifyContent:'center',
                                    backgroundColor:"deepskyblue",
                                    width:200}}
                                onPress={()=>{
                                    this.onUpdate();
                                    this.setState({showModal: false})
                                }}>
                                <Text >Update</Text>
                            </Button>
                        </View>
                }

            </Modal>
        );
    }
}

export default RecipeDetailModal;