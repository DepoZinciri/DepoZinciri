import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function IncomingSupports(props) {
  const [incomingSupports, setIncomingSupports] = useState([]);

  useEffect(() => {
    showIncomingSupports();
  }, []);

  function showIncomingSupports() {
    fetch("/api/getIncomingSupports/" + props.warehouseId)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.requests);
        setIncomingSupports(data.requests || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const editConfirmedSupport = (id) => {
    let myPath = "/EditIncomingSupport/" + id;
    return myPath;
  };

  return (
    <div className="container text-center">
      <div className="bg-dblue rounded">
        <h1 className="mt-5 c-white p-3">Gelen Yardımlar</h1>
      </div>
      <div className="bg-blue p-2 mt-2 rounded border">
        <div className="bg-white rounded">
          {incomingSupports.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered mt-3 rounded">
                <thead className="thead-dark rounded">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Gönderen</th>
                    <th scope="col">Yardım Tipi</th>
                    <th scope="col">Detay</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">Adres</th>
                    <th scope="col">Durum</th>
                    <th scope="col">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {incomingSupports.map((need, index) => (
                    <tr key={need.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{need.name + " " + need.surname}</td>
                      <td>{need.itemType}</td>
                      <td>{need.itemDescription}</td>
                      <td>{need.phone}</td>
                      <td>{need.address}</td>
                      <td>{need.status}</td>
                      <td>
                        <div className="d-inline-flex flex-row align-items-center">
                          <Link
                            to={editConfirmedSupport(need.id)}
                            className="btn bg-dblue text-white m-1"
                          >
                            Düzenle
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-5">
              <h3>Henüz gelen yardım yok.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IncomingSupports;
