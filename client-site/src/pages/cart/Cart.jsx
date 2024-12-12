import "./Cart.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {faMagnifyingGlass,faCartShopping,faUser, faRightFromBracket, faCircleMinus, faCirclePlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { useState,useContext,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const Cart = () => {
    const KEY = "pk_test_51QJzO9GAapnkFftz0JFtsCHp4WNZU0pctzM13HPHa8y2b3rmv0ZwN6bf4ltmGqTc7330qtad0qtcLmbUIKErT9jE00HS7JbJmU"
    const fetchedProducts = [];
    const { user } = useContext(AuthContext);
    const [arr, setArr] = useState([]);
    const [quantity,setQuantity] = useState([]);
    const [owerall,setOwerall] = useState();
    const [tmp,setTmp] = useState();
    const [count,setCount] = useState(1)
    const [id,setId] = useState(null)
    const [products, setProducts] = useState([]);
    const { data, loading, error} = useFetch(`/cart?user=${user._id}`);
    const { data:name } = useFetch(`/product/find?ids=${arr}`)
    const navigate = useNavigate();
    const [stripeToken,setStripeToken] = useState(null);
    useEffect(() => {
        if (data && data[0] && data[0].items && data[0].items[0]) {
            const productIds = data[0].items.map((item) => item.productId);
            const quantities = data[0].items.map((item) => item.quantity);
            setArr(productIds);
            setQuantity(quantities)
        }
    }, [data])
    
    useEffect(() => {
        let costs = []
        let count = []
        for(let value of name){
            costs.push(value.cost)
        }
        for(let value of quantity){
            count.push(value)
        }
        let totalCosts = costs.map((cost, index) => cost * count[index]);

        let sum = 0;
        for(let value of totalCosts){
            sum+=Number(value);
        }
        setOwerall(sum)
    },[name],[quantity])

    const plusCount = (index) => {
        const newQuantities = [...quantity];
        newQuantities[index] += 1; 
        setQuantity(newQuantities);
    
        try {
            axios.post("/cart/", {
                userId: user._id,
                productId: arr[index], 
                quantity: 1
            });
        } catch (err) {
            console.error(err);
        }
    }
    const minusCount = (index) => {

            const newQuantities = [...quantity];
            newQuantities[index] -= 1;
            setQuantity(newQuantities);
    
            try {
                axios.post("/cart/", {
                    userId: user._id,
                    productId: arr[index], 
                    quantity: -1
                });
            } catch (err) {
                console.error(err);
            }
        
    }
    const deleteItem = (index) => {
        try {
            axios.delete(`/cart/remove?cartId=${data[0]._id}&productId=${arr[index]}`);
        } catch (err) {
            console.error(err);
        }
    };
    const onToken = (token) => {
        setStripeToken(token)
    }
    useEffect(() => {
        const makeRequest = async() =>{
            try{
                const res = await axios.post("/checkout/payment",{
                    tokenId:stripeToken.id,
                    amount:owerall * 100,
                });
                console.log(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        stripeToken && makeRequest()
        afterPayment()
    },[stripeToken])
    const afterPayment = async() => {
        try {
            axios.post("/order/", {
                userId: user._id,
                items:data[0].items,
                totalAmount:owerall,
            });
        } catch (err) {
            console.error(err);
        }
        try {
            axios.delete(`/cart/${data[0]._id}`);
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <>
        <Header/>
        <div className="cartMain">
            <div className="titleCart">
                <p className="cartTitle">Your cart total is US${owerall}</p>
                <StripeCheckout name="Shop"
                image="https://www.google.com/imgres?q=razer%20logo&imgurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F1647721275622611153%2FC1BC8262A35E26EAEC9DDE0ACDFED682BC5CE2FC%2F%3Fimw%3D637%26imh%3D358%26ima%3Dfit%26impolicy%3DLetterbox%26imcolor%3D%2523000000%26letterbox%3Dtrue&imgrefurl=https%3A%2F%2Fsteamcommunity.com%2Fsharedfiles%2Ffiledetails%2F%3Fl%3Drussian%26id%3D2350874185&docid=mj2S9MP-AMbK8M&tbnid=W4Y8tv8auAwhJM&vet=12ahUKEwjxu6WF0dSJAxX8IBAIHcpQGScQM3oECFMQAA..i&w=637&h=358&hcb=2&ved=2ahUKEwjxu6WF0dSJAxX8IBAIHcpQGScQM3oECFMQAA"
                billingAddress
                shippingAddress
                description= {`Your total is ${owerall}$`}
                amount={owerall * 100} 
                token={onToken}
                stripeKey={KEY}
                >
                <button className="paymentButton">Buy</button>
                </StripeCheckout>
            </div>
            {loading ? ("Loading"): (
            <>
           {name.map((item, index) => (
            <div key={index} className="cartGear">
            <img className="cartPhoto" src={name[index].photo[0]}/>
            <p>{item.name}</p>
            <div className="itemsAmount">
                <button onClick={() => minusCount(index)}>
                    <FontAwesomeIcon className="iconCart" icon={faCircleMinus} />
                </button>
                <input min="1" value={quantity[index]} readOnly type="number" />
                <button onClick={() => plusCount(index)}>
                    <FontAwesomeIcon className="iconCart" icon={faCirclePlus} />
                </button>
                <button onClick={() => deleteItem(index)}>
                    <FontAwesomeIcon className="iconCart" icon={faTrashCan} />
                </button>
                </div>
                <p>${item.cost * quantity[index]}</p>
            </div>
            ))}
            
            </>)}
            <Footer/>
        </div>
        </>
    )
}
export default Cart;