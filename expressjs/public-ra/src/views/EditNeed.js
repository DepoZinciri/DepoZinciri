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
    };
  }

  componentDidMount() {
    axios
      .get(`/api/getRequestById/${this.state.id}`, {})
      .then(async (response) => {
        this.setState({ need: response.data.request[0] });
        axios
          .get(`/api/getItemById/${response.data.request[0].itemId}`)
          .then((response) => {
            this.setState({ item: response.data.items[0] });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // (TODO) send transaction to blockchain
  async handleSubmit(id, status) {
    try {
      await axios.post(`/api/confirmRequest`, { id: id, status: status });
      console.log("Request confirmed");
      const { need } = this.state;
      const message =
        status === "Confirm"
          ? `${need.name} ${need.surname}'ne ait ${need.itemType} isteğini kabul ettiniz`
          : `${need.name} ${need.surname}'ne ait ${need.itemType} isteğini reddettiniz`;
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
      const message = `${need.name} ${need.surname}'ne ait ${need.itemType} isteğini reddettiniz`;
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

  render() {
    let need = this.state.need;
    let user = this.state.user;
    let item = this.state.item;
    const handle = async (e) => {
      e.preventDefault();
      const status = e.target.elements.status.value;
      await this.handleSubmit(need.id, status);
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-3 mx-auto ">
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
                    placeholder="Name*"
                    required="true"
                    value={need.id}
                    readOnly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Tam İsmi</p>
                  <input
                    type="text"
                    name="datahash"
                    placeholder="Surname*"
                    required="true"
                    value={need.name + " " + need.surname}
                    readOnly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Telefonu</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={need.phone}
                    readOnly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">İhtiyaç Tipi</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={item.itemType}
                    readOnly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Açıklaması</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={item.itemDescription}
                    readOnly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Miktar</p>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount*"
                    required="true"
                    value={need.amount}
                    readOnly="true"
                    className="form-control mb-4"
                  ></input>
                </div>
                <div className="col-lg-6 mt-3">
                  <p className="m-0 p-0">Onaylayan İsim Soyisim</p>
                  <input
                    type="text"
                    name="NameSurname"
                    placeholder=""
                    required="true"
                    value={user.firstname + " " + user.lastname}
                    readOnly="true"
                    className="form-control mb-4"
                  ></input>
                  <input
                    type="text"
                    name="confirmName"
                    placeholder=""
                    required="true"
                    value={user.firstname}
                    readOnly="true"
                    className="form-control mb-4 d-none"
                  ></input>
                  <input
                    type="text"
                    name="confirmSurname"
                    placeholder=""
                    required="true"
                    value={user.lastname}
                    readOnly="true"
                    className="form-control mb-4 d-none"
                  ></input>
                  <p className="m-0 p-0">Onaylayan STK</p>
                  <input
                    type="text"
                    name="confirmSTK"
                    placeholder=""
                    required="true"
                    value={user.stk}
                    readOnly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Aciliyet Durumu*</p>
                  <select
                    name="urgency"
                    required="true"
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
                    required="true"
                    className="browser-default custom-select mb-4"
                  >
                    <option selected className="d-none"></option>
                    <option value="Confirm">Onaylandı</option>
                    <option value="Cancel">İptal</option>
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
