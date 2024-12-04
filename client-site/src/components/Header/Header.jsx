import "./Header.css";
import {faMagnifyingGlass,faCartShopping,faUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Header = ({ type }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(AuthContext);
    const [name,setName] = useState("")
    const nameSearch = () => {
        navigate("/product", { state: {name}});
    }
    const LinkToProductPage = () =>{
        navigate('/products')
    }
    const Logout = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        navigate("/"); 
    };
    return(
        <>
        <div className="header">
            <Link className="headerText" to="/"><p>Main</p></Link>
            {user && user.isAdmin && (
            <Link className="headerText" to="/admin"><p>Admin panel</p></Link>
            )}
            {!user && (
                <>
                <Link className="headerText" to="/auth"><p>Sign in</p></Link>
                <Link className="headerText" to="/reg"><p>Sign up</p></Link>
                </>
            )}

            <div className="searchContainer">
            <input onChange={e=>setName(e.target.value)} type="text" className="search" placeholder="SEARCH"></input>
            <button onClick={nameSearch}><FontAwesomeIcon  icon={faMagnifyingGlass}/></button>
            </div>
            <Link to="/cart"><FontAwesomeIcon className="icon" icon={faCartShopping}/></Link>
            <FontAwesomeIcon className="icon" onClick={Logout} icon={faRightFromBracket}/>
            {user && (
                <Link className="headerText" to="/account"><div className="user"><FontAwesomeIcon className="icon" icon={faUser}/><p className="headerText">{user.login}</p></div></Link>
            )}
        </div>
        <div className="br"></div>
        </>
    )   
}
export default Header;