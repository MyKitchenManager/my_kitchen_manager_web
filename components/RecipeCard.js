import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import meal from "../assets/meal.jpeg";

class RecipeCard extends Component {
    constructor(props) {
        super(props);
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
                            <Image source={meal} style={{height: 200, width: 100, flex: 1,}}/>
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