import React, { useState } from "react";

const Slide = () => {
  const [productData, setProductData] = useState({
    name: "",
    photo: [""],
    category: "",
    brand: "",
    cost: 0,
    featured: false,
    characteristics: [],
  });

  const [characteristic, setCharacteristic] = useState({ name: "", stat: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCharacteristicChange = (e) => {
    const { name, value } = e.target;
    setCharacteristic({ ...characteristic, [name]: value });
  };

  const addCharacteristic = () => {
    setProductData({
      ...productData,
      characteristics: [...productData.characteristics, characteristic],
    });
    setCharacteristic({ name: "", stat: "" }); // Сброс текущей характеристики
  };

  const removeCharacteristic = (index) => {
    setProductData({
      ...productData,
      characteristics: productData.characteristics.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно отправить данные на сервер
    console.log("Product Data:", productData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Photo URLs:</label>
        <input
          type="text"
          name="photo"
          value={productData.photo[0]} // Для примера берем только первый URL
          onChange={(e) =>
            setProductData({
              ...productData,
              photo: [e.target.value],
            })
          }
        />
      </div>

      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={productData.brand}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Cost:</label>
        <input
          type="number"
          name="cost"
          value={productData.cost}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Featured:</label>
        <input
          type="checkbox"
          name="featured"
          checked={productData.featured}
          onChange={(e) =>
            setProductData({ ...productData, featured: e.target.checked })
          }
        />
      </div>

      <div>
        <label>Characteristics:</label>
        {productData.characteristics.map((char, index) => (
          <div key={index}>
            <span>
              {char.name}: {char.stat}
            </span>
            <button type="button" onClick={() => removeCharacteristic(index)}>
              Remove
            </button>
          </div>
        ))}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={characteristic.name}
          onChange={handleCharacteristicChange}
        />
        <input
          type="text"
          name="stat"
          placeholder="Stat"
          value={characteristic.stat}
          onChange={handleCharacteristicChange}
        />
        <button type="button" onClick={addCharacteristic}>
          Add Characteristic
        </button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Slide;