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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

class MealPlanRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            items: [],
            loading: false,
            checkedBox: [],
            mealDate: this.props.date,
            userId: this.props.userId,
            selectedRecipes: []
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
        AsyncStorage.getItem(TOKEN_KEY)
            .then((accessToken)=>{
                if(accessToken!=null){
                    console.log(accessToken);
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
                        this.setState({userId: responseData.userId});
                        console.log('Step1: userId:' + this.state.userId);
                        // this.getSelectedRecipes();
                        console.log('Step3: selectedRecipres:' + this.state.selectedRecipes);
                    }).then((selectedRecipes) =>
                        fetch(`${API_URL}/mealplan/add`, {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': accessToken
                            },
                            body: JSON.stringify(this.state.selectedRecipes)
                        }).then((response) => {
                            if (response.status == "200") {
                                console.log('Recipe successfully added');
                                alert("Item successfully added");
                                // for rerender
                                Actions.home();
                            } else {
                                console.log(response.status);
                            }
                        }).catch((error) => {
                            console.log(`Error in adding item in inventory --> ${error}`);
                        })
                    )
                }
            })
    }

    componentDidMount() {
        //get date from MealPlan
        console.log('dateString from actions params:' + this.props.date);
        console.log('dateString in state:' + this.state.mealDate);
        console.log('userId in recipe:' + this.state.userId);
        this.loadAllRecipes();
    }

    onPressCheckBox(id) {
        let tmp = this.state.checkedBox;
        if ( tmp.includes( id ) ) {
            tmp.splice( tmp.indexOf(id), 1 );
        } else {
            tmp.push( id );
            this.state.selectedRecipes.push({
                userId: this.state.userId,
                recipeId: id,
                mealDate: this.state.mealDate
            })
        }
        this.setState({
            checkedBox: tmp
        });
        console.log(this.state.checkedBox);
        console.log(this.state.selectedRecipes)
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
                               <Icon name='arrow-back' style={{color: '#00BBF2'}}/>
                           </Button>
                       </Left>
                       <Body>
                           <Title>Plan Your Day</Title>
                       </Body>
                       <Right />
                   </Header>

                   <Content style={{height: hp("70%"), paddingBottom: 20}}>
                           {
                               this.state.loading ?
                                   <View>
                                       <Spinner color='deepskyblue'/>
                                   </View>
                                   :
                                   <ScrollView>
                                       <List>
                                           {this.state.items ? this.state.items.map((item)=>{
                                               return <ListItem thumbnail key={item.id} style={{marginVertical: 5}}>
                                                   <Left>
                                                       <Button transparent onPress={() => this.onPressImage(item)}>
                                                           <Thumbnail square source={{ uri: item.recipeImageUrl}} style={{borderRadius: 10, height: 70, width: 70}} />
                                                       </Button>

                                                   </Left>
                                                   <Body>
                                                       <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>{item.recipeName}</Text>
                                                       <Text note numberOfLines={1} style={{fontWeight: 'bold'}}>PrepTime: {item.prepTime}   CookTime: {item.timesCooked}</Text>
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



                       <RecipeDetailModal ref={'RecipeDetailModal'}/>
                    </Content>
                   <Button
                       style = {{margin: 20,
                           padding: 20,
                           marginBottom: 40,
                           alignSelf:'center',
                           justifyContent:'center',
                           backgroundColor:"deepskyblue",
                           width:wp("80%"),
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
                       <Text style={{color: "white", fontSize: 16, fontWeight: "bold"}}>ADD</Text>
                   </Button>
               </Container>
           </Provider>
        );
    }
}

export default MealPlanRecipe;