import "./Order_list.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Order_list = () => {
    const [id,setId] = useState("")
    const { data, loading, error} = useFetch("/order");
    const [arr, setArr] = useState([]);
    const { data:user} = useFetch(`user/find_user?ids=${arr}`);
    const navigate = useNavigate();
    const deleteItem = (index) => {
        try {
            axios.delete(`order/deleteOrderByUser?userId=${index}`);
        } catch (err) {
            console.error(err);
        }
    };
    const view = (id,login) => {
        navigate(`/order_view/${id}`,{ state: {id,login}});
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
            <Footer/>
        </div>
        </>
    )
}
export default Order_list;