import React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

function IncomingSupports(props) {
  const [IncomingSupports, setIncomingSupports] = useState([]);
  const showPersonalData = (id) => {
    let myPath = "/data/" + id + "";
    return myPath;
  };

  const editConfirmedSupport = (id) => {
    let myPath = "/EditIncomingSupport/" + id + "";
    return myPath;
  };

  useEffect(() => {
    showIncomingSupports();
  }, []);

  function showIncomingSupports() {
    fetch("/api/getIncomingSupports/" + props.warehouseId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.requests);
        setIncomingSupports(data.requests);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (IncomingSupports) {
    return (
      <div className="container text-center">
        <div className="bg-dblue rounded">
          <h1 className="mt-5 c-white p-3">Gelen  Yardımlar</h1>
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
                  {IncomingSupports.map((need) => (
                    <tr key={need.id}>
                      <th scope="row">{need.id}</th>
                      <td>{need.name}</td>
                      <td>{need.surname}</td>
                      <td>{need.requestType === 2 ? "Gıda" : "Diğer"}</td>
                      <td>{need.confirmed}</td>
                      <td>{need.phone}</td>
                      <td>{need.address}</td>
                      <td>
                        <div className="d-inline-flex flex-row align-items-center">
                          <Link to={editConfirmedSupport(need.id)} className="btn btn-primary m-1">
                            Düzenle
                            </Link>
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

export default IncomingSupports;
