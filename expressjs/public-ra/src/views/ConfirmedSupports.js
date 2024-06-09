import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function ConfirmedSupports() {
  const [confirmedSupports, setConfirmedSupports] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const location = useLocation();
  const successMessage = location.state?.successMessage || '';
  const [statusMessage, setStatusMessage] = useState(successMessage);

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

  const showConfirmedSupports = async () => {
    try {
      const response = await fetch("/api/getConfirmedSupportRequests");
      const data = await response.json();
      const supportsWithWarehouse = await Promise.all(data.requests.map(async (support, index) => {
        const warehouseResponse = await fetch(`/api/getWarehouse/${support.warehouseId}`);
        const warehouseData = await warehouseResponse.json();
        return { ...support, displayId: index + 1, warehouseName: warehouseData.warehouse[0]?.name || 'Unknown' };
      }));
      setConfirmedSupports(supportsWithWarehouse);
    } catch (error) {
      console.error('Error fetching confirmed supports:', error);
    }
  };

  return (
    <div className="container text-center">
      <div className="bg-dblue rounded">
        <h1 className="mt-5 c-white p-3">Onaylanan Yardımlar</h1>
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
                  <th scope="col">Hedef Depo</th>
                  <th scope="col">Status</th>
                  {userResponse === "LOGGED_IN" && <th scope="col">İşlemler</th>}
                </tr>
              </thead>
              <tbody>
                {confirmedSupports.map((support) => (
                  <tr key={support.id}>
                    <th scope="row">{support.displayId}</th>
                    <td>
                      {userResponse === "LOGGED_IN"
                        ? support.name
                        : `${support.name.charAt(0)}${"*".repeat(support.name.length - 1)}`}
                    </td>
                    {/* <td>{support.emergencyStatus}</td> */}
                    <td>
                      {userResponse === "LOGGED_IN"
                        ? support.surname
                        : `${support.surname.charAt(0)}${"*".repeat(support.surname.length - 1)}`}
                    </td>
                    <td>{support.itemType}</td>
                    <td>{support.itemDescription}</td>
                    <td>
                      {userResponse === "LOGGED_IN"
                        ? support.phone
                        : support.phone.slice(0, 4) + "*******"}
                    </td>
                    <td>
                      {userResponse === "LOGGED_IN"
                        ? support.address
                        : support.address.split(" ")[0] + " ****************"}
                    </td>
                    <td>
                      {userResponse === "LOGGED_IN"
                        ? support.warehouseName
                        : support.warehouseName.split(" ")[0] + " ****************"}
                    </td>
                    <td>
                      {userResponse === "LOGGED_IN"
                        ? support.status
                        : support.status.split(" ")[0] + " ****************"}
                    </td>
                    {userResponse === "LOGGED_IN" && (
                      <td>
                        <Link to={editConfirmedSupport(support.id)} className="btn btn-primary m-1">
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

export default ConfirmedSupports;
