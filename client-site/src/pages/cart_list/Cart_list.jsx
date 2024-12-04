import "./Cart_list.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Cart_list = () => {
    const [id,setId] = useState("")
    const { data, loading, error} = useFetch("/cart/all");
    const [arr, setArr] = useState([]);
    const { data:user} = useFetch(`user/find_user?ids=${arr}`);
    const navigate = useNavigate();
    const view = (id,login) => {
        navigate(`/cart_view/${id}`,{ state: {id,login}});
    }
    const deleteItem = (index) => {
        try {
            axios.delete(`cart/deleteCartByUser?userId=${index}`);
        } catch (err) {
            console.error(err);
        }
    };
    const addProduct = () => {
        navigate("/new_cart");
    }
    useEffect(() => {
        if (data && data[0] && data[0].items && data[0].items[0]) {
            const userIds = data.map((item) => item.userId);
            setArr(userIds);
        }
    }, [data])
    return(
       <>
        <Header/>
        <div className="productListMain">
                {loading ? ("Loading"): (
                <>
                {user.map((item, index) => (
                    <div className="productsContainer">
                        <div key={index} className="prodcutsComponent">
                        <div className="info">
                            <p>User</p>
                            <p>{item.login}</p>
                        </div>
                            <button onClick={() => view(item._id,item.login)} className="viewInfo">View more</button>
                            <button onClick={() => deleteItem(item._id)} className="deleteProduct">Delete</button>
                        </div>
                    </div>
                ))}
                </>
                )}
            <button onClick={addProduct} className="addButton">Add Cart</button>
            <Footer/>
        </div>
        </>
    )
}
export default Cart_list;