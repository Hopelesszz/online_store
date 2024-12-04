import "./User_list.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import {Link} from "react-router-dom";
import axios from "axios";
import { useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const User_list = () => {
    const [id,setId] = useState("")
    const { data, loading, error} = useFetch("/user");
    const navigate = useNavigate();
    const deleteItem = (index) => {
        try {
            axios.delete(`/user/${index}`);
        } catch (err) {
            console.error(err);
        }
    };
    const addUser = () => {
        navigate("/new_user");
    }
    const editUser = (name) => {
        setId(name)
        navigate("/update_user", { state: {id: name}});
    }
    return(
        <>
        <Header/>
        <div className="userListMain">
        {loading ? ("Loading"): (
            <>
            {data.map((item, index) => (
                <div className="usersContainer">
                <div key={index} className="usersComponent">
                    <div className="info">
                        <p>Login</p>
                        <p>{item.login}</p>
                    </div>
                    <div className="info">
                        <p>Email</p>
                        <p>{item.email}</p>
                    </div>
                    <div className="info">
                        <p>Phone</p>
                        <p>{item.phone}</p>
                    </div>
                    {item.isAdmin === true && (
                        <div className="info">
                            <p>Admin status</p>
                            <p>True</p>
                        </div>
                    )}
                    {item.isAdmin === false && (
                        <div className="info">
                            <p>Admin status</p>
                            <p>False</p>
                        </div>
                    )}
                    <button onClick={() => editUser(item._id)} className="editButton">Edit</button>
                    <button onClick={() => deleteItem(item._id)} className="deleteButton">Delete</button>
                </div>
                </div>
            ))}
            </>)}
            <button onClick={addUser} className="addButton">Add User</button>
            <Footer/>
        </div>
        </>
    )
}
export default User_list;