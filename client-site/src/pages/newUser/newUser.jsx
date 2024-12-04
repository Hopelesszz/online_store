import "./newUser.css";
import Header from "../../components/Header/Header";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const NewUser = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useFetch("/auth/reg");
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
        const reg = axios.post("user/new",
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
            <Header type="reg"/>
            <div className="container">
                <form>
                <div className="Form">
                    <h1 className="title">NEW USER</h1>
                    <input onChange={(event) => setLogin(event.target.value)} type="text" placeholder="LOGIN" required/>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" placeholder="PASSWORD" required/>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" placeholder="EMAIL" required/>
                    <input onChange={(event) => setPhone(event.target.value)} type="tel" placeholder="PHONE" required/>
                    <input onChange={(event) => setCity(event.target.value)} type="text" placeholder="CITY" required/>
                    <input onChange={(event) => setStreet(event.target.value)} type="text" placeholder="STREET" required/>
                    <input onChange={(event) => setHouse(event.target.value)} type="text" placeholder="HOUSE NUMBER" required/>
                    <input onChange={(event) => setApartment(event.target.value)} type="number" min="0" placeholder="APARTMENT NUMBER"/>
                    <p className="status">ADMIN STATUS</p>
                    <select onClick={(event) => setAdmin(event.target.value)}>
                        <option>True</option>
                        <option>False</option>
                    </select>
                    <button onClick={regClick}>CREATE</button>
                </div>
                </form>
            </div>
        </>
    )
}
export default NewUser;