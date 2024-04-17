import React from "react";
import hand from '../public/images/hand2.png';
import axios from 'axios';
import { useState } from 'react';
import CryptoJS from 'crypto-js';

function NeedForm() {

    const [count, setCount] = useState(0);
    const SECRET = 'MY SECRET KEYYY'

    async function submitNeed(event) {
        event.preventDefault()
        let personalData = { name: '', surname: '', urgency: '', expUr: '', phone: '', address: '' };

        let needType = event.target.elements.needType.value
        let amount = parseInt(event.target.elements.amount.value)
        personalData.name = event.target.elements.name.value
        personalData.surname = event.target.elements.surname.value
        personalData.urgency = event.target.elements.urgency.value
        personalData.expUr = event.target.elements.expUr.value
        personalData.phone = event.target.elements.phone.value
        personalData.address = event.target.elements.address.value

        let text = JSON.stringify(personalData)
        let b64 = CryptoJS.AES.encrypt(text, SECRET).toString();
        let e64 = await CryptoJS.enc.Base64.parse(b64);
        let eHex = await e64.toString(CryptoJS.enc.Hex);
        let hashValue = eHex

        const apiKey = '04cbdab3-90e1-4bed-8d6e-ccfce0fa894c'

        const createHash = async () => {
            axios.post('/api/create-datahash', {
                params: {
                    hashValue: hashValue,
                    operationId: count.toString()
                }
            });
        }

        axios.post('https://devservice-dot-dynamic-sun-260208.appspot.com/int/da124c9f1a874fe2/createNeed', {
            args: [count.toString(), hashValue, needType, amount],
            account: "0xDBc6d8071243aca046D75C02ccF8DB59B422f031"
        }, {
            headers: {
                ApiKey: apiKey,
            },
        }).then(async (response) => {
            const transaction = response.data;
            await createHash();
            console.log(transaction);
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <div className="col-lg-6 mt-3 mx-auto">
            <form onSubmit={submitNeed} method="POST" className="text-center border border-light p-5 rounded bg-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="6em" height="6em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-1.26-1.25-2.71-.68-3.42 0L13.59 4H11C9.1 4 8 5 7.44 6.15L3 10.59v4l-.71.7c-1.25 1.26-.68 2.71 0 3.42l3 3c.54.54 1.12.74 1.67.74c.71 0 1.36-.35 1.75-.74l2.7-2.71H15c1.7 0 2.56-1.06 2.87-2.1c1.13-.3 1.75-1.16 2-2C21.42 14.5 22 13.03 22 12V9h-.59zM20 12c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-4.41l-3.28 3.28c-.31.29-.49.12-.6.01l-2.99-2.98c-.29-.31-.12-.49-.01-.6L5 15.41v-4l2-2V11c0 1.21.8 3 3 3s3-1.79 3-3h7zm.29-4.71L18.59 9H11v2c0 .45-.19 1-1 1s-1-.55-1-1V8c0-.46.17-2 2-2h3.41l2.28-2.28c.31-.29.49-.12.6-.01l2.99 2.98c.29.31.12.49.01.6"/></svg>
                <p className="h1 mb-4">İhtiyaç Talebi</p>
                <input type="text" name="name" placeholder="İsim*" required className="form-control mb-4"></input>
                <input type="text" name="surname" placeholder="Soyisim*" required className="form-control mb-4"></input>
                <select name="needType" className="browser-default custom-select mb-4" required>
                    <option className="d-none" defaultValue>İhtiyaç Tipi*</option>
                    <option value="Maddi Destek" >Maddi Destek</option>
                    <option value="Taşıma" >Taşıma</option>
                    <option value="Eşya" >Eşya</option>
                    <option value="Konaklama" >Konaklama</option>
                </select>
                <input type="number" name="amount" placeholder="Miktar*" required className="form-control mb-4"></input>
                <select name="urgency" className="browser-default custom-select mb-4">
                    <option className="d-none" defaultValue>Aciliyet*</option>
                    <option value="Yüksek" >Yüksek</option>
                    <option value="Normal" >Normal</option>
                    <option value="Düşük" >Düşük</option>
                </select>
                <input type="text" name="expUr" placeholder="Aciliyet için kısa açıklama*" required className="form-control mb-4"></input>
                <input type="number" name="phone" placeholder="Telefon*" required className="form-control mb-4"></input>
                <input type="text" name="address" placeholder="Adres*" required className="form-control mb-4"></input>
                <button onClick={() => setCount(new Date().valueOf())} type="submit" className="btn bg-dblue btn-block mt-3 c-white" >Gönder</button>
            </form>
        </div>
    )
}

export default NeedForm;