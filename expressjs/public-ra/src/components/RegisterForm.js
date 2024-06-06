import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function RegisterForm() {
  const [warehouses, setWarehouses] = useState([]);
  const [isWarehouser, setIsWarehouser] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isWarehouser) {
      axios
        .get("/api/getWarehouses")
        .then((response) => {
          setWarehouses(response.data.warehouses);
          console.log("Warehouses fetched:", response.data.warehouses); // Log fetched warehouses
        })
        .catch((err) => {
          console.error("Error fetching warehouses:", err); // Log any errors
        });
    }
  }, [isWarehouser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try {
      const response = await axios.post("/api/signup", data);
      if (response.status === 201) {
        setMessage("Başarıyla kayıt oldunuz.");
        setIsError(false);
        setTimeout(() => {
          history.push("/");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setMessage(error.response.data.error);
      setIsError(true);
    }
  };

  return (
    <div className="col-lg-6 mx-auto">
      <form onSubmit={handleSubmit} className="text-center border border-light p-5 rounded bg-grey">
        <p className="h2.mb-4">Kayıt Ol</p>
        {message && (
          <div className={`alert ${isError ? "alert-danger" : "alert-success"}`} role="alert">
            {message}
          </div>
        )}
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
          <label htmlFor="warehouse">Depo kullanıcısı mı?</label>
          <select
            onChange={(event) => {
              setIsWarehouser(event.target.value === "yes");
            }}
            name="warehouse"
            className="p-2"
            id="warehouse"
          >
            <option value="yes">Evet </option>
            <option value="no" selected>
              Hayır
            </option>
          </select>
        </span>
        {isWarehouser && warehouses.length > 0 && (
          <span className="d-flex flex-column mb-3">
            <label htmlFor="warehouse">Depo seçiniz</label>
            <select name="warehouseId" className="p-2" id="warehouseId">
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </span>
        )}
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
