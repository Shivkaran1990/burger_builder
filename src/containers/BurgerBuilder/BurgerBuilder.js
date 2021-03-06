import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES ={
    salad: 4,
    bacon :5,
    cheese :10,
    meat :20
}

class BurgerBuilder extends Component{
    state={
        ingredients :{
            salad: 0,
            bacon :0,
            cheese :0,
            meat :0
        },
        totalPrice:40,
        purchasable:false,
        purchesing:false
    }
updatePurchaseState(ingredients){
    const sum=Object.keys(ingredients)
              .map(igKey=>{return ingredients[igKey];})
              .reduce((sum,el)=>{
                  return sum+el;
              },0);

              this.setState({purchasable:sum>0})
}

addIngredientHandler=(type)=>{
    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount + 1;
    const updatedIngredients={
        ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceAddition=INGREDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice=oldPrice+priceAddition;
    this.setState({totalPrice:newPrice,
    ingredients:updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
    }

 removeIngredientHandler=(type)=>{
    const oldCount=this.state.ingredients[type];
    if(oldCount<=0)
    {
        return;
    }
    const updatedCount=oldCount - 1;
    const updatedIngredients={
        ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceDeduciton=INGREDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice=oldPrice-priceDeduciton;
    this.setState({totalPrice:newPrice,
    ingredients:updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
}
closePurchaseHandler=()=>{
    this.setState({purchesing:false})
}
contiouePurchaseHandler=()=>{
  alert("Good Job");
}

purchaseHandler=()=>{
    this.setState({purchesing:true});
}

    render()
    {
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo)
        {
          disabledInfo[key]=disabledInfo[key]<=0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchesing} closeModal={this.closePurchaseHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    purchaseCancelled={this.closePurchaseHandler}
                    purchaseContinued={this.contiouePurchaseHandler}
                    price={this.state.totalPrice}
                    ></OrderSummary>
                </Modal>
                <Burger ingredient={this.state.ingredients}></Burger>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler} 
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
            />
            </Aux>            
        )
    }
}

export default BurgerBuilder;