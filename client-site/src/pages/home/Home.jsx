import Category from "../../components/Category/Category";
import Header from "../../components/Header/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const Home = () => {
    const { data, loading, error } = useFetch("/product/searchByCategoryFeatured?category=Mouse");
    const { data: keyboardData, loading: loadingKeyboard, error: errorKeyboard } = useFetch("/product/searchByCategoryFeatured?category=Keyboard");
    const navigate = useNavigate();
    const settings = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    return(
        <>
            <Header/>
            <div className="mainPage">
                <Category/>
                <h1 className="mainTitle">DISCOVER OUR GEAR FOR GAMERS.</h1>
                <p className="underMainTitle">Mice, keyboards, headsets & more</p>
                <h1 className="Title">BEST MICE IN THE SHOP</h1>
                {loading ? ("Loading"): (
                    <><div className="sliderContainer">
                    <Slider {...settings}>
                    {data.map((data,index)=> (
                        <div key={index}>
                            <img className="photoProduct" src={data.photo} />
                            <div className="shortDesc">
                                <p className="text">{data.name}</p>
                                <div className="buy">
                                    <p className="textPrice">$US{data.cost}</p>
                                    <button><Link className="link" to={`/product/${data._id}`}>BUY</Link></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </Slider>
                </div></>)}
                <h1 className="Title">BEST KEYBOARDS IN THE SHOP</h1>
                {loadingKeyboard ? ("Loading"): (
                    <><div className="sliderContainer">
                    <Slider {...settings}>
                    {keyboardData.map((keyboardData,index)=> (
                        <div key={index}>
                            <img className="photoProduct" src={keyboardData.photo} />
                            <div className="shortDesc">
                                <p className="text">{keyboardData.name}</p>
                                <div className="buy">
                                    <p className="textPrice">$US{keyboardData.cost}</p>
                                    <button><Link className="link" to={`/product/${data._id}`} >BUY</Link></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </Slider>
                </div></>)}
                <h1 className="whyTitle">WHY US</h1>
                <div className="whyContainer">
                    <div>
                        <h1>HIGHEST GEAR QUALITY</h1>
                        <p>We offer only certified and tested devices from the leading global gaming edge brands. Every mouse, keyboard or headset is subjected to strict quality control so you can enjoy an unbeatable gaming experience.</p>
                    </div>
                    <div>
                        <h1>WIDE VARIETY</h1>
                        <p>Our store offers models suitable for both professional and amateur cyber athletes. We have the perfect accessory for any style of play and budget.</p>
                    </div>
                    <div>
                        <h1>AVAILABLE PRICES AND DISCOUNT</h1>
                        <p>We make sure that our customers get the best possible service at a reasonable price. Regular promotions and discounts on popular products allow you to save money while getting top-notch gaming equipment.</p>
                    </div>
                </div>
            <Footer/>
            </div>
        </>
    )
}
export default Home;