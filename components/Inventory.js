import React, {Component} from 'react';
import {Container, Content, Text, Header, Left, Button, Icon, Body, Title, Right, Item, Input, Card, CardItem, Thumbnail, Spinner} from "native-base"
import {ScrollView, Image, AsyncStorage, FlatList, Alert} from "react-native";
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
            userId: 241,
            Items: [],
            loading: true
        }
        this.onPressAdd = this.onPressAdd.bind(this);
        this.onPressImage = this.onPressImage.bind(this);

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
                    fetch(`${API_URL}/inventory/userId/${this.props.data}`, {
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

                        }).then((responseData)=>{
                        for(let i = 0; i< responseData.length; i++) {
                            console.log(responseData[i]);
                            let name = responseData[i].ingredientIdJoin.ingredientName;
                            let id = responseData[i].inventoryId;
                            let image = responseData[i].ingredientIdJoin.imageUrl;
                            let amount = responseData[i].inventoryVolume;
                            let unit = responseData[i].unitsOfMeasureListEntry.entry;
                            let expirationDate = responseData[i].expirationDate;
                            let purchaseDate = responseData[i].purchaseDate;
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
                                purchaseDate: purchaseDate.substr(0, 10)
                            };
                            const list = this.state.Items.concat(item);
                            this.setState({Items: list, loading: false});
                        }
                    }).done();

                }
            })
            .catch((error)=>{
                console.log(`Error in fetching inventory list --> ${error}`);
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
                            <FlatList
                                data ={this.state.Items}
                                renderItem={({item})=>(
                                    <Card style={{margin: 15, paddingTop: 10, width: 130, height: 140}}>
                                        <CardItem cardBody>
                                            <Button transparent style={{margin:10}} onPress = {() => this.onPressImage(item)}>
                                                <Thumbnail source={{uri: item.image}} style ={{marginTop: 30, height: 100, width: 100}}/>
                                            </Button>
                                        </CardItem>
                                        <CardItem footer>
                                            <Text style = {{fontWeight:"bold", fontSize:13}}>{`${item.name} ${item.amount}${item.unit}`}</Text>
                                        </CardItem>
                                    </Card>
                                )}
                                numColumns = {3}
                                keyExtractor = {item=>item.id}
                            />

                            <AddIngredientModal ref={'AddIngredientModal'} data={this.props.data} data2 = {this.scanInventory.bind(this)}/>
                            <IngredientDetailModal ref={'IngredientDetailModal'} handleDeleteItem={this.handleDeleteItem.bind(this)} />

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