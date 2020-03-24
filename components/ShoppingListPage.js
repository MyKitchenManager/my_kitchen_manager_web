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
import EditShoppingListModal from "./EditShoppingListModal";

class ShoppingListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            checkedBox: [],
            items: [],
            newItem: {
                id: 185,
                image: "https://i.ndtvimg.com/i/2014-11/feta-cheese_625x300_61416559749.jpg",
                name: "Feta Cheese",
                volume: 100,
            },
            purchasedIngredient: [],
            userId: this.props.userId,
        }
        this.onPressEditButton = this.onPressEditButton.bind(this);
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
                unitsOfMeasure: 12,
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

    onPressYes = () => {
        if (this.state.checkedBox.length === 0) {
            Actions.home({page: "mealplan"});
            Alert.alert(
                "Really?",
                "Seems you didn't buy anything. Please check that."
            )
        } else {
            this.onFinishShoppingButton();
            Actions.home({page: "inventory"});
        }
    }

    onPressEditButton (item) {
        this.refs.EditShoppingListModal.showEditShoppingListModal(item);
    }

    componentDidMount() {
        this.getShoppingList();
    }

    changedItem(item){
        this.setState({newItem: item});
    }

    editShoppingList(item){
        console.log(this.state.items);
        let newItems = this.state.items;
        for(let i = 0; i < newItems.length; i++){
            if(newItems[i].id === item.id){
                newItems[i] = item;
                break;
            }
        }
        this.setState({items: newItems});
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
                                                            <Text style={{fontSize: 16, fontWeight: "bold", marginBottom: 5}}>{item.name}</Text>
                                                            <Text note numberOfLines={1} style={{fontWeight: "bold"}}>{item.volume} g</Text>
                                                        </Body>
                                                        <Right>
                                                            <Row style={{alignItems: 'center'}}>
                                                                <Button transparent onPress={() => {
                                                                    console.log(item);
                                                                    this.onPressEditButton(item);
                                                                    this.editShoppingList(this.state.newItem);
                                                                }}>
                                                                    <Icon type="FontAwesome" name="edit" style={{color: 'deepskyblue', marginRight: 10}} />
                                                                </Button>

                                                            <CheckBox style={{marginRight: 20}}
                                                                      checked={this.state.checkedBox.includes(item.id) ? true : false}
                                                                      onPress={()=>this.onPressCheckBox(item.id)}/>
                                                            </Row>
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
                                    }}>
                                    <Text style={{color: 'white', fontWeight: '800', fontSize: '18'}}>Finish Shopping</Text>
                                </Button>
                            </View>

                        <EditShoppingListModal ref={'EditShoppingListModal'} data={this.changedItem.bind(this)} />
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