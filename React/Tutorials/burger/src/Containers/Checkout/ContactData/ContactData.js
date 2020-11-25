import React,{Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import classes from './ContactData.module.css'
import Input from '../../../Components/UI/Input/Input';


class ContactData extends Component
{

    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:
                    {
                        required:true
                    },
                    valid:false
                },

                address:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:
                    {
                        required:true
                    },
                    valid:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your email'
                    },
                    value:'',
                    validation:
                    {
                        required:true
                    },
                    valid:false
                },
                zipcode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZipCode'
                    },
                    value:'',
                    validation:
                    {
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:
                    {
                        required:true
                    },
                    valid:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    value:'Fastest'
                }

        },
        loading:false
    }


    //Handling Orders
    orderHandler = (event)=>
    {
        event.preventDefault();
        const formData ={};

        for(let formElement in this.state.orderForm)
        {
            formData[formElement] = this.state.orderForm[formElement].value;
        }
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }


        axios.post('/orders.json',order)
        .then(response=>
            {
                //console.log(response);
                this.setState({loading:false,purchasing:false});
                this.props.history.push('/')
            })
        .catch(err=>
            {
                console.log(err);
                this.setState({loading:false,purchasing:false});
            })
        //console.log(this.props.ingredients)
    }

    checkValidity(value,rules)
    {
        let isValid = true;
        if(rules.required)
        {
            isValid = value.trim() !=='' && isValid;

        }
        if(rules.minLength)
        {
            isValid = value.length>= rules.minLength && isValid;
        }
        if(rules.maxLength)
        {
            isValid = value.length<=rules.maxLength && isValid;
        }


        return isValid
    }

    //OnChange Listener
    inputChangedHandler = (event,inputIdentifier)=>
    {
        console.log(event.target.value)
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //Deep Cloning the Objects inside updatedOrderForm
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
        updatedFormElement.value = event.target.value;
        //Checking Validaition 
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({orderForm:updatedOrderForm})
    }



    render()
    {
        const formElementsArray = [];

        for(let key in this.state.orderForm)
        {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })

        }

        let form =(<form onSubmit={this.orderHandler}>
                
                {formElementsArray.map(formElement =>
                    {
                        return (
                            <Input
                            key={formElement.id} 
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            invalid = {!formElement.config.valid}
                            shouldValidate = {formElement.config.validation}
                            changed={ (event)=> { this.inputChangedHandler(event,formElement.id) } }/>

                        )
                    })}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form> );
        if(this.state.loading)
        {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form }  
            </div>  
        )
    }

}

export default ContactData;