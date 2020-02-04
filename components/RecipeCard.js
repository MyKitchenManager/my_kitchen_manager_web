import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import meal from "../assets/meal.jpeg";
class RecipeCard extends Component {
    render() {
        return (
            <Container>
                <Header />
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
                                <Button transparent>
                                    <Icon active name="flame" />
                                    <Text>Cook</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="trash" />
                                    <Text>Delete</Text>
                                </Button>
                            </Body>
                            {/*<Right>*/}
                            {/*    <Text>11h ago</Text>*/}
                            {/*</Right>*/}
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default RecipeCard;