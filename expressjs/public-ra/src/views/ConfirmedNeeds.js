import React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

function ConfirmedNeeds() {
  const [confirmedNeeds, setConfirmedNeeds] = useState([]);
  const [userResponse, setUserResponse] = useState([]);


  const editConfirmedNeed = (id) => {
    let myPath = "/confirmed_need/edit/" + id + "";
    return myPath;
  };

  useEffect(() => {
    showConfirmedNeeds();
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
  }, []);

  function showConfirmedNeeds() {
    fetch("/api/getConfirmedRequests")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.requests);
        setConfirmedNeeds(data.requests);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (confirmedNeeds) {
    return (
      <div className="container text-center">
        <div className="bg-dblue rounded">
          <h1 className="mt-5 c-white p-3">Onaylanan İhtiyaçlar</h1>
        </div>
        <div className="bg-blue p-2 mt-2 rounded border">
          <div className="bg-white rounded">
            <div className="table-responsive">
              <table className="table table-bordered mt-3 rounded">
                <thead className="thead-dark rounded">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tam İsim</th>
                    <th scope="col">İhtiyaç Tipi</th>
                    <th scope="col">Detay</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">Adres</th>
                    <th scope="col">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmedNeeds.map((need) => (
                    <tr key={need.id}>
                      <th scope="row">{need.id}</th>
                      <td>
                        {userResponse == "LOGGED_IN"
                          ? `${need.name} ${need.surname}`
                          : `${need.name.charAt(0)}${"*".repeat(
                              need.name.length - 1
                            )} ${need.surname.charAt(0)}${"*".repeat(
                              need.surname.length - 1
                            )}`}{" "}
                      </td>
                      <td>{need.requestType == 2 ? "Gıda" : "Diğer"}</td>
                      <td>{need.itemDescription}</td>
                      <td>
                        {userResponse == "LOGGED_IN"
                          ? need.phone
                          : need.phone.slice(0, 4) + "*******"}
                      </td>
                      <td>
                        {userResponse == "LOGGED_IN"
                          ? need.address
                          : need.address.split(' ')[0] + " ****************"}
                      </td>
                      {userResponse =="LOGGED_IN" ? (
                        <td>
                          <Link
                            to={editConfirmedNeed(need.id)}
                            className="btn btn-primary"
                          >
                            Düzenle
                          </Link>
                        </td>
                      ) : (
                        <td>
                          <Link
                            to={editConfirmedNeed(need.id)}
                            className="btn btn-primary"
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

export default ConfirmedNeeds;
