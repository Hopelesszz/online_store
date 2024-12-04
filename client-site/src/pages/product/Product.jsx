import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./Product.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
const Product = () => {
    const category = useLocation()
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(`/product/searchByName?name=${category.state.name}`);

    return(
        <>
            <Header/>
            <div className="MainPage">
                <div className="gearContainer">
                {loading ? ("Loading"): (
                    <>{data.map((item, index) => (
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
                            <Link className="link" to = {`/product/${item._id}`}><p className="details">View details</p></Link>
                            <p className="priceGear">US${item.cost}</p>
                        </div>
                        </div>
                        ))}
                    </>)}
                </div>
            <Footer/>
            </div>
        </>
    )
}
export default Product;