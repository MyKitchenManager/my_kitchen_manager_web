import React, { Component } from 'react';
import { Image, Modal } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import meal from "../assets/meal.jpeg";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";
class RecipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                {/*<Thumbnail source={meal} />*/}
                                <Body>
                                    <Text>Orange Chicken</Text>
                                    <Text note>So Yummy!</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={meal} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent tilte="show modal" onPress={() => {this.setState({showModal: true})}} >
                                    <Icon active name="ios-bonfire" />
                                    <Text>Cook</Text>
                                </Button>
                                {/*<Modal*/}
                                {/*    transparent={true}*/}
                                {/*    visiable={this.state.showModal}*/}
                                {/*    */}
                                {/*>*/}
                                {/*    <View style={{backgroundColor:"#000000aa", flex: 1}}>*/}
                                {/*        <View style={{backgroundColor: "#ffffff", margin: 50, padding: 20, borderRadius: 10}}>*/}
                                {/*            <Text style={{fontSize: 20}}>This is recipe details</Text>*/}
                                {/*            <Button title="close modal" onPress={() => {this.setState({showModal: false})}} >*/}
                                {/*                <Text >Finish Cook</Text>*/}
                                {/*            </Button>*/}
                                {/*        </View>*/}
                                {/*    </View>*/}
                                {/*</Modal>*/}
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="ios-trash" />
                                    <Text>Delete</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon active name="ios-book" />
                                    <Text>Details</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default RecipeCard;