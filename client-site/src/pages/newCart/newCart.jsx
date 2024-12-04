import "./newCart.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState,useContext,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
const New_Cart = () => {
    const navigate = useNavigate();
    const { data, loading, error} = useFetch("/user");
    const { data: product, loading: productLoading, error: productError} = useFetch("/product");
    const [user,setUser] = useState(undefined)
    const [gear,setProductId] = useState(undefined)
    const [amount,setQantity] = useState(undefined)
    const newCart = async () => {
      try{
        const cart = await axios.post("/cart/",
          {
            userId: user,
            productId: gear, 
            quantity: amount,  
          });
        navigate("/cart_list")
        return cart.data
        }
        catch(err){}
    }
    return(
        <>
        <Header/>
        <div className="newProductMain">
            <div className="newCartContainer">
                <h1 className="newProductTitle">add cart</h1>
                <p className="newFeatured">User</p>
                <select className="newProductInput" onChange={(event) => setUser(event.target.value)}>
                {loading ? "loading"
                    : data &&
                      data.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.login}
                        </option>
                        ))}
                </select>
                <select className="newProductInput" onChange={(event) => setProductId(event.target.value)}>
                {productLoading ? "loading"
                    : product &&
                      product.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                        ))}
                </select>
                <input onChange={(event) => setQantity(event.target.value)} className="newProductInput" type="number" placeholder="Quantity"/>
                <button onClick={newCart} className="newButton">Add Cart</button>
            </div>
            <Footer/>
        </div>
        </>
    )
}
export default New_Cart;