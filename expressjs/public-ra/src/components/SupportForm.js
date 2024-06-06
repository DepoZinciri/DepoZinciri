import React, { useState } from 'react';
import amb from '../public/images/amb.png';
import axios from 'axios';

function SupportForm() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        address: '',
        itemDescription: '',
        requestType: 2, // SUPPORT_Request
        itemType: '',
        amount: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const { name, surname, itemDescription, phone, address, itemType, amount } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function submitSupport(event) {
        event.preventDefault();
        try {
            const response = await axios.post('/api/createSupportRequest', formData);
            // Handle success
            console.log(response.data);
            setStatusMessage('Destek verme talebiniz başarıyla oluşturuldu. En kısa sürede yetkililer sizinle iletişime geçecektir. ');
            setIsError(false);
        } catch (error) {
            // Handle error
            console.error('Error creating request:', error);
            setStatusMessage('Destek talebi oluşturulurken bir hata oluştu, lütfen tekrar deneyiniz.');
            setIsError(true);
        }
        setFormData({
            name: '',
            surname: '',
            phone: '',
            address: '',
            itemDescription: '',
            requestType: 2, // SUPPORT_Request
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
        <div className="col-lg-6 mt-3 mx-auto">
            <form onSubmit={submitSupport} method="POST" className="text-center border border-light p-5 rounded bg-blue">
                <img src={amb} className="mb-4" alt="Support" />
                <p className="h1 mb-4">Destek Ol</p>
                {statusMessage && (
                    <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                        {statusMessage}
                    </div>
                )}
                <input onChange={handleChange} type="text" name="name" value={name} placeholder="İsim*" required className="form-control mb-4" />
                <input onChange={handleChange} type="text" name="surname" value={surname} placeholder="Soyisim*" required className="form-control mb-4" />
                <input onChange={handleChange} type="text" name="address" value={address} placeholder="Adres*" required className="form-control mb-4" />
                <select name="itemType" onChange={handleChange} value={itemType} className="browser-default custom-select mb-4" required>
                    <option className="d-none" value="">Destek Tipi*</option>
                    <option value="Maddi Destek">Maddi Destek</option>
                    <option value="Taşıma">Taşıma</option>
                    <option value="Eşya">Eşya</option>
                    <option value="Konaklama">Konaklama</option>
                </select>
                <input onChange={handleChange} type="number" name="amount" value={amount} placeholder="Miktar*" required className="form-control mb-4" />
                <input onChange={handleChange} type="text" name="phone" value={phone} placeholder="Telefon*" required className="form-control mb-4" />
                <input onChange={handleChange} type="text" name="itemDescription" value={itemDescription} placeholder="Gönderim Şekli*" required className="form-control mb-4" />
                <input type="text" className="form-control mb-4 vis-hid" />
                <button type="submit" className="btn bg-dblue btn-block mt-3 c-white">Destek Ol</button>
            </form>
        </div>
    );
}

export default SupportForm;
