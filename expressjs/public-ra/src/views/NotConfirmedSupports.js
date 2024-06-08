import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function NotConfirmedSupports() {
  const [notConfirmedSupports, setNotConfirmedSupports] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const location = useLocation();
  const successMessage = location.state?.successMessage || '';
  const [statusMessage, setStatusMessage] = useState(successMessage);

  const editNotConfirmedSupport = (id) => {
    let myPath = "/support/edit/" + id + "";
    return myPath;
  };

  useEffect(() => {
    showNotConfirmedSupports();
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setUserResponse(data.message))
      .catch((err) => console.log(err));
  }, []);

  const showNotConfirmedSupports = async () => {
    try {
      const response = await fetch("/api/getNotConfirmedSupportRequests");
      const data = await response.json();
      setNotConfirmedSupports(data.requests.map((support, index) => ({ ...support, displayId: index + 1 })));
    } catch (error) {
      console.error('Error fetching not confirmed supports:', error);
    }
  };

  return (
    <div className="container text-center">
      <div className="bg-dblue rounded">
        <h1 className="mt-5 c-white p-3">Onaylanmamış Yardımlar</h1>
      </div>
      <div className="bg-blue p-2 mt-2 rounded border">
        <div className="bg-white rounded">
          {statusMessage && (
            <div className={`alert ${statusMessage.includes('hata') ? 'alert-danger' : 'alert-success'}`} role="alert">
              {statusMessage}
            </div>
          )}
          <div className="table-responsive">
            <table className="table table-bordered mt-3 rounded">
              <thead className="thead-dark rounded">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">İsim</th>
                  {/* <th scope="col">Aciliyet Durumu</th> */}
                  <th scope="col">Soyisim</th>
                  <th scope="col">Yardım Tipi</th>
                  <th scope="col">Detay</th>
                  <th scope="col">Telefon</th>
                  <th scope="col">Adres</th>
                  <th scope="col">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {notConfirmedSupports.map((support) => (
                  <tr key={support.id}>
                    <th scope="row">{support.displayId}</th>
                    <td>{support.name}</td>
                    {/* <td>{support.emergencyStatus}</td> */}
                    <td>{support.surname}</td>
                    <td>{support.itemType}</td>
                    <td>{support.itemDescription}</td>
                    <td>{support.phone}</td>
                    <td>{support.address}</td>
                    <td>
                      <Link to={editNotConfirmedSupport(support.id)} className="btn btn-primary m-1">
                        ONAYLA
                      </Link>
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
}

export default NotConfirmedSupports;
