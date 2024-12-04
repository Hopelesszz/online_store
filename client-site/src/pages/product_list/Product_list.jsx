import "./Product_list.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Product_list = () => {
    const [id,setId] = useState("")
    const { data, loading, error} = useFetch("/product");
    const navigate = useNavigate();
    const view = (name) => {
        navigate(`/product_view/${name}`);
    }
    const deleteItem = (index) => {
        try {
            axios.delete(`/product/${index}`);
        } catch (err) {
            console.error(err);
        }
    };
    const addProduct = () => {
        navigate("/new_product");
    }
    return(
        <>
        <Header/>
            <div className="productListMain">
                {loading ? ("Loading"): (
                <>
                {data.map((item, index) => (
                    <div className="productsContainer">
                        <div key={index} className="prodcutsComponent">
                        <div className="info">
                            <p>Photo</p>
                            <img className="itemPhoto" src={item.photo[0]} />
                        </div>
                        <div className="info">
                            <p>Name</p>
                            <p>{item.name}</p>
                        </div>
                        <div className="info">
                            <p>Сategory</p>
                            <p>{item.category}</p>
                        </div>
                        <div className="info">
                            <p>Brand</p>
                            <p>{item.brand}</p>
                        </div>
                        <div className="info">
                            <p>Cost</p>
                            <p>{item.cost}$</p>
                        </div>
                            <button onClick={() => view(item._id)} className="viewInfo">View more</button>
                            <button onClick={() => deleteItem(item._id)} className="deleteProduct">Delete</button>
                        </div>
                    </div>
                ))}
                </>
                )}
            <button onClick={addProduct} className="addButton">Add Product</button>
            <Footer/>
        </div>
        </>
    )
}
export default Product_list;