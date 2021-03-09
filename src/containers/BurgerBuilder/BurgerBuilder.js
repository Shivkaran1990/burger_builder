import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES ={
    salad: 4,
    bacon :5,
    cheese :10,
    meat :20
}

class BurgerBuilder extends Component{
    state={
        ingredients :null,
        totalPrice:40,
        purchasable:false,
        purchesing:false,
        spinnerloadding:false,
        ingredientError:false
    }

    componentDidMount(){
        axios.get('https://react-js-karan-default-rtdb.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients :response.data});
        })
        .catch(error=>{this.setState({ingredientError:true})});

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
 // alert("Good Job");
 this.setState({spinnerloadding:true})
 const order={
                ingredients:this.state.ingredients,
                price :this.state.totalPrice,
                customer :{
                    name :'Shivkaran Ravidas',
                    address :{
                        street : 'Patela road Richha Lal muha',
                        zipCode : '458669',
                        country :'India'
                    },
                    email : 's.ravidas01@gmail.com',
                },
                delivaryMethod : 'fastest'
            }
        axios.post('/order.json',order)
        .then(response=>{
            console.log(response);
           this.setState({spinnerloadding:false,purchesing:false});
        })
        .catch(error=>{
            console.log(error);
            this.setState({spinnerloadding:false,purchesing:false});
        })
            

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
         let orderSummary=null;;
         let burger=this.state.ingredientError?<p>Error While Loading Ingredient!</p> :<Spinner></Spinner>;

         
         if(this.state.ingredients)
         {
            burger=(
                <Aux>
                <Burger ingredient={this.state.ingredients}></Burger>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler} 
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary= <OrderSummary ingredients={this.state.ingredients}
            purchaseCancelled={this.closePurchaseHandler}
            purchaseContinued={this.contiouePurchaseHandler}
            price={this.state.totalPrice}
            ></OrderSummary>;
         }

         if(this.state.spinnerloadding)
         {
            orderSummary=<Spinner></Spinner>;
         }

        return(
            <Aux>
                <Modal show={this.state.purchesing} closeModal={this.closePurchaseHandler}>
                   {orderSummary}   
                </Modal>
                {burger}
                
            </Aux>            
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios);