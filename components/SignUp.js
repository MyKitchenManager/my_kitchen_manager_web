import React, {Component} from 'react';
import {
    Button,
    Container,
    Content,
    Header,
    Icon,
    Input,
    InputGroup,
    Item,
    Label,
    List,
    ListItem, Text,
    Title
} from "native-base"
import styles from "../styles/styles"
import {Actions} from "react-native-router-flux";

class SignUp extends Component {
    render() {
        return (
            <Container>
                {
                    <Content>
                        <List style={{paddingTop: 10, paddingBottom: 15}}>
                            <ListItem>
                                <InputGroup>
                                    <Icon name="ios-person" style={{color: '#fe6e32'}}/>
                                    <Item floatingLabel>
                                        <Label style={{padding: 10, fontSize: 15}}> Username (Email) </Label>
                                        <Input/>
                                    </Item>
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <InputGroup>
                                    <Icon name="ios-unlock" style={{color: '#fe6e32'}}/>
                                    <Item floatingLabel>
                                        <Label style={{padding: 10, fontSize: 15}}> Password </Label>
                                        <Input/>
                                    </Item>
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <InputGroup>
                                    <Icon type="MaterialIcons" name="done" style={{color: '#fe6e32'}}/>
                                    <Item floatingLabel>
                                        <Label style={{padding: 10, fontSize: 15}}> Confirm Password </Label>
                                        <Input/>
                                    </Item>
                                </InputGroup>
                            </ListItem>
                        </List>
                        <Button style={styles.primaryButton}>
                            <Text style={{fontWeight: "bold"}}>Sign Up</Text>
                        </Button>
                        <Button style={styles.primaryButton} onPress={()=>Actions.pop()}>
                            <Text style={{fontWeight: "bold"}}>Back to Login</Text>
                        </Button>

                    </Content>
                }
            </Container>
        );
    }
}

export default SignUp;