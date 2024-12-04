import "./Admin_auth.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const Admin_auth = () => {
    const [credentials, setCredentials] = useState({
      username: undefined,
      password: undefined,
    });
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
  
    const handleClick = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/login", credentials);
        if(res.data.isAdmin){
            dispatch({type:"LOGIN_SUCCESS", payload: res.data})
            navigate("/admin")
        }
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
      }
    };
  
    return (
      <>
        <Header type="auth" />
        <div className="container">
          <div className="form">
            <h1 className="title">AUTHENTICATION</h1>
            <input onChange={handleChange} id="login" type="text" placeholder="LOGIN" />
            <input onChange={handleChange} id="password" type="password" placeholder="PASSWORD" required />
            <button disabled={loading} onClick={handleClick}>
              LOG IN
            </button>
            {error && <h1 className="title">{error.message}</h1>}
          </div>
        </div>
      </>
    );
  };
export default Admin_auth;