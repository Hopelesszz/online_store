import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import "./Products.css";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
const Products = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const category = useLocation()
    const [brand,setBrand] = useState([]);
    const { data, loading, error,reFetch } = useFetch(`/product/searchByPrice?category=${category.state.category}&min=${minPrice}&max=${maxPrice}&brand=${brand}`)
    const { data: count, loading: loadingCount, error: errorCount } = useFetch(`product/searchCount?category=${category.state.category}`);
    const changeBrand = (value) => {
        setBrand((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
            } else {
                return [...prev, value];
            }
        });
    }
    console.log(brand)
    return(
        <>
        <Header/>
        <div className="MainPage">
            <p className="result">{count} result</p>
            <div className="items">
            <div className="searchParams">
                <div className="brand">
                    <p>Brand</p>
                    <div className="input">
                        <input onChange={() => changeBrand("HyperX")} type="checkbox" checked={brand.includes("HyperX")}></input>
                        <p>HyperX</p>
                    </div>
                    <div className="input">
                        <input onChange={() => changeBrand("Razer")} type="checkbox" checked={brand.includes("Razer")}></input>
                        <p>Razer</p>
                    </div>
                    <div className="input">
                        <input onChange={() => changeBrand("Hator")} type="checkbox" checked={brand.includes("Hator")}></input>
                        <p>Hator</p>
                    </div>
                    <div className="input">
                        <input onChange={() => changeBrand("SteelSeries")} type="checkbox" checked={brand.includes("SteelSeries")}></input>
                        <p>SteelSeries</p>
                    </div>
                    <div className="input">
                        <input onChange={() => changeBrand("Logitech")} type="checkbox" checked={brand.includes("Logitech")}></input>
                        <p>Logitech</p>
                    </div>
                </div>
                <p className="priceTitle">Price</p>
                <div className="price">
                <input max={1000} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} type="number"/>
                <div></div>
                <input  max={1000} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number"/>
                </div>

            </div>
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
            </div>
        <Footer/>
        </div>
    </>
    )
}
export default Products;