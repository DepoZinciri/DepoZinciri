import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Warehouse(props) {
  const [warehouse, setWarehouse] = useState({});
  const [incomingSupports, setIncomingSupports] = useState([]);
  const [items, setItems] = useState([]);
  const [nearbyNeeds, setNearbyNeeds] = useState([]);

  useEffect(() => {
    if (props.warehouseId) {
      getWarehouse();
      getIncomingSupports();
      getItems();
      getNearbyNeeds();
    }
  }, [props.warehouseId]);

  async function getWarehouse() {
    try {
      const response = await axios.get(`/api/getWarehouse/${props.warehouseId}`);
      setWarehouse(response.data.warehouse[0] || {});
    } catch (error) {
      console.error("Error fetching warehouse:", error);
    }
  }

  async function getIncomingSupports() {
    try {
      const response = await axios.get(`/api/getIncomingSupports/${props.warehouseId}`);
      setIncomingSupports(response.data.requests || []);
    } catch (error) {
      console.error("Error fetching incoming supports:", error);
    }
  }

  async function getItems() {
    try {
      const response = await axios.post('/api/getWarehouseItems', { warehouseId: props.warehouseId });
      setItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  async function getNearbyNeeds() {
    try {
      const response = await axios.get(`/api/getNearbyNeeds/${props.warehouseId}`);
      setNearbyNeeds(response.data.requests || []);
    } catch (error) {
      console.error("Error fetching nearby needs:", error);
    }
  }

  if (!props.warehouseId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-3">
      <div className="d-flex">
        <main className="flex-fill container">
          <h1 className="h2 fw-bold text-center">{warehouse.name}</h1>
          <div className="d-flex flex-row mt-4 grid align-items-center justify-content-center">
            <div
              className="rounded-lg border shadow-sm col-2 d-flex align-items-center mr-3 bg-light"
              style={{ backgroundColor: "#76BA4A" }}
              data-v0-t="card"
            >
              <div className="px-2 py-4 d-flex align-items-center justify-content-between">
                <div className="mr-3">
                  <h3
                    className="text-nowrap fs-3 fw-semibold m-0"
                    style={{ lineHeight: 1, letterSpacing: "-0.05em" }}
                  >
                    {warehouse.victimNumber}
                  </h3>
                  <p className="text-muted small mb-0">Afetzede</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#76BA4A" }}
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <div
              className="rounded-lg border shadow-sm col-2 d-flex  mr-3 bg-light "
              data-v0-t="card"
            >
              <div className="px-2 py-4 d-flex align-items-center justify-content-between">
                <div className="mr-3">
                  <h3
                    className="text-nowrap fs-3 fw-semibold m-0"
                    style={{ lineHeight: 1, letterSpacing: "-0.05em" }}
                  >
                    {incomingSupports.length}
                  </h3>
                  <p className="text-muted small mb-0">Gelen yardım</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#76BA4A" }}
                >
                  <rect width="1em" height="2em" x="4" y="2" rx="2" ry="2"></rect>
                  <path d="M9 22v-4h6v4"></path>
                  <path d="M8 6h.01"></path>
                  <path d="M16 6h.01"></path>
                  <path d="M12 6h.01"></path>
                  <path d="M12 10h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 10h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 10h.01"></path>
                  <path d="M8 14h.01"></path>
                </svg>
              </div>
            </div>
            <div
              className="rounded-lg border shadow-sm col-2 d-flex align-items-center mr-3 bg-light"
              style={{ backgroundColor: "#76BA4A" }}
              data-v0-t="card"
            >
              <div className="px-2 py-4 d-flex align-items-center justify-content-between">
                <div className="mr-3">
                  <h3
                    className="text-nowrap fs-3 fw-semibold m-0"
                    style={{ lineHeight: 1, letterSpacing: "-0.05em" }}
                  >
                    0%
                  </h3>
                  <p className="small text-muted mb-0">Doluluk Oranı</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#76BA4A" }}
                >
                  <line x1="12" x2="12" y1="20" y2="10"></line>
                  <line x1="18" x2="18" y1="20" y2="4"></line>
                  <line x1="6" x2="6" y1="20" y2="16"></line>
                </svg>
              </div>
            </div>
          </div>

          <div className="row gx-5 mt-5 d-flex flex-row justify-content-center">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="text-nowrap fs-3 fw-semibold mb-2">
                    Envanter Listesi
                  </h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ürün Adı</th>
                        <th scope="col">Ürün Miktarı</th>
                        <th scope="col">Son Kullanma Tarihi</th>
                        <th scope="col">Kabul Eden</th>
                        <th scope="col">Kontrol Eden</th>
                        <th scope="col .text-center p-1">Düzenle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.itemType}</td>
                          <td>{item.quantity}</td>
                          <td>{item.expirationDate ? item.expirationDate : '-'}</td>
                          <td>??</td>
                          <td>??</td>
                          <td>
                            <button type="button" className="btn bg-dblue text-white">
                              Düzenle
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  className="btn m-2 p-2"
                  style={{ color: "#FFF", backgroundColor: "#76BA4A" }}
                >
                  Envanter Ekle
                </button>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            {/* Card 1: Last Created 5 Depots */}
            <div className="col-md-4">
              <div className="card shadow-sm border rounded-lg">
                <div className="card-body d-flex flex-column justify-content-between pt-3 px-3 text-center">
                  <h4 className="text-nowrap fw-semibold">
                    Depoya Gelen Yardımlar
                  </h4>
                </div>
                <div className=" overflow-auto">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Nereden</th>
                        <th>İletişim No</th>
                        <th>Detay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomingSupports.slice(-5).map((request) => (
                        <tr key={request.id}>
                          <td>{request.address}</td>
                          <td>{request.phone}</td>
                          <td>{request.itemDescription}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Card 2: Nearby Needs */}
            <div className="col-md-8">
              <div className="card shadow-sm border rounded-lg">
                <div className="card-body d-flex flex-column justify-content-between pt-3 px-3 text-center">
                  <h4 className="text-nowrap fw-semibold">
                    Yakınlardaki Yardım İstekleri
                  </h4>
                </div>
                <div className=" overflow-auto">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Tam İsim</th>
                        <th>İletişim No</th>
                        <th>İhtiyaç Türü</th>
                        <th>Detay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nearbyNeeds.map((need) => (
                        <tr key={need.id}>
                          <td>{need.name + " " + need.surname}</td>
                          <td>{need.phone}</td>
                          <td>{need.itemType}</td>
                          <td>{need.itemDescription}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Card 3: Total Depots 5 Companies */}
            {/* <div className="col-md-4">
              <div className="card shadow-sm border rounded-lg">
                <div className="card-body d-flex flex-column justify-content-between pt-3 px-3 text-center">
                  <h4 className="text-nowrap fs-4 fw-semibold">
                    Yola Çıkan Yardımlar
                  </h4>
                </div>
                <div className=" overflow-auto">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Nereye</th>
                        <th>İletişim No</th>
                        <th>Detay</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>??</td>
                        <td>??</td>
                        <td>??</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
