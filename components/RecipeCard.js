import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import meal from "../assets/meal.jpeg";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";
class RecipeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Container>

                {/*<Modal*/}
                {/*    animationType="slide"*/}
                {/*    transparent={true}*/}
                {/*    visiable={false}*/}

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
                                <Button transparent title="show modal" onPress={this.props.data} >
                                    <Icon active name="ios-bonfire" />
                                    <Text>Cook</Text>
                                </Button>

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