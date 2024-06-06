import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", { username, password });
      if (response.status === 200) {
        setMessage("Başarıyla giriş yaptınız.");
        setIsError(false);
        // Redirect to home or another page
        window.location.href = "/";
      } else {
        setMessage("Giriş başarısız. Lütfen kullanıcı adı ve parolanızı kontrol ediniz.");
        setIsError(true);
      }
    } catch (error) {
      setMessage("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyiniz.");
      setIsError(true);
    }
  };

  return (
    <div className="col-lg-6 mx-auto">
      <form onSubmit={handleSubmit} className="text-center border border-light p-5 rounded bg-grey">
        <p className="h2 mb-4">Giriş Yap</p>
        {message && (
          <div className={`alert ${isError ? "alert-danger" : "alert-success"}`} role="alert">
            {message}
          </div>
        )}
        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="form-control mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control mb-4"
        />
        <div className="d-flex justify-content-around">
          <div>
            <Link to="/" className="nav-link">Parolamı unuttum</Link>
          </div>
        </div>
        <button type="submit" className="btn btn-info btn-block mt-3">Giriş</button>
        <Link to="/signup" className="btn btn-orange btn-block my-4">Kayıt Ol</Link>
      </form>
    </div>
  );
}

export default LoginForm;
