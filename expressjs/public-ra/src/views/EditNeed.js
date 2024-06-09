import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class EditNeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      need: "",
      item: "",
      user: props.user,
      warehouses: [],
    };
  }

  componentDidMount() {
    this.getNeed();
    this.getWarehouses();
  }

  async getNeed() {
    try {
      const response = await axios.get(`/api/getRequestById/${this.state.id}`);
      this.setState({ need: response.data.request[0] });
      const itemResponse = await axios.get(`/api/getItemById/${response.data.request[0].itemId}`);
      this.setState({ item: itemResponse.data.items[0] });
    } catch (err) {
      console.error(err);
    }
  }

  async getWarehouses() {
    try {
      const response = await axios.get("/api/getWarehouses");
      this.setState({ warehouses: response.data.warehouses || [] });
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  }

  async handleSubmit(id, status, warehouseId) {
    try {
      await axios.post(`/api/confirmRequest`, { id, status, warehouseId });
      console.log("Request confirmed");
      const { need } = this.state;
      const message = status === "Confirm"
        ? `${need.name} ${need.surname}'ne ait ${need.itemDescription} isteğini kabul ettiniz`
        : `${need.name} ${need.surname}'ne ait ${need.itemDescription} isteğini reddettiniz`;
      this.props.history.push({
        pathname: "/not_confirmed_needs",
        state: { successMessage: message },
      });
    } catch (error) {
      console.error("Error confirming request:", error);
      this.setState({
        statusMessage: "İşlem sırasında bir hata oluştu, lütfen tekrar deneyiniz.",
        isError: true,
      });
    }
  }

  async delNeed(id) {
    try {
      await axios.delete(`/api/deleteRequest/${id}`);
      console.log("Request deleted");
      const { need } = this.state;
      const message = `${need.name} ${need.surname}'ne ait ${need.itemDescription} isteğini reddettiniz`;
      this.props.history.push({
        pathname: "/not_confirmed_needs",
        state: { successMessage: message },
      });
    } catch (error) {
      console.error("Error deleting request:", error);
      this.setState({
        statusMessage: "Silme işlemi sırasında bir hata oluştu, lütfen tekrar deneyiniz.",
        isError: true,
      });
    }
  }

  // handle içinde bir transaction atılacak 
  // bu attığın transaction'ı thx'i database'e yazdır
  
  render() {
    let need = this.state.need;
    let user = this.state.user;
    let item = this.state.item;
    let warehouses = this.state.warehouses;
    const handle = async (e) => {
      e.preventDefault();
      const status = e.target.elements.status.value;
      const warehouseId = e.target.elements.warehouseId.value || 1;
      await this.handleSubmit(need.id, status, warehouseId);
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-3 mx-auto">
            <form
              onSubmit={handle}
              method="POST"
              className="text-center border border-light p-5 rounded bg-blue"
            >
              <p className="h1 mb-4">İhtiyaç Onayla</p>
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <p className="m-0 p-0">ID</p>
                  <input
                    type="text"
                    name="id"
                    required
                    value={need.id}
                    readOnly
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Tam İsmi</p>
                  <input
                    type="text"
                    name="datahash"
                    required
                    value={need.name + " " + need.surname}
                    readOnly
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Telefonu</p>
                  <input
                    type="text"
                    name="needType"
                    required
                    value={need.phone}
                    readOnly
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">İhtiyaç Tipi</p>
                  <input
                    type="text"
                    name="needType"
                    required
                    value={item.itemType}
                    readOnly
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Açıklaması</p>
                  <input
                    type="text"
                    name="needType"
                    required
                    value={item.itemDescription}
                    readOnly
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Miktar</p>
                  <input
                    type="number"
                    name="amount"
                    required
                    value={need.amount}
                    readOnly
                    className="form-control mb-4"
                  />
                </div>
                <div className="col-lg-6 mt-3">
                  <p className="m-0 p-0">Onaylayan İsim Soyisim</p>
                  <input
                    type="text"
                    name="NameSurname"
                    required
                    value={user.firstname + " " + user.lastname}
                    readOnly
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="confirmName"
                    required
                    value={user.firstname}
                    readOnly
                    className="form-control mb-4 d-none"
                  />
                  <input
                    type="text"
                    name="confirmSurname"
                    required
                    value={user.lastname}
                    readOnly
                    className="form-control mb-4 d-none"
                  />
                  <p className="m-0 p-0">Onaylayan STK</p>
                  <input
                    type="text"
                    name="confirmSTK"
                    required
                    value={user.stk}
                    readOnly
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Aciliyet Durumu*</p>
                  <select
                    name="urgency"
                    required
                    className="browser-default custom-select mb-4"
                  >
                    <option selected className="d-none"></option>
                    <option value="Yüksek">Yüksek</option>
                    <option value="Normal">Normal</option>
                    <option value="Düşük">Düşük</option>
                  </select>
                  <p className="m-0 p-0">Durum*</p>
                  <select
                    name="status"
                    required
                    className="browser-default custom-select mb-4"
                  >
                    <option selected className="d-none"></option>
                    <option value="Confirm">Onaylandı</option>
                    <option value="Cancel">İptal</option>
                  </select>
                  <p className="m-0 p-0">Bu yardımın bağlı olduğu Depo/Bölge</p>
                  <select
                    name="warehouseId"
                    className="browser-default custom-select mb-4"
                  >
                    <option value="">Seçiniz</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-success mt-3 w-50 mx-1"
                >
                  Onayla
                </button>
                <button
                  type="button"
                  onClick={() => this.delNeed(need.id)}
                  className="btn btn-danger mt-3 w-50 mx-1"
                >
                  Sil
                </button>
              </div>
            </form>
            {this.state.statusMessage && (
              <div className={`alert mt-4 ${this.state.isError ? "alert-danger" : "alert-success"}`}>
                {this.state.statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditNeed);
