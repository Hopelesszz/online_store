import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Gear.css";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const Gear= () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const gear = useLocation()
    const id = gear.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`/product/get/${id}`);
    const Cart = () => {
        try{
        const newCartGear = axios.post("/cart/",
            {
                userId: user._id,
                productId: data._id,
                quantity: 1
            });
        console.log(newCartGear)
        }
        catch(err){
            
        }
    }
    const settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return(
        <>
        <Header/>
        
            <div className="gearMain">
            <div className="titleGear">
                <p className="gearTitle">{data.name}</p>
            </div>
            <div className="slider">
                <Slider {...settings}>
                {data.photo?.map((photo, index) => (
                        <div key={index} className="Container">
                            <img className="GearPhoto" src={photo} />
                        </div>
                ))}    
                </Slider>
            </div>
            <div className="tech">
                    <p className="techTitle">TECH SPECS</p>
                    <div>
                            <div className="techSpec">
                                <p className="techSpecName">Name</p>
                                <p className="techSpecValue">{data.name}</p>
                            </div>
                            <div className="line"></div>
                        </div>
                        <div>
                            <div className="techSpec">
                                <p className="techSpecName">Category</p>
                                <p className="techSpecValue">{data.category}</p>
                            </div>
                            <div className="line"></div>
                        </div>
                        <div>
                            <div className="techSpec">
                                <p className="techSpecName">Brand</p>
                                <p className="techSpecValue">{data.brand}</p>
                            </div>
                            <div className="line"></div>
                        </div>
                        <div>
                            <div className="techSpec">
                                <p className="techSpecName">Cost</p>
                                <p className="techSpecValue">{data.cost}$</p>
                            </div>
                            <div className="line"></div>
                        </div>
                    {data.characteristics?.map((characteristic, index) => (
                    <div key={index}>
                        <div className="techSpec">
                            <p className="techSpecName">{characteristic.name}</p>
                            <p className="techSpecValue">{characteristic.stat}</p>
                        </div>
                        <div className="line"></div>
                    </div>
                    ))}
                    <button onClick={Cart} className="Cart">Add to Cart</button>
            </div> 
        <Footer/>
        </div>
        </>
    )
}
export default Gear