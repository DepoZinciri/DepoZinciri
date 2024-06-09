import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

function AddInventoryForm({ warehouseId }) {
    const [formData, setFormData] = useState({
        itemType: "",
        itemDescription: "",
        quantity: "",
        expirationDate: "",
        userId: "" // This should be set to the logged-in user's ID
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/createWarehouseItem", {
                ...formData,
                warehouseId
            });
            console.log(response.data);
            // Redirect to the warehouse page
            history.push(`/warehouse/${warehouseId}`);
        } catch (error) {
            console.error(error);
            // Handle error (show error message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="text-center border border-light p-5 rounded bg-blue">
            <h1 className="h3 mb-4">Envanter Ekle</h1>
            <div className="form-group">
                <label>Ürün Adı</label>
                <input type="text" name="itemType" className="form-control" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Ürün Açıklaması</label>
                <input type="text" name="itemDescription" className="form-control" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Ürün Miktarı</label>
                <input type="number" name="quantity" className="form-control" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Son Kullanma Tarihi</label>
                <input type="date" name="expirationDate" className="form-control" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn bg-dblue text-white btn-block mt-3">Ekle</button>
        </form>
    );
}

export default AddInventoryForm;
