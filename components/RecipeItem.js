import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Card, CardItem, Icon, Image} from 'native-base';

import meal from "../assets/meal.jpeg";
class RecipeItem extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square source={meal} />
                            </Left>
                            <Body>
                                <Text>Hongshao Rou</Text>
                                <Text note numberOfLines={1}>It's so yummy</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Text>View</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default RecipeItem;