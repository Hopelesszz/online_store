import "./Account_update.css";
import Header from "../../components/Header/Header";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
const Account_update = () => {
    const { user } = useContext(AuthContext);
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const { data } = useFetch(`user/${user._id}`);
    const [login,setLogin] = useState(undefined)
    const [password,setPassword] = useState(undefined)
    const [email,setEmail] = useState(undefined)
    const [phone,setPhone] = useState(undefined)
    const [city,setCity] = useState(undefined)
    const [street,setStreet] = useState(undefined)
    const [house,setHouse] = useState(undefined)
    const [apartmaent,setApartment] = useState(undefined)
    const Logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/"); 
    };
    const regClick = () => {
        try{
        const reg = axios.put(`user/${user._id}`,
            {
                login:login,
                password:password,
                email:email,
                phone:phone,
                city:city,
                street:street,
                house:house,
                apartment_number:apartmaent
            });
        Logout()
        navigate("/auth")
        return reg.data
        }
        catch(err){}
    }
    return(
        <>
            <Header/>
            <div className="container">
            <form>
                <div className="Form">
                    <h1 className="title">UPDATE ACCOUNT</h1>
                    <input onChange={(event) => setLogin(event.target.value)} type="text" placeholder="LOGIN"/>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" placeholder="PASSWORD"/>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" placeholder="EMAIL"/>
                    <input onChange={(event) => setPhone(event.target.value)} type="tel" placeholder="PHONE"/>
                    <input onChange={(event) => setCity(event.target.value)} type="text" placeholder="CITY"/>
                    <input onChange={(event) => setStreet(event.target.value)} type="text" placeholder="STREET"/>
                    <input onChange={(event) => setHouse(event.target.value)} type="text" placeholder="HOUSE NUMBER"/>
                    <input onChange={(event) => setApartment(event.target.value)} type="number" min="0" placeholder="APARTMENT NUMBER"/>
                    <button  onClick={regClick}>UPDATE</button>
                </div>
                </form>
            </div>
        </>
    )
}
export default Account_update;