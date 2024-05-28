import React from "react";
import axios from "axios";

class EditSupport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      support: "",
      item: "",
      user: props.user,
    };
  }

  delSupport(id) {
  }

  componentDidMount() {
    axios
    .get(`/api/getRequestById/${this.state.id}`, {})
    .then(async (response) => {
      this.setState({ support: response.data.request[0] });
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

  handleSubmit(id) {
    return (event) => {
      event.preventDefault();

      axios
      .post(`/api/confirmRequest`, {
        id: id,
      })
      .then(() => {
        console.log("Request confirmed");
      });
    
  }
}

  render() {
    let support = this.state.support;
    let user = this.state.user;
    let item = this.state.item;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-3 mx-auto">
            <form
              onSubmit={this.handleSubmit(support[0])}
              method="POST"
              className="text-center border border-light p-5 rounded bg-blue"
            >
              <p className="h1 mb-4">Yardım Formu</p>
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <p className="m-0 p-0">ID</p>
                  <input
                    type="text"
                    name="id"
                    placeholder="Name*"
                    required="true"
                    value={support.id}
                    readonly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Tam İsmi</p>
                  <input
                    type="text"
                    name="datahash"
                    placeholder="Surname*"
                    required="true"
                    value={support.name + " " + support.surname}
                    readonly="true"
                    className="form-control mb-4"
                  ></input>
                  <p className="m-0 p-0">Telefonu</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={support.phone}
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
                  <p className="m-0 p-0">Gönderim Şekli</p>
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
                    value={support.amount}
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
                  <p className="m-0 p-0">Durum*</p>
                  <select
                    name="status"
                    required="true"
                    className="browser-default custom-select mb-4"
                  >
                    <option selected className="d-none"></option>
                    <option value="Onaylandı">Onaylandı</option>
                    <option value="Beklemede">Beklemede</option>
                    <option value="Kullanıldı">Kullanıldı</option>
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
                this.delSupport(support[0]);
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

export default EditSupport;
