import "./Order_view.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useLocation } from "react-router-dom";
import {faMagnifyingGlass,faCartShopping,faUser, faRightFromBracket, faCircleMinus, faCirclePlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import { useState,useContext,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Order_view = () => {
    axios.defaults.baseURL = "http://localhost:8800";
    const user = useLocation()
    const [foundGear,setFoundGear] = useState([]);
    const [gear, setGear] = useState();
    const [arr, setArr] = useState([]);
    const [quantity,setQuantity] = useState([]);
    const [owerall,setOwerall] = useState();
    const [tmp,setTmp] = useState();
    const [count,setCount] = useState(1)
    const [id,setId] = useState(null)
    const [products, setProducts] = useState([]);
    const { data, loading, error} = useFetch(`/order?user=${user.state.id}`);
    const { data:name } = useFetch(`/product/find?ids=${arr}`)
    const navigate = useNavigate();
    useEffect(() => {
        if (data && data[0] && data[0].items && data[0].items[0]) {
            const productIds = data[0].items.map((item) => item.productId);
            const quantities = data[0].items.map((item) => item.quantity);
            setArr(productIds);
            setQuantity(quantities)
            setOwerall(data[0].totalAmount)
        }
    }, [data])
    

    const plusCount = (index) => {
        const newQuantities = [...quantity];
        newQuantities[index] += 1; 
        setQuantity(newQuantities);

        try {
            axios.put(`order/updateQuantity/${data[0]._id}`, {
                item:data[0].items[index]._id,
                quantity: 1
            });
        } catch (err) {
            console.error(err);
        }
    }
    const minusCount = (index) => {
            if(quantity[index] === 1){
                alert("The minimal amount of gear must be 1.")
            }
            else{
                const newQuantities = [...quantity];
                newQuantities[index] -= 1;
                setQuantity(newQuantities);
        
                try {
                    axios.put(`order/updateQuantity/${data[0]._id}`, {
                        item:data[0].items[index]._id,
                        quantity: -1
                    });
                } catch (err) {
                    console.error(err);
                }
            }
    }
    const deleteItem = (index) => {
        try {
            axios.delete(`order/deleteFromOrder/${data[0]._id}`,{
                data: { item: data[0].items[index]._id },
            });
        } catch (err) {
            console.error(err);
        }
    };
    const Find = async () => {
        try {
            const response = await axios.get(`product/searchByName?name=${gear}`);
            if (response.data) {
                setFoundGear(response.data);
            } else {
                setFoundGear([]); 
            }
        } catch (err) {
            console.error(err);
        }
    };
    const Add = async () => {
        const token = localStorage.getItem("token");
        console.log(token)
        try{
            const add = await axios.put("order/addToOrder/",{
                orderId:data[0]._id,
                productId:foundGear[0]._id,
                quantity:1
            });
            console.log(add.data)
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <>
        <Header/>
        <div className="cartMain">
            <div className="titleCart">
                <p className="cartTitle">{user.state.login} order total is US${owerall}</p>
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
            <input onChange={e=>setGear(e.target.value)} type="text" className="searchCart" placeholder="SEARCH"></input>
            <button onClick={Find} className="newCartItemButton">Add Product</button>
            <>
            {foundGear && foundGear.length > 0 ? (
                foundGear.map((item, index) => (
                        <div className="foundGear">
                        <div key={index} className="gear">
                        <img className="gearPhoto" src={item.photo[0]}/>
                        <div className="desc">
                            <p className="nameGear">{item.name}</p>
                            <ul className="descList">
                            {item.characteristics.slice(0, 3).map((characteristic, index) => (
                                <li key={index} className="descGear">
                                {characteristic.name}: {characteristic.stat}
                                </li>
                            ))}
                            </ul>
                            <p className="priceGear">US${item.cost}</p>
                            <button onClick={Add} className="cartButton">Add to Order</button>
                        </div>
                        </div>
                        </div>
                ))
            ) : (
                <p>No items found</p>
            )}
                </>
            <Footer/>
        </div>
        </>
    )
}
export default Order_view;