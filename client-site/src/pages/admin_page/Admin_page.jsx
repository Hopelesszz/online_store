import "./Admin_page.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Link} from "react-router-dom";
const Admin_page = () => {
    return(
        <>
        <Header/>
        <div className="adminMain">
            <div className="panel">
                <Link className="panelElement" to="/user_list">Users</Link>
                <Link className="panelElement" to="/product_list">Products</Link>
                <Link className="panelElement" to="/cart_list">Carts</Link>
                <Link className="panelElement" to="/order_list">Orders</Link>
            </div >
            <Footer/>
        </div>
        </>
    )
}
export default Admin_page;