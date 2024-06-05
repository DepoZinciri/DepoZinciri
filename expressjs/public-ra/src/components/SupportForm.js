import React from "react";
import amb from '../public/images/amb.png';
import axios from 'axios';
import { useState } from 'react';
// import CryptoJS from 'crypto-js';
// import { add } from "lodash";

function SupportForm() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        address: '',
        itemDescription: '',
        requestType: 2, // SUPPORT_Requst
        itemType: '',
        amount: ''
    });
    const { name, surname, itemDescription, phone, address, itemType ,amount } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function submitSupport(event) {
        event.preventDefault()
        try {
            const response = await axios.post('/api/createSupportRequest', formData);
            // Handle success
            console.log(response.data);
            
        } catch (error) {
            // Handle error
            console.error('Error creating request:', error);
            
        }
        setFormData({
            name: '',
            surname: '',
            phone: '',
            address: '',
            itemDescription: '',
            requestType: 2, // SUPPORT_Requst
            itemType: '',
            amount: ''
        });

        // let text = JSON.stringify(personalData)
        // let b64 = CryptoJS.AES.encrypt(text, SECRET).toString();
        // let e64 = await CryptoJS.enc.Base64.parse(b64);
        // let eHex = await e64.toString(CryptoJS.enc.Hex);
        // let hashValue = eHex
        
    }

    return (
        <div className="col-lg-4 mt-3 mx-auto">
            <form onSubmit={submitSupport} method="POST" className="text-center border border-light p-5 rounded bg-blue">
                <img src={amb} className="mb-4"></img>
                <p className="h1 mb-4">Destek Ol</p>
                <input onChange={handleChange} type="text" name="name" value={name} placeholder="İsim*" required className="form-control mb-4"></input>
                <input onChange={handleChange} type="text" name="surname" value={surname} placeholder="Soyisim*" required className="form-control mb-4"></input>
                <input onChange={handleChange} type="text" name="address" value={address} placeholder="Adres*" required className="form-control mb-4"></input>
                <select name="itemType" onChange={handleChange} value={itemType} className="browser-default custom-select mb-4" required>
                    <option className="d-none" defaultValue>Destek Tipi*</option>
                    <option value="Maddi Destek" >Maddi Destek</option>
                    <option value="Taşıma" >Taşıma</option>
                    <option value="Eşya" >Eşya</option>
                    <option value="Konaklama" >Konaklama</option>
                </select>
                <input onChange={handleChange} type="number" name="amount" value={amount} placeholder="Miktar*" required className="form-control mb-4"></input>
                <input onChange={handleChange} type="number" name="phone" value={phone} placeholder="Telefon*" required className="form-control mb-4"></input>
                <input onChange={handleChange} type="text" name="itemDescription" value={itemDescription} placeholder="Gönderim Şekli*" required className="form-control mb-4"></input>
                <input type="text" className="form-control mb-4 vis-hid"></input>
                <button  type="submit" className="btn bg-dblue btn-block mt-3 c-white">Destek Ol</button>
            </form>
        </div>
    )
}

export default SupportForm;