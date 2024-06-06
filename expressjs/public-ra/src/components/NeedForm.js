import React, { useState } from "react";
import axios from 'axios';
import hand from '../public/images/hand2.png';

function NeedForm() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        address: '',
        emergencyStatus: '',
        itemDescription: '',
        requestType: 1, // HELP_REQUEST
        itemType: '',
        amount: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { name, surname, emergencyStatus, itemDescription, phone, address, itemType, amount } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('/api/createNeedRequest', formData);
            // Handle success
            console.log(response.data);
            setSuccessMessage('İhtiyacınız oluşturuldu, en kısa sürede yetkili sizinle iletişime geçecektir.');
            setErrorMessage('');
        } catch (error) {
            // Handle error
            console.error('Error creating request:', error);
            setErrorMessage('İhtiyaç oluştururken hata, lütfen daha sonra tekrar deneyiniz.');
            setSuccessMessage('');
        }
        setFormData({
            name: '',
            surname: '',
            phone: '',
            address: '',
            emergencyStatus: '',
            itemDescription: '',
            requestType: 1,
            itemType: '',
            amount: ''
        });
    };

    return (
        <div className="col-lg-6 mt-3 mx-auto">
            <form onSubmit={handleSubmit} method="POST" className="text-center border border-light p-5 rounded bg-blue">
                <img src={hand} className="mb-4" alt="hand"></img>
                <p className="h1 mb-4">İhtiyaç Oluştur</p>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="İsim*"
                    required
                    className="form-control mb-4"
                />
                <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={handleChange}
                    placeholder="Soyisim*"
                    required
                    className="form-control mb-4"
                />
                <select
                    name="itemType"
                    value={itemType}
                    onChange={handleChange}
                    className="browser-default custom-select mb-4"
                    required
                >
                    <option className="d-none" defaultValue>İhtiyaç Tipi*</option>
                    <option value="Maddi Yardım">Maddi Yardım</option>
                    <option value="Taşıma">Taşıma</option>
                    <option value="Eşya">Eşya</option>
                    <option value="Konaklama">Konaklama</option>
                </select>
                <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                    placeholder="Miktar*"
                    required
                    className="form-control mb-4"
                />
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
                <input
                    type="text"
                    name="itemDescription"
                    value={itemDescription}
                    onChange={handleChange}
                    placeholder="Aciliyet için kısa açıklama*"
                    required
                    className="form-control mb-4"
                />
                <input
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    placeholder="Telefon*"
                    required
                    className="form-control mb-4"
                />
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    placeholder="Adres*"
                    required
                    className="form-control mb-4"
                />
                <button
                    type="submit"
                    className="btn bg-dblue btn-block mt-3 c-white"
                >
                    Gönder
                </button>
            </form>
            {successMessage && <div className="alert alert-success mt-4">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger mt-4">{errorMessage}</div>}
        </div>
    );
}

export default NeedForm;
