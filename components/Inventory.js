import React, {Component} from 'react';
import {Container, Content, Text, Header, Left, Button, Icon, Body, Title, Right, Item, Input, Card, CardItem, Thumbnail, Spinner} from "native-base"
import {ScrollView, Image, AsyncStorage, FlatList, Alert, View} from "react-native";
import {Grid, Row, Col} from "react-native-easy-grid";
import {API_URL, TOKEN_KEY} from "../constant";
import beef from '../assets/beef.jpg';
import spinach from '../assets/spinach.jpeg';
import AddIngredientModal from "./AddIngredientModal";
import {Provider} from "@ant-design/react-native";
import IngredientDetailModal from "./IngredientDetailModal";

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state={
            search : "",
            Items: [],
            display: [],
            loading: true
        }
        this.onPressAdd = this.onPressAdd.bind(this);
        this.onPressImage = this.onPressImage.bind(this);

    }

    onSearch(data){
        let text = data.toLowerCase();
        let trucks = this.state.Items;
        let filtered = trucks.filter((item)=>{
            return item.name.toLowerCase().match(text);
        });
        if(!text||text==""){
            this.setState({
                display: trucks
            })
        }else if(!Array.isArray(filtered) && !filtered.length){
            this.setState({display: []});
        }else if(Array.isArray(filtered)){
            this.setState({display: filtered});
        }
    }

    onPressAdd(){
        this.refs.AddIngredientModal.showAddIngredientModal(this.props.data);
    }

    onPressImage(item){
        this.refs.IngredientDetailModal.showIngredientDetailModal(item);
    }

    handleDeleteItem(item) {
        //alert('An item is deleted!');
        console.log('An item is deleted');
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    console.log(accessToken);
                    fetch(`${API_URL}/inventory/inventoryId/${item.id}`, {
                        method: "DELETE",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':  accessToken
                        }
                    }).then((response)=>{
                        if(response.status == "202"){
                            alert("Item successfully deleted");
                        }else{
                            console.log(response.status);
                        }
                    }).then(()=>{
                        this.scanInventory();
                    })
                        .catch((error)=>{
                            console.log(`Error in adding item in inventory --> ${error}`);
                        })
                }
            })
    }

    scanInventory(){
        this.setState({Items: [], loading: true})
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    //let newItem = [];
                    fetch(`${API_URL}/inventory/users`, {
                        method:"GET",
                        headers:{
                            "Authorization" : accessToken
                        }
                    })
                        .then((response)=>{
                            if(response.status=="200"){
                                return response.json();
                            }else{
                                console.log(response.status);
                            }

                        }).then((responseData)=> {
                        if (responseData.length == 0) {
                            this.setState({
                                Items: [],
                                loading: false
                            })
                        } else {
                            for(let i = 0; i< responseData.length; i++) {
                                console.log('responseData:' + responseData[i]);
                                let name = responseData[i].ingredientIdJoin.ingredientName;
                                let id = responseData[i].inventoryId;
                                let image = responseData[i].ingredientIdJoin.imageUrl;
                                let amount = responseData[i].inventoryVolume;
                                let unit = responseData[i].unitsOfMeasureListEntry.entry;
                                let expirationDate = responseData[i].expirationDate;
                                let purchaseDate = responseData[i].purchaseDate;
                                let ingredientId = responseData[i].ingredientId;
                                let category;
                                switch(responseData[i].ingredientIdJoin.ingredientCategoryId){
                                    case 1:
                                        category = "Vegetables";
                                        break;
                                    case 2:
                                        category = "Spices and Herbs";
                                        break;
                                    case 3:
                                        category = "Cereals and Pulses";
                                        break;
                                    case 4:
                                        category = "Meat";
                                        break;
                                    case 5:
                                        category = "Dairy Products";
                                        break;
                                    case 6:
                                        category = "Fruits";
                                        break;
                                    case 7:
                                        category = "Seafood";
                                        break;
                                    case 8:
                                        category = "Sugar and Sugar Products";
                                        break;
                                    case 9:
                                        category = "Nuts and Oilseeds";
                                        break;
                                    default:
                                        category = "Other Ingredients";
                                        break;
                                }
                                const item = {
                                    id: id,
                                    name: name,
                                    image: image,
                                    amount: amount,
                                    unit: unit,
                                    category: category,
                                    purchaseDate: purchaseDate.substr(0, 10),
                                    ingredientId: ingredientId
                                };
                                const list = this.state.Items.concat(item);
                                this.setState({Items: list, display: list, loading: false});
                            }
                        }
                    }).done();
                }
            }).catch((error)=>{
                console.log(`Error in fetching inventory list --> ${error}`);
            })

    }

    onAddItem(id, volume) {
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken) => {
                if (accessToken != null) {
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
                        fetch(`${API_URL}/inventory`, {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization':  accessToken
                            },
                            body: JSON.stringify({
                                ingredientId : id,
                                inventoryVolume: volume,
                                unitsOfMeasure: 12,
                                userId: userId,
                                purchaseDate:"2020-02-04T12:00:00.000+0000",
                                expirationDate:"2020-02-19T12:00:00.000+0000"
                            })
                        }).then((response)=>{
                            if(response.status == "200"){
                                alert("Item successfully added");
                                this.scanInventory();
                            }else{
                                console.log(response.status);
                            }
                        }).catch((error)=>{
                            console.log(`Error in adding item in inventory --> ${error}`);
                        }).done()
                    })
                }
            })
            .catch((error) => {
                console.log("Error in fetching recipe list");
            })
    }

    componentDidMount() {
        this.scanInventory();
    }

    render() {
        return this.state.loading?
            <Container>
                <Header>
                    <Title style={{alignSelf:'center',
                        justifyContent:'center',}}>My Inventory</Title>
                </Header>
                <Content>
                    <Spinner color='deepskyblue'/>
                </Content>
            </Container>
            :(
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
                                    onChangeText = {(data)=>{
                                        this.setState({search: data})
                                        this.onSearch(data);
                                    }}
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
                            <View style={{alignItems: 'center'}}>
                            <FlatList
                                data ={this.state.display}
                                renderItem={({item})=>(
                                    <Card style={{alignItems: 'center', width: 130, height: 160, borderRadius: 15}}>
                                        <CardItem cardBody style={{alignItems: 'center', paddingTop: 25}}>
                                            <Button transparent style={{margin:10}} onPress = {() => this.onPressImage(item)}>
                                                <Thumbnail source={{uri: item.image}} style ={{height: 100, width: 110}}/>
                                            </Button>
                                        </CardItem>
                                        <CardItem style={{backgroundColor: 'transparent'}}>
                                            <Text style = {{fontWeight:"bold", fontSize:13, textAlign: 'center', marginTop: 10}}>{`${item.name} ${item.amount}${item.unit}`}</Text>
                                        </CardItem>
                                    </Card>
                                )}
                                numColumns = {3}
                                keyExtractor = {item=>item.id}
                            />
                            </View>
                            <AddIngredientModal ref={'AddIngredientModal'} data={this.props.data} data2 = {this.scanInventory.bind(this)} handleAddItem={this.onAddItem.bind(this)}/>
                            <IngredientDetailModal ref={'IngredientDetailModal'} handleDeleteItem={this.handleDeleteItem.bind(this)} reloadInventory = {this.scanInventory.bind(this)}/>

                        </Content>
                    </Container>
                </Provider>
            );
    }
}

export default Inventory;

{/*<Grid>*/}
{/*    <Col>*/}
{/*        {this.state.Items.map((info)=>{*/}
{/*            return <Card style={{padding: 20}} key = {info.id}>*/}
{/*                <CardItem cardBody>*/}
{/*                    <Button transparent style={{margin:10}} onPress = {() => this.onPressImage(info)}>*/}
{/*                        <Thumbnail source={{uri: info.image}} style ={{height: 100, width: 100}}/>*/}
{/*                    </Button>*/}
{/*                </CardItem>*/}
{/*                <CardItem footer>*/}
{/*                    <Text style = {{fontWeight:"bold", fontSize:13}}>{`${info.name} ${info.amount}${info.unit}`}</Text>*/}
{/*                </CardItem>*/}
{/*            </Card>*/}
{/*        })}*/}
{/*        /!*<Card style={{padding: 20}}>*!/*/}
{/*        /!*    <CardItem cardBody>*!/*/}
{/*        /!*        <Button transparent style={{margin:10}} onPress = {() => this.onPressImage()}>*!/*/}
{/*        /!*            <Thumbnail source={beef} style ={{height: 100, width: 100}}/>*!/*/}
{/*        /!*        </Button>*!/*/}
{/*        /!*    </CardItem>*!/*/}
{/*        /!*    <CardItem footer>*!/*/}
{/*        /!*        <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>*!/*/}
{/*        /!*    </CardItem>*!/*/}
{/*        /!*</Card>*!/*/}
{/*        /!*<Card style={{padding: 20}}>*!/*/}
{/*        /!*    <CardItem cardBody>*!/*/}
{/*        /!*        <Button transparent style={{margin:10}} onPress = {() => this.onPressImage()}>*!/*/}
{/*        /!*            <Thumbnail source={spinach} style ={{height: 100, width: 100}}/>*!/*/}
{/*        /!*        </Button>*!/*/}
{/*        /!*    </CardItem>*!/*/}
{/*        /!*    <CardItem>*!/*/}
{/*        /!*        <Text style = {{fontWeight:"bold", fontSize:13}}>Spinach  0.4lbs</Text>*!/*/}
{/*        /!*    </CardItem>*!/*/}
{/*        /!*</Card>*!/*/}
{/*    </Col>*/}
{/*    <Col>*/}
{/*        <Card style={{padding: 20}}>*/}
{/*            <CardItem cardBody>*/}
{/*                <Button transparent style={{margin:10}}>*/}
{/*                    <Thumbnail source={spinach} style ={{height: 100, width: 100}}/>*/}
{/*                </Button>*/}
{/*            </CardItem>*/}
{/*            <CardItem>*/}
{/*                <Text style = {{fontWeight:"bold", fontSize:13}}>Spinach  0.4lbs</Text>*/}
{/*            </CardItem>*/}
{/*        </Card>*/}
{/*        <Card style={{padding: 20}}>*/}
{/*            <CardItem cardBody>*/}
{/*                <Button transparent style={{margin:10}}>*/}
{/*                    <Thumbnail source={beef} style ={{height: 100, width: 100}}/>*/}
{/*                </Button>*/}
{/*            </CardItem>*/}
{/*            <CardItem footer>*/}
{/*                <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>*/}
{/*            </CardItem>*/}
{/*        </Card>*/}
{/*    </Col>*/}
{/*    <Col>*/}
{/*        <Card style={{padding: 20}}>*/}
{/*            <CardItem cardBody>*/}
{/*                <Button transparent style={{margin:10}}>*/}
{/*                    <Thumbnail source={beef} style ={{height: 100, width: 100}}/>*/}
{/*                </Button>*/}
{/*            </CardItem>*/}
{/*            <CardItem footer>*/}
{/*                <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>*/}
{/*            </CardItem>*/}
{/*        </Card>*/}
{/*        <Card style={{padding: 20}}>*/}
{/*            <CardItem cardBody>*/}
{/*                <Button transparent style={{margin:10}}>*/}
{/*                    <Thumbnail source={spinach} style ={{height: 100, width: 100}}/>*/}
{/*                </Button>*/}
{/*            </CardItem>*/}
{/*            <CardItem>*/}
{/*                <Text style = {{fontWeight:"bold", fontSize:13}}>Spinach  0.4lbs</Text>*/}
{/*            </CardItem>*/}
{/*        </Card>*/}
{/*    </Col>*/}
{/*</Grid>*/}

{/*Modal*/}


{/*        /!*<Card style={{padding: 20}}>*!/*/}
{/*        /!*    <CardItem cardBody>*!/*/}
{/*        /!*        <Button transparent style={{margin:10}} onPress = {() => this.onPressImage()}>*!/*/}
{/*        /!*            <Thumbnail source={beef} style ={{height: 100, width: 100}}/>*!/*/}
{/*        /!*        </Button>*!/*/}
{/*        /!*    </CardItem>*!/*/}
{/*        /!*    <CardItem footer>*!/*/}
{/*        /!*        <Text style = {{fontWeight:"bold", fontSize:13}}>Beef 0.7lbs</Text>*!/*/}
{/*        /!*    </CardItem>*!/*/}
{/*        /!*</Card>*!/*/}