import React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

function NotConfirmedSupports() {
  const [NotConfirmedSupports, setNotConfirmedSupports] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const [reload, setReload] = useState(false);
  const editNotConfirmedNeed = (id) => {
    let myPath = "/confirmed_need/edit/" + id + "";
    return myPath;
  };
  const approveSupport = (id) => {
    axios
      .post(`/api/confirmRequest`, {
        id: id,
      })
      .then(() => {
        console.log("Request confirmed");
      });
    setReload(!reload);
  };

  useEffect(() => {
    showNotConfirmedSupports();
    fetch("/api/auth")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserResponse(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);
  function showNotConfirmedSupports() {
    fetch("/api/getNotConfirmedSupportRequests")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.requests);
        setNotConfirmedSupports(data.requests);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (NotConfirmedSupports) {
    return (
      <div className="container text-center">
        <div className="bg-dblue rounded">
          <h1 className="mt-5 c-white p-3">Onaylanmamış Yardımlar</h1>
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
                    <th scope="col">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {NotConfirmedSupports.map((need) => (
                    <tr key={need.id}>
                      <th scope="row">{need.id}</th>
                      <td>{need.name}</td>
                      <td>{need.surname}</td>
                      <td>{need.requestType == 2 ? "Gıda" : "Diğer"}</td>
                      <td>{need.confirmed}</td>
                      <td>{need.phone}</td>
                      <td>{need.address}</td>
                      <td>
                        <div className="d-inline-flex flex-row align-items-center">
                          <Link
                            to={editNotConfirmedNeed(need.id)}
                            className="btn bg-dblue text-white"
                          >
                            Düzenle
                          </Link>
                          <button
                            onClick={() => {
                              approveSupport(need.id);
                            }}
                            className="btn bg-dblue text-white"
                          >
                            Onayla
                          </button>
                        </div>
                      </td>
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

export default NotConfirmedSupports;
