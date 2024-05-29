import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function RegisterForm() {
  const [warehouses, setWarehouses] = useState([]);
  const [isWarehouser, setIsWarehouser] = useState(false);
  useEffect(() => {
    if(isWarehouser){
      axios
      .get("/api/getWarehouses")
      .then((response) => {
        setWarehouses(response.data.warehouses);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isWarehouser]);
    
  return (
    <div className="col-lg-6 mx-auto">
      <form
        action="/api/signup"
        method="POST"
        className="text-center border border-light p-5 rounded bg-grey"
      >
        <p className="h2.mb-4">Kayıt Ol</p>
        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı*"
          required
          className="form-control mb-4"
        ></input>
        <input
          type="text"
          name="firstname"
          placeholder="İsim*"
          required
          className="form-control mb-4"
        ></input>
        <input
          type="text"
          name="lastname"
          placeholder="Soyisim*"
          required
          className="form-control mb-4"
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Parola*"
          required
          className="form-control mb-4"
        ></input>
        <input
          type="text"
          name="phone"
          placeholder="Telefon*"
          required
          className="form-control mb-4"
        ></input>
        <span className="d-flex flex-column mb-3">
          <label for="warehouse">Depo kullanıcısı mı?</label>
          <select onChange={(event)=>{
            event.target.value === "yes" ? setIsWarehouser(true) : setIsWarehouser(false);
          }} name="warehouse" className="p-2" id="warehouse">
            <option value="yes">Evet </option>
            <option value="no" selected> Hayır</option>
          </select>
        </span>
        { isWarehouser ?
          <span className="d-flex flex-column mb-3">
            <label for="warehouse">Depo seçiniz</label>
            <select name="warehouseId" className="p-2" id="warehouseId">
              {warehouses.map((warehouse) => (
                <option value={warehouse.id}>{warehouse.name}</option>
              ))}
            </select>
          </span>
          : 
            <span></span>
        }
        <input
          type="email"
          name="email"
          placeholder="E-mail*"
          required
          className="form-control mb-4"
        ></input>
        <button type="submit" className="btn btn-info btn-block mt-3">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
