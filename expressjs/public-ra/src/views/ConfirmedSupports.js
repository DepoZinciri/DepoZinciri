import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

function ConfirmedSupports() {
  const [confirmedSupports, setConfirmedSupports] = useState([]);
  const [userResponse, setUserResponse] = useState([]);

  const editConfirmedSupport = (id) => {
    let myPath = "/confirmed_support/edit/" + id + "";
    return myPath;
  };

  useEffect(() => {
    showConfirmedSupports();
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setUserResponse(data.message))
      .catch((err) => console.log(err));
  }, []);

  function showConfirmedSupports() {
    fetch("/api/getConfirmedSupportRequests")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.requests);
        setConfirmedSupports(data.requests);
      })
      .catch((err) => console.log(err));
  }

  if (confirmedSupports) {
    return (
      <div className="container text-center">
        <div className="bg-dblue rounded">
          <h1 className="mt-5 c-white p-3">Onaylanan Destekler</h1>
        </div>
        <div className="bg-blue p-2 mt-2 rounded border">
          <div className="bg-white rounded">
            <div className="table-responsive">
              <table className="table table-bordered mt-3 rounded">
                <thead className="thead-dark rounded">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">İsim</th>
                    <th scope="col">Soyisim</th>
                    <th scope="col">Yardım Tipi</th>
                    <th scope="col">Detay</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">Adres</th>
                    {userResponse === "LOGGED_IN" && (
                      <th scope="col">İşlemler</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {confirmedSupports.map((need) => (
                    <tr key={need.id}>
                      <th scope="row">{need.id}</th>
                      <td>
                        {userResponse === "LOGGED_IN"
                          ? need.name
                          : `${need.name.charAt(0)}${"*".repeat(
                              need.name.length - 1
                            )}`}
                      </td>
                      <td>
                        {userResponse === "LOGGED_IN"
                          ? need.surname
                          : `${need.surname.charAt(0)}${"*".repeat(
                              need.surname.length - 1
                            )}`}
                      </td>
                      <td>{need.requestType === 2 ? "Gıda" : "Diğer"}</td>
                      <td>{need.confirmed}</td>
                      <td>
                        {userResponse === "LOGGED_IN"
                          ? need.phone
                          : need.phone.slice(0, 4) + "*******"}
                      </td>
                      <td>
                        {userResponse === "LOGGED_IN"
                          ? need.address
                          : need.address.split(" ")[0] + " ****************"}
                      </td>
                      {userResponse === "LOGGED_IN" && (
                        <td>
                          <Link
                            to={editConfirmedSupport(need.id)}
                            className="btn btn-primary m-1"
                          >
                            Düzenle
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default ConfirmedSupports;
