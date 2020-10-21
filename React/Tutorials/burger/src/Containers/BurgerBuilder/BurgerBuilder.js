import React,{Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 3,
    bacon: 2.5
};


class BurgerBuilder extends Component
{
    state = {
        ingredients: {
            salad:0,
            cheese:0,
            meat:0,
            bacon:0,
        },
        totalPrice: 4,
        canPurchase: false
    }

    updatePurchaseState = (ingredients)=>
    {
     
        const sum = Object.keys(ingredients).map(igKey=>
            {
                return ingredients[igKey];
            }).reduce((sum,el)=>
            {
                return sum+el;
            },0)

            this.setState({canPurchase:sum>0});

    }
    addIngredientHandler = (type)=>
    {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]= updatedCount;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({totalPrice: newPrice,ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type)=>
    {

        const oldCount = this.state.ingredients[type];
        if(oldCount<=0)
        {
            return;
        }
        const updatedCount = oldCount-1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]= updatedCount;
        const newPrice = INGREDIENT_PRICES[type] - this.state.totalPrice;
        this.setState({totalPrice: newPrice,ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients);

    }
    render()
    {
        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key]<=0
        }

        return(<Auxiliary>
            <Modal>
                <OrderSummary ingredients={this.state.ingredients}/>
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            canPurchase={this.state.canPurchase}
            disabled={disabledInfo}/>
            
        </Auxiliary>

        )
    }
}

export default BurgerBuilder;