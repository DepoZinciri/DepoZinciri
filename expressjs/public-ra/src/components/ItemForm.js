import React, { useState } from "react";
import axios from 'axios';

function ItemForm() {
    const [formData, setFormData] = useState({
        itemType: '',
        itemDescription: '',
        quantity: ''
    });

    const { itemType, itemDescription, quantity } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const dataWithTimestamps = { ...formData, createdAt: now, updatedAt: now };
            const response = await axios.post('/api/create-item', dataWithTimestamps);
            console.log(response.data);
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    return (
        <div className="col-lg-6 mt-3 mx-auto">
            <form onSubmit={handleSubmit} className="text-center border border-light p-5 rounded bg-blue">
                <input
                    type="text"
                    name="itemType"
                    value={itemType}
                    onChange={handleChange}
                    placeholder="Type*"
                    required
                    className="form-control mb-4"
                />
                <input
                    type="text"
                    name="itemDescription"
                    value={itemDescription}
                    onChange={handleChange}
                    placeholder="Description*"
                    required
                    className="form-control mb-4"
                />
                <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                    placeholder="Quantity*"
                    required
                    className="form-control mb-4"
                />
                <button
                    type="submit"
                    className="btn bg-dblue btn-block mt-3 c-white"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ItemForm;
