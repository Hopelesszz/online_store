import "./Account.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Link} from "react-router-dom";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Account = () => {
    const { user } = useContext(AuthContext);
    return(
        <>
            <Header/>
            <div className="accountMain">
            <p className="techTitle">Your Account</p>
                <div className="accountContainer">
                    <div className="accountInfo">
                        <p className="accountTitle">Login</p>
                        <p className="accountValue">{user.login}</p>
                    </div>
                    <div className="accountInfo">
                        <p className="accountTitle">Email</p>
                        <p className="accountValue">{user.email}</p>
                    </div>
                    <div className="accountInfo">
                        <p className="accountTitle">Phone</p>
                        <p className="accountValue">{user.phone}</p>
                    </div>
                    <div className="accountInfo">
                        <p className="accountTitle">City</p>
                        <p className="accountValue">{user.city}</p>
                    </div>
                    <div className="accountInfo">
                        <p className="accountTitle">Street</p>
                        <p className="accountValue">{user.street}</p>
                    </div>
                    <div className="accountInfo">
                        <p className="accountTitle">House</p>
                        <p className="accountValue">{user.house}</p>
                    </div>
                    <div className="accountInfo">
                        <p className="accountTitle">Apartment number</p>
                        <p className="accountValue">{user.apartment_number}</p>
                    </div>
                    <Link to="/account_update"><button className="Account">Update Account</button></Link>
                </div>
                <Footer/>
            </div>
        </>
    )
}
export default Account;