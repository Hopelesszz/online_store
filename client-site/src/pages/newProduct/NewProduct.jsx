import "./NewProduct.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState,useContext,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";

const New_Product = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef();

    const handleFileClick = () => {
        fileInputRef.current.click(); 
    };
    const [files,setFiles] = useState("")
    const [name,setName] = useState(undefined)
    const [brand,setBrand] = useState(undefined)
    const [category,setCategory] = useState(undefined)
    const [cost,setCost] = useState(undefined)
    const [featured,setFeatured] = useState(undefined)
    const [characteristics, setCharacteristics] = useState([]);
    const [characteristic, setCharacteristic] = useState({ name: "", stat: "" });
    if(featured === "True"){
        setFeatured(true)
    }
    if(featured === "False"){
        setFeatured(false)
    }
    const Add = () => {
        setCharacteristics([...characteristics, { name: "", stat: "" }]);
    }
    const Remove = (index) => {
        setCharacteristics(characteristics.filter((_, i) => i !== index));
    }
    console.log(characteristics)
    const newProduct = async (e) => {
        e.preventDefault()
        try{
            const list = await Promise.all(Object.values(files).map(async file=>{
                const data = new FormData()
                data.append("file",file)
                data.append("upload_preset","upload")
                const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dauegjetz/image/upload", data);
                const {url} =  uploadRes.data
                return url
            }))
            console.log(list)
            const reg = axios.post("product/",
                {
                    photo:list,
                    name:name,
                    category:category,
                    brand:brand,
                    cost:cost,
                    featured:featured,
                    characteristics:characteristics
                });
            navigate("/product_list")
            return reg.data
        }
        catch(err){

        }
    }

    return(
        <>
        <Header/>
        <div className="newProductMain">
            <div className="newProductContainer">
            <h1 className="newProductTitle">add product</h1>
            <input ref={fileInputRef} type="file" multiple onChange={(e) => setFiles(e.target.files)} className="hiddenFileInput"/>
            <div className="newProductPhoto" onClick={handleFileClick}>Photos</div>
            <input onChange={(event) => setName(event.target.value)} className="newProductInput" type="text" placeholder="name"></input>
            <input onChange={(event) => setBrand(event.target.value)} className="newProductInput" type="text" placeholder="brand"></input>
            <input onChange={(event) => setCategory(event.target.value)} className="newProductInput" type="text" placeholder="category"></input>
            <input onChange={(event) => setCost(event.target.value)} className="newProductInput" type="number" placeholder="cost"></input>
            <p className="newFeatured">Featured</p>
            <select className="newProductInput" onClick={(event) => setFeatured(event.target.value)}>
                <option>True</option>
                <option>False</option>
            </select>
            <p className="newFeatured">Characteristics:</p>
            <button onClick={Add} className="green">Add</button>
            {characteristics.map((char, index) => (
            <div key={index} className="characteristicRow">
            <input className="newProductInput" type="text" placeholder="Name" value={char.name}
            onChange={(e) => {
                const newCharacteristics = [...characteristics];
                newCharacteristics[index].name = e.target.value;
                setCharacteristics(newCharacteristics);
            }}/>
            <input className="newProductInput" type="text" placeholder="Stat" value={char.stat}
            onChange={(e) => {
                const newCharacteristics = [...characteristics];
                newCharacteristics[index].stat = e.target.value;
                setCharacteristics(newCharacteristics);
            }}/>
            <button className="red" onClick={() => Remove(index)}>Remove</button>
            </div>
            ))}


            <button onClick={newProduct} className="newButton">Add Product</button>
            </div>
            <Footer/>
        </div>
        </>
    )
}
export default New_Product;