import React, {Component} from 'react';
import {Container, Content, Text, Header, Left, Button, Icon, Body, Title, Right, Item, Input, Card, CardItem, Thumbnail} from "native-base"
import {ScrollView, Image} from "react-native";
import {Grid, Row, Col} from "react-native-easy-grid";
import {API_URL, AUTH_HEADER,  TOKEN_KEY} from "../constant";
import beef from '../assets/beef.jpg';
import spinach from '../assets/spinach.jpeg';
import AddIngredientModal from "./AddIngredientModal";
import {Provider} from "@ant-design/react-native";
import IngredientDetailModal from "./IngredientDetailModal";
import {Actions} from "react-native-router-flux";
import {AsyncStorage} from "react-native-web";


class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state={
            search : "",

        }
        this.onPressAdd = this.onPressAdd.bind(this);
        this.onPressImage = this.onPressImage.bind(this);

    }

    onPressAdd(){
        //alert("A new item added");
        this.refs.AddIngredientModal.showAddIngredientModal();
    }

    onPressImage(){
        //alert("A new item added");
        this.refs.IngredientDetailModal.showIngredientDetailModal();
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
                        <Button transparent onPress = {() => this.onPressAdd()}>
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
                                    <Button transparent style={{margin:10}} onPress = {() => this.onPressImage()}>
                                        <Thumbnail source={beef} style ={{height: 100, width: 100}}/>
                                    </Button>
                                </CardItem>
                                <CardItem footer>
                                    <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>
                                </CardItem>
                            </Card>
                            <Card style={{padding: 20}}>
                                <CardItem cardBody>
                                    <Button transparent style={{margin:10}} onPress = {() => this.onPressImage()}>
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

                    {/*Modal*/}
                    <AddIngredientModal ref={'AddIngredientModal'} />
                    <IngredientDetailModal ref={'IngredientDetailModal'} />
                </Content>
            </Container>
            </Provider>
        );
    }
}

export default Inventory;

