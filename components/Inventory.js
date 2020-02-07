import React, {Component} from 'react';
import {Container, Content, Text, Header, Left, Button, Icon, Body, Title, Right, Item, Input, Card, CardItem, Thumbnail} from "native-base"
import {ScrollView, Image} from "react-native";
import {Grid, Row, Col} from "react-native-easy-grid";

import beef from '../assets/beef.jpg';
import spinach from '../assets/spinach.jpeg';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state={
            search : ""
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                        <Title style={{alignSelf:'center',
                            justifyContent:'center',}}>My Inventory</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='ios-add' />
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
                                    <Button transparent style={{margin:5}}>
                                        <Thumbnail source={beef} style ={{height: 100, width: 100}}/>
                                    </Button>
                                </CardItem>
                                <CardItem footer>
                                    <Text style = {{fontweight:"bold", fontSize:13}}>Beef    0.7lbs</Text>
                                </CardItem>
                            </Card>
                            <Card style={{padding: 20}}>
                                <CardItem cardBody>
                                    <Button transparent style={{margin:5, alignSelf: "center"}}>
                                        <Thumbnail source={spinach} style ={{height: 100, width: 100, margin:5}}/>
                                    </Button>
                                </CardItem>
                                <CardItem footer style={{margin: 5}}>
                                    <Text style = {{fontWeight:"bold", fontSize:10}}>Spinach  0.4lbs</Text>
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
                        </Col>
                    </Grid>

                    <Text style = {{padding:30}}>This is Inventory</Text>
                </Content>
            </Container>
        );
    }
}

export default Inventory;