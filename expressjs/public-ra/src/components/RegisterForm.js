import React from "react";

function RegisterForm() {
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
          <select name="warehouse" className="p-2" id="warehouse">
            <option value="yes">Evet </option>
            <option value="no" selected> Hayır</option>
          </select>
        </span>
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
