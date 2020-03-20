import React, {Component} from 'react';
import {Alert, AsyncStorage, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {
    Body,
    Button, CheckBox,
    Container,
    Content,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Right, Row,
    Spinner,
    Thumbnail,
    Title
} from "native-base";
import {Actions} from "react-native-router-flux";
import {Modal, Provider} from "@ant-design/react-native";
import {API_URL, TOKEN_KEY} from "../constant";
class ShoppingListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            checkedBox: [],
            items: [],
            purchasedIngredient: [],
            userId: this.props.userId,
        }
    }

    onPressYes = () => {
        Actions.home({page: "inventory"});
    }

    getShoppingList(){
        this.setState({items: [], loading: true});
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    fetch(`${API_URL}/`, {
                        method: 'GET',
                        headers: {
                            'Authorization': accessToken
                        }
                    }).then((response) => {
                        if (response.status == '200') {
                            return response.json();
                        }
                    }).then((responseData) => {
                        let userId = responseData.userId;
                        fetch(`${API_URL}/shoppinglist/${userId}`, {
                            method: "GET",
                            headers:{
                                "Authorization": accessToken
                            }
                        }).then((response)=>{
                            if(response.status == "200"){
                                return response.json();
                            }else{
                                alert(`Error in fetching data --> status ${response.status}`);
                            }
                        }).then((responseData)=>{
                            if (responseData[0].length === 0) {
                                this.setState({
                                    items: [],
                                    loading: false
                                });
                            } else {
                                for (let i = 0; i < responseData[0].length; i++) {
                                    console.log('responseData[i]:' + responseData[0][i]);
                                    let id = responseData[0][i].i.ingredientId
                                    let name = responseData[0][i].i.ingredientName;
                                    let image = responseData[0][i].i.imageUrl;
                                    let volume = responseData[0][i].volume;
                                    const item = {
                                        id: id,
                                        name: name,
                                        image: image,
                                        volume: volume
                                    };
                                    const list = this.state.items.concat(item);
                                    this.setState({items: list, loading: false});
                                }
                            }
                        }).done()
                    })
                }
            })
            .catch((error)=>{
                console.log("Error in fetching recipe list");
            })
    }

    onFinishShoppingButton() {
        console.log('pressed finish shopping button')
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    console.log(accessToken);
                    fetch(`${API_URL}/inventory/addAll`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':  accessToken
                        },
                        body: JSON.stringify(this.state.purchasedIngredient)
                    }).then((response)=>{
                        if(response.status == "200"){
                            Alert.alert(
                                'Finish Shopping?',
                                'Purchased items will be added to inventory',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: console.log('cancel'),
                                        style: 'cancel',
                                    },
                                    {text: 'Yes', onPress: () => {this.onPressYes()}},
                                ],
                                {cancelable: false},
                            );
                            //alert("Purchased Items have been added to Inventory");
                            console.log('Purchased Items have been added to Inventory')
                        }else{
                            console.log(response.status);
                        }
                    }).catch((error)=>{
                        console.log(`Error in adding item in inventory --> ${error}`);
                    })
                }
            })
    }

    onPressCheckBox(id) {
        let tmp = this.state.checkedBox;

        if ( tmp.includes( id ) ) {
            tmp.splice( tmp.indexOf(id), 1 );
        } else {
            tmp.push( id );
            //get volume
            let volume;
            for (let i = 0; i < this.state.items.length; i++) {
                if (this.state.items[i].id === id) {
                    volume = this.state.items[i].volume;
                    break;
                }
            }

            this.state.purchasedIngredient.push({
                ingredientId : id,
                inventoryVolume: volume,
                unitsOfMeasure: 13,
                userId: this.state.userId,
                purchaseDate:"2020-02-04T12:00:00.000+0000",
                expirationDate:"2020-02-19T12:00:00.000+0000"
            })
        }

        this.setState({
            checkedBox: tmp
        });
        console.log(this.state.checkedBox);
        console.log(this.state.purchasedIngredient);
    }

    componentDidMount() {
        this.getShoppingList();
    }

    render() {
        return (
            <Provider>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => {Actions.pop()}}>
                                <Icon name='arrow-back' style={{color: '#00BBF2', paddingLeft: 10}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Shopping List</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                            <View style={[styles.container,{ paddingVertical: 20, paddingHorizontal: 20}]}>
                                {
                                    this.state.loading ?
                                        <View>
                                            <Spinner color='deepskyblue'/>
                                        </View>
                                        :
                                        <ScrollView style={{height: 680}}>
                                            <List>
                                                {this.state.items ? this.state.items.map((item)=>{
                                                    return <ListItem thumbnail key={item.id}>
                                                        <Left>
                                                            <Thumbnail square source={{ uri: item.image}} />
                                                        </Left>
                                                        <Body>

                                                            <Text style={{fontSize: 16, fontWeight: '15', marginBottom: 5}}>{item.name}</Text>
                                                            <Text note numberOfLines={1} style={{fontWeight: '15'}}>{item.volume} g</Text>

                                                            {/*<TextInput*/}
                                                            {/*    style={{alignSelf: 'center',fontSize: 16, height: 20, borderColor: 'transparent', borderWidth: 1, color: '#00BBF2', fontWeight: 'bold'}}*/}
                                                            {/*    onChangeText={text => {*/}
                                                            {/*        this.volume = text;*/}
                                                            {/*        // this.setState({*/}
                                                            {/*        //     ItemVolume: text*/}
                                                            {/*        // })*/}
                                                            {/*    }}*/}
                                                            {/*>*/}
                                                            {/*    {`${this.state.ItemVolume}`}*/}
                                                            {/*</TextInput>*/}
                                                            {/*<Text>g</Text>*/}

                                                        </Body>
                                                        <Right>
                                                            <CheckBox style={{marginRight: 20}} checked={this.state.checkedBox.includes(item.id) ? true : false}
                                                                      onPress={()=>this.onPressCheckBox(item.id)}/>
                                                        </Right>
                                                    </ListItem>
                                                }):<ListItem>
                                                    <body>
                                                    <Text>There is no items in shopping list!</Text>
                                                    </body>
                                                </ListItem>}
                                            </List>
                                        </ScrollView>
                                }

                                <Button
                                    style = {{
                                        alignSelf:'center',
                                        justifyContent:'center',
                                        backgroundColor:"deepskyblue",
                                        width: 360,
                                        marginTop: 20
                                    }}
                                    onPress={()=>{
                                        this.onFinishShoppingButton()
                                    }}>
                                    <Text >Finish Shopping</Text>
                                </Button>
                            </View>

                    </Content>
                </Container>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 25
    }
});


export default ShoppingListPage;