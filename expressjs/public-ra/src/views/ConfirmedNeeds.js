import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

function ConfirmedNeeds() {
  const location = useLocation();
  const [confirmedNeeds, setConfirmedNeeds] = useState([]);
  const [userResponse, setUserResponse] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const editConfirmedNeed = (id) => {
    let myPath = "/confirmed_need/edit/" + id + "";
    return myPath;
  };

  useEffect(() => {
    showConfirmedNeeds();
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setUserResponse(data.message);
      })
      .catch((err) => {
        console.log(err);
      });

    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      // Clear the success message from history state after displaying it
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const showConfirmedNeeds = async () => {
    try {
      const response = await axios.get("/api/getConfirmedRequests");
      setConfirmedNeeds(response.data.requests);
    } catch (error) {
      console.error('Error fetching confirmed needs:', error);
    }
  };

  return (
    <div className="container text-center">
      <div className="bg-dblue rounded">
        <h1 className="mt-5 c-white p-3">Onaylanan İhtiyaçlar</h1>
      </div>
      {successMessage && (
        <div className="alert alert-success mt-4">
          {successMessage}
        </div>
      )}
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
                  {userResponse === "LOGGED_IN" && <th scope="col">İşlemler</th>}
                </tr>
              </thead>
              <tbody>
                {confirmedNeeds.map((need) => (
                  <tr key={need.id}>
                    <th scope="row">{need.id}</th>
                    <td>
                      {userResponse === "LOGGED_IN"
                        ? `${need.name} ${need.surname}`
                        : `${need.name.charAt(0)}${"*".repeat(
                            need.name.length - 1
                          )} ${need.surname.charAt(0)}${"*".repeat(
                            need.surname.length - 1
                          )}`}{" "}
                    </td>
                    <td>{need.requestType === 2 ? "Gıda" : "Diğer"}</td>
                    <td>{need.itemDescription}</td>
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
}

export default ConfirmedNeeds;
