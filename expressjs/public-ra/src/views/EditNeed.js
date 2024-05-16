import React from "react";
import axios from "axios";

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
  // TO DO send transaction to blockchain
  async handleSubmit(id) {
    axios
      .post(`/api/confirmRequest`, {
        id: id,
      })
      .then(() => {
        console.log("Request confirmed");
      });
  }

  render() {
    let need = this.state.need;
    let user = this.state.user;
    let item = this.state.item;
    const handle = async (e) => {
      e.preventDefault();
      await this.handleSubmit(need.id);
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
                    readonly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Tam İsmi</p>
                  <input
                    type="text"
                    name="datahash"
                    placeholder="Surname*"
                    required="true"
                    value={need.name + " " + need.surname}
                    readonly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Telefonu</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={need.phone}
                    readonly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">İhtiyaç Tipi</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={item.itemType}
                    readonly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Açıklaması</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={item.itemDescription}
                    readonly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Miktar</p>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount*"
                    required="true"
                    value={need.amount}
                    readonly="true"
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
                    readonly="true"
                    className="form-control mb-4"
                  ></input>
                  <input
                    type="text"
                    name="confirmName"
                    placeholder=""
                    required="true"
                    value={user.firstname}
                    readonly="true"
                    className="form-control mb-4 d-none"
                  ></input>
                  <input
                    type="text"
                    name="confirmSurname"
                    placeholder=""
                    required="true"
                    value={user.lastname}
                    readonly="true"
                    className="form-control mb-4 d-none"
                  ></input>
                  <p className="m-0 p-0">Onaylayan STK</p>
                  <input
                    type="text"
                    name="confirmSTK"
                    placeholder=""
                    required="true"
                    value={user.stk}
                    readonly="true"
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
                    <option value="Onaylandı">Onaylandı</option>
                    <option value="Ulaşım Aşaması">Ulaşım Aşaması</option>
                    <option value="Kullanımda">Kullanımda</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success btn-block mt-3 w-50 mx-auto"
              >
                Onayla
              </button>
            </form>
            <a
              onClick={() => {
                this.delNeed(need[0]);
              }}
              className="btn btn-danger btn-block mt-3 w-50 mx-auto"
            >
              Sil
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default EditNeed;
