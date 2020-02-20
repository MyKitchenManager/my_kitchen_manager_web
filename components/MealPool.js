import React, {Component} from 'react';
import {
    Container,
    Text,
    Content,
    Header,
    Title,
    Spinner,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Item,
    Input, Card, CardItem, Thumbnail
} from "native-base"
import {Provider} from "@ant-design/react-native";
import {FlatList, Image} from "react-native";
import AddRecipeModal from "./AddRecipeModal";
import RecipeDetailModal from "./RecipeDetailModal";
import {AsyncStorage} from "react-native"
import {API_URL, TOKEN_KEY} from "../constant"

class MealPool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            Items: [],
            display: [],
            loading: true
        }
        this.onPressAdd = this.onPressAdd.bind(this);
        this.onPressImage = this.onPressImage.bind(this);
    }

    onPressAdd(){
        this.refs.AddRecipeModal.showAddRecipeModal();
    }

    onSearch(data){
        let text = data.toLowerCase();
        let trucks = this.state.Items;
        let filtered = trucks.filter((item)=>{
            return item.recipeName.toLowerCase().match(text);
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

    onPressImage(item) {
        const recipe ={
            name: item.recipeName,
            image: item.recipeImageUrl,
            detail: item.recipeDetails,
            method: item.instructions
        }
        this.refs.RecipeDetailModal.showRecipeDetailModal(recipe);
    }

    scanRecipes(){
        this.setState({Items: [], loading: true});
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    fetch(`${API_URL}/recipe/all`, {
                        method: "GET",
                        headers:{
                            "Authorization": accessToken
                        }
                    }).then((response)=>{
                        if(response.status=="200"){
                            return response.json();
                        }else{
                            alert(`Error in fetching data --> status ${response.status}`);
                        }
                    }).then((responseData)=>{
                       this.setState({Items: responseData, display: responseData});
                    }).done()
                }
            })
            .catch((error)=>{
                console.log("Error in fetching recipe list");
            })
    }

    componentDidMount() {
        this.scanRecipes();
    }

    render() {
        return (
            <Provider>
                <Container>
                    <Header>
                        <Left>

                        </Left>
                        <Body>
                            <Title style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                            }}>My Meal Pool</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.onPressAdd()}>
                                <Icon name='add-circle'/>
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Item rounded style={{margin: 10, width: 380, height:50, alignSelf: "center", marginLeft: 10}}>
                            <Icon name="ios-search"/>
                            <Input
                                placeholder = "Find Recipe"
                                onChangeText = {(data)=>{
                                    this.setState({search: data});
                                    this.onSearch(data);
                                }}
                                value = {this.state.search}
                            />
                            <Right>
                                <Button transparent onPress={
                                    ()=>{
                                        if(this.state.search!=""){
                                            this.setState({search:"", display: this.state.Items});
                                        }
                                    }
                                }>
                                    <Icon type="MaterialIcons" name="clear"></Icon>
                                </Button>
                            </Right>
                        </Item>


                        <FlatList
                            data={this.state.display}
                            renderItem={({item}) =>(
                                <Card style={{padding: 20, height: 170, borderRadius: 15}}>
                                    <CardItem cardBody>
                                        <Button transparent style={{margin:10}} onPress = {() => this.onPressImage(item)}>

                                            <Thumbnail source={{uri:item.recipeImageUrl}} style ={{height: 120, width: 140, marginTop: 30}}/>

                                        </Button>
                                    </CardItem>
                                    <CardItem style={{marginTop: 40, textAlign: 'center', backgroundColor: 'transparent'}}>
                                        <Left>
                                            <Body>
                                                <Text style = {{fontWeight:"bold", fontSize:13}}>{item.recipeName}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                </Card>
                            )}
                            numColumns = {2}
                            keyExtractor = {item=>item.id}
                        />
                        <AddRecipeModal data={this.scanRecipes.bind(this)} ref={'AddRecipeModal'} />
                        <RecipeDetailModal ref={'RecipeDetailModal'} />

                    </Content>
                </Container>
            </Provider>
        )
    }
}

export default MealPool;