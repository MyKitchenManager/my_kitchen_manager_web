import React, {Component} from 'react';
import {Container, Content, Text, Header, Left, Button, Icon, Body, Title, Right, Item, Input, Card, CardItem, Thumbnail} from "native-base"
import {ScrollView, Image} from "react-native";
import {Grid, Row, Col} from "react-native-easy-grid";
import {API_URL} from "../constant";
import beef from '../assets/beef.jpg';
import spinach from '../assets/spinach.jpeg';
import AddIngredientModal from "./AddIngredientModal";
import {Provider} from "@ant-design/react-native";

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state={
            search : "",
        }
        this._onPressAdd = this._onPressAdd.bind(this);
    }

    _onPressAdd(){
        //alert("A new item added");
        this.refs.InventoryAddItemModal.showAddIngredientModal();
    }
    render() {
        return (
            <Provider>
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                        <Title style={{alignSelf:'center',
                            justifyContent:'center',}}>My Inventory</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress = {() => this._onPressAdd()}>
                            <Icon name='add-circle' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Item rounded style={{margin: 10, width: 380, height:50, alignSelf: "center", marginLeft: 10}}>
                        <Icon name="ios-search"/>
                        <Input
                            placeholder = "Find Ingredient"
                            onChangeText = {(data)=>{this.setState({search: data})}}
                            value = {this.state.search}
                        />
                        <Right>
                            <Button transparent onPress={
                                ()=>{
                                    if(this.state.search!=""){
                                        this.setState({search:""});
                                    }
                                }
                            }>
                                <Icon type="MaterialIcons" name="clear"></Icon>
                            </Button>
                        </Right>
                    </Item>
                    <Grid>
                        <Col>

                            <Card style={{padding: 20}}>
                                <CardItem cardBody>
                                    <Button transparent style={{margin:10}}>
                                        <Thumbnail source={beef} style ={{height: 100, width: 100}}/>
                                    </Button>
                                </CardItem>
                                <CardItem footer>
                                    <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>
                                </CardItem>
                            </Card>
                            <Card style={{padding: 20}}>
                                <CardItem cardBody>
                                    <Button transparent style={{margin:10}}>
                                        <Thumbnail source={spinach} style ={{height: 100, width: 100}}/>
                                    </Button>
                                </CardItem>
                                <CardItem>
                                    <Text style = {{fontWeight:"bold", fontSize:13}}>Spinach  0.4lbs</Text>
                                </CardItem>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{padding: 20}}>
                                <CardItem cardBody>
                                    <Button transparent style={{margin:10}}>
                                        <Thumbnail source={spinach} style ={{height: 100, width: 100}}/>
                                    </Button>
                                </CardItem>
                                <CardItem>
                                    <Text style = {{fontWeight:"bold", fontSize:13}}>Spinach  0.4lbs</Text>
                                </CardItem>
                            </Card>
                            <Card style={{padding: 20}}>
                                <CardItem cardBody>
                                    <Button transparent style={{margin:10}}>
                                        <Thumbnail source={beef} style ={{height: 100, width: 100}}/>
                                    </Button>
                                </CardItem>
                                <CardItem footer>
                                    <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>
                                </CardItem>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{padding: 20}}>
                                <CardItem cardBody>
                                    <Button transparent style={{margin:10}}>
                                        <Thumbnail source={beef} style ={{height: 100, width: 100}}/>
                                    </Button>
                                </CardItem>
                                <CardItem footer>
                                    <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>
                                </CardItem>
                            </Card>
                            <Card style={{padding: 20}}>
                                <CardItem cardBody>
                                    <Button transparent style={{margin:10}}>
                                        <Thumbnail source={spinach} style ={{height: 100, width: 100}}/>
                                    </Button>
                                </CardItem>
                                <CardItem>
                                    <Text style = {{fontWeight:"bold", fontSize:13}}>Spinach  0.4lbs</Text>
                                </CardItem>
                            </Card>
                        </Col>
                    </Grid>
                    <AddIngredientModal ref={'InventoryAddItemModal'} />

                    <Text style = {{padding:30}}>This is Inventory</Text>
                </Content>
            </Container>
            </Provider>
        );
    }
}

export default Inventory;



// import React, {Component} from 'react';
// import { Container, Content, Text, View} from "native-base"
// import {Provider, Modal,Button, WingBlank, WhiteSpace, Toast} from "@ant-design/react-native"
// import InventoryAddItemModal from "./InventroyAddItemModal";
// import InventoryViewDetailModal from "./InventoryViewDetailModal";
//
// class Inventory extends Component {
//     constructor (props) {
//         super(props);
//         this._onPressAdd = this._onPressAdd.bind(this);
//         this._onPressViewDetail = this._onPressViewDetail.bind(this);
//     }
//     _onPressAdd(){
//         //alert("A new item added");
//         this.refs.InventoryAddItemModal.showInventoryAddItemModal();
//     }
//     _onPressViewDetail() {
//         //alert("View Detail");
//         this.refs.InventoryViewDetailModal.showInventoryViewDetailModal();
//     }
//
//     render() {
//         return (
//             <Provider>
//                 <Container>
//                     <Content>
//                         <Button onPress = {() => this._onPressAdd()}>
//                             <Text>Add Item</Text>
//                         </Button>
//                         <Button onPress = {() => this._onPressViewDetail()}>
//                             <Text>View Item Detail</Text>
//                         </Button>
//                         {/*<InventoryAddItemModal ref={'InventoryAddItemModal'} parentList={{this}}>*/}
//                         {/*</InventoryAddItemModal>*/}
//                         <InventoryAddItemModal ref={'InventoryAddItemModal'} >
//                         </InventoryAddItemModal>
//
//                         <InventoryViewDetailModal ref={'InventoryViewDetailModal'}>
//                         </InventoryViewDetailModal>
//                     </Content>
//                 </Container>
//             </Provider>
//         );
//     }
// }
//
