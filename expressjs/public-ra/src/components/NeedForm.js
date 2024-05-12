import React, { useState } from "react";
import axios from 'axios';
// (TODO:DepoZinciri)
function NeedForm() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        address: '',
        emergencyStatus: '',
        itemDescription: '',
        requestType: '',
        amount: ''
    });

    const { name, surname, emergencyStatus, itemDescription, phone, address, requestType, amount } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('/api/create-request', formData);
            // Handle success
            console.log(response.data);
            
        } catch (error) {
            // Handle error
            console.error('Error creating request:', error);
            
        }
    };

    return (
        <div className="col-lg-6 mt-3 mx-auto">
            <form onSubmit={handleSubmit} method="POST" className="text-center border border-light p-5 rounded bg-blue">
                {}
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="İsim*"
                    required
                    className="form-control mb-4"
                />
                {/* Input for Surname */}
                <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={handleChange}
                    placeholder="Soyisim*"
                    required
                    className="form-control mb-4"
                />
                {}
                <select
                    name="requestType"
                    value={requestType}
                    onChange={handleChange}
                    className="browser-default custom-select mb-4"
                    required
                >
                    <option className="d-none" defaultValue>İhtiyaç Tipi*</option>
                    <option value="Maddi Destek">Maddi Destek</option>
                    <option value="Taşıma">Taşıma</option>
                    <option value="Eşya">Eşya</option>
                    <option value="Konaklama">Konaklama</option>
                </select>
                {}
                <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                    placeholder="Miktar*"
                    required
                    className="form-control mb-4"
                />
                {}
                <select
                    name="emergencyStatus"
                    value={emergencyStatus}
                    onChange={handleChange}
                    className="browser-default custom-select mb-4"
                >
                    <option className="d-none" defaultValue>Aciliyet*</option>
                    <option value="Yüksek">Yüksek</option>
                    <option value="Normal">Normal</option>
                    <option value="Düşük">Düşük</option>
                </select>
                {}
                <input
                    type="text"
                    name="itemDescription"
                    value={itemDescription}
                    onChange={handleChange}
                    placeholder="Aciliyet için kısa açıklama*"
                    required
                    className="form-control mb-4"
                />
                {}
                <input
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    placeholder="Telefon*"
                    required
                    className="form-control mb-4"
                />
                {}
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    placeholder="Adres*"
                    required
                    className="form-control mb-4"
                />
                {}
                <button
                    type="submit"
                    className="btn bg-dblue btn-block mt-3 c-white"
                >
                    Gönder
                </button>
            </form>
        </div>
    );
}

export default NeedForm;
