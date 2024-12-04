import "./updateUser.css";
import Header from "../../components/Header/Header";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
const UpdateUser = () => {
    const navigate = useNavigate();
    const id = useLocation()
    const [login,setLogin] = useState(undefined)
    const [password,setPassword] = useState(undefined)
    const [email,setEmail] = useState(undefined)
    const [phone,setPhone] = useState(undefined)
    const [city,setCity] = useState(undefined)
    const [street,setStreet] = useState(undefined)
    const [house,setHouse] = useState(undefined)
    const [apartmaent,setApartment] = useState(undefined)
    const [admin,setAdmin] = useState(undefined)
    if(admin === "True"){
        setAdmin(true)
    }
    if(admin === "False"){
        setAdmin(false)
    }
    const regClick = () => {
        try{
        const reg = axios.put(`user/${id.state.id}`,
            {
                login:login,
                password:password,
                email:email,
                phone:phone,
                city:city,
                street:street,
                house:house,
                apartment_number:apartmaent,
                isAdmin:admin
            });
            navigate("/user_list")
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
                    <p className="status">ADMIN STATUS</p>
                    <select onClick={(event) => setAdmin(event.target.value)}>
                        <option>True</option>
                        <option>False</option>
                    </select>
                    <button  onClick={regClick}>UPDATE</button>
                </div>
                </form>
            </div>
        </>
    )
}
export default UpdateUser;