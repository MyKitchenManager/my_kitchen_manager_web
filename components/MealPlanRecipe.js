import React, {Component} from 'react';
import {View, Text, AsyncStorage, ScrollView} from 'react-native';
import {
    Body,
    Container,
    Header,
    Left,
    Right,
    Title,
    Content,
    Icon,
    Button,
    Spinner,
    List,
    ListItem,
    Thumbnail, CheckBox
} from "native-base";
import {Provider, Modal} from "@ant-design/react-native";
import {Actions} from 'react-native-router-flux';
import {API_URL, TOKEN_KEY} from "../constant";
import RecipeDetailModal from "./RecipeDetailModal";

class MealPlanRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            items: [],
            loading: false,
            checkedBox: []
        }
        this.onPressImage = this.onPressImage.bind(this);
    }

    loadAllRecipes(){
        this.setState({items: [], loading: true});
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
                        console.log('add recipes:' + responseData);
                        this.setState({
                            items: responseData,
                            loading: false
                        });
                    }).done()
                }
            })
            .catch((error)=>{
                console.log("Error in fetching recipe list");
            })
    }

    onAddButton() {
        //fetch add mealplan
        Actions.pop();

    }

    componentDidMount() {
        this.loadAllRecipes();
    }

    onPressCheckBox(id) {
        let tmp = this.state.checkedBox;

        if ( tmp.includes( id ) ) {
            tmp.splice( tmp.indexOf(id), 1 );
        } else {
            tmp.push( id );
        }

        this.setState({
            checkedBox: tmp
        });
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

    render() {
        return (
           <Provider>
               <Container>
                   <Header>
                       <Left>
                           <Button transparent onPress={() => {Actions.pop()}}>
                               <Icon name='arrow-back' />
                           </Button>
                       </Left>
                       <Body>
                           <Title>Plan Your Day</Title>
                       </Body>
                       <Right />
                   </Header>

                   <Content>
                           {
                               this.state.loading ?
                                   <View>
                                       <Spinner color='deepskyblue'/>
                                   </View>
                                   :
                                   <ScrollView style={{height: 680}}>
                                       <List>
                                           {this.state.items ? this.state.items.map((item)=>{
                                               return <ListItem thumbnail key={item.id} style={{marginVertical: 5}}>
                                                   <Left>
                                                       <Button transparent onPress={() => this.onPressImage(item)}>
                                                           <Thumbnail square source={{ uri: item.recipeImageUrl}} style={{borderRadius: 10, height: 70, width: 70}} />
                                                       </Button>

                                                   </Left>
                                                   <Body>
                                                       <Text style={{fontSize: 16, fontWeight: '15', marginBottom: 5}}>{item.recipeName}</Text>
                                                       <Text note numberOfLines={1} style={{fontWeight: '15'}}>PrepTime: {item.prepTime}   CookTime: {item.timesCooked}</Text>
                                                   </Body>
                                                   <Right>
                                                       <CheckBox style={{marginRight: 20}} checked={this.state.checkedBox.includes(item.id) ? true : false}
                                                                 onPress={()=>this.onPressCheckBox(item.id)}/>
                                                   </Right>
                                               </ListItem>
                                           }):<ListItem>
                                               <body>
                                               <Text>There are no recipes in the meal pool</Text>
                                               </body>
                                           </ListItem>}
                                       </List>
                                   </ScrollView>
                           }

                       <Button
                           style = {{margin: 10,
                               padding: 15,
                               alignSelf:'center',
                               justifyContent:'center',
                               backgroundColor:"deepskyblue",
                               width:380,
                               marginTop: 20,
                           }}
                           onPress={()=>{
                               this.onAddButton(),
                                   this.setState({
                                       showModal: false,
                                       items: [],
                                       loading: false,
                                       checkedBox: []
                                   })
                           }}>
                           <Text >ADD</Text>
                       </Button>

                       <RecipeDetailModal ref={'RecipeDetailModal'}/>
                    </Content>
               </Container>
           </Provider>
        );
    }
}

export default MealPlanRecipe;