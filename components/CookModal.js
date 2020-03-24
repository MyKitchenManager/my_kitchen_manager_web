import React, {Component} from 'react';
import {Button, Card, CardItem, Item, Right, Text, Thumbnail, View, Container, List, ListItem, Left} from "native-base";
import {Alert, ScrollView} from "react-native";
import {Col, Grid} from "react-native-easy-grid";
import {Modal, WhiteSpace} from "@ant-design/react-native";
import meal from "../assets/meal.jpeg";
import Actions from 'react-native-router-flux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

class RecipeDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            recipe: {},
            hasCooked: false
        }
    }

    onUpdate(){

    }

    showCookModal(item) {
        this.setState({
            showModal: true,
            recipe: item,
        });
        console.log('recipe in CookModal:' + this.state.recipe);
    }

    onPressYes() {
        // close modal
        this.setState({showModal: false});

        //delete item on parent page (inventory)
        console.log(this.state.Item);
        this.props.data(this.state.recipe.id);
    }

    render() {
        return (
            <Modal
                style={{width: wp("93%"), height: hp("80%")}}
                ref={"CookModal"}
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

                    <ScrollView style = {{height: hp("30%")}}>
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
                            {this.state.recipe.detail?this.state.recipe.detail.map((item, index)=>{
                                return <ListItem key = {index}>
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
                        this.setState({
                            showModal: false,
                            hasCooked: true
                        });
                        //this.props.data(this.state.recipe.id);
                        Alert.alert(
                            'Pay Attention',
                            'Finish Cooking Already?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {text: 'Yes', onPress: () => {this.onPressYes()}},
                            ],
                            {cancelable: false},
                        );
                    }}>
                    <Text >Finish Cook</Text>
                </Button>
            </Modal>
        );
    }
}

export default RecipeDetailModal;
// import React, {Component} from 'react';
// import {Text} from "native-base";
// import {Modal} from "@ant-design/react-native";
//
// class CookModal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             showModal: false
//         }
//     }
//
//     showCookModal() {
//         this.setState({showModal: true})
//     }
//     render() {
//         return (
//             <Modal
//                 style={{width: 380}}
//                 ref={"CookModal"}
//                 title="Title"
//                 transparent
//                 onClose={()=>{
//                     this.setState({showModal:false});
//                 }}
//                 maskClosable
//                 animationType = 'slide'
//                 visible={this.state.showModal}
//                 title = {<Text style = {{fontWeight:"bold", fontSize:18, textAlign: "center"}}>Recipe Detail</Text>}
//                 closable
//             >
//             </Modal>
//         );
//     }
// }
//
// export default CookModal;