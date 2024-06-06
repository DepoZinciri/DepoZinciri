import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class EditSupport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      support: "",
      item: "",
      user: props.user,
      warehouses: [],
      formData: {
        status: "",
        warehouseId: "",
      },
      statusMessage: '',
      isError: false
    };
  }

  componentDidMount() {
    axios
      .get(`/api/getRequestById/${this.state.id}`, {})
      .then(async (response) => {
        this.setState({ support: response.data.request[0] });
        this.setState({ formData: response.data.request[0] });
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
    axios
      .get("/api/getWarehouses")
      .then((response) => {
        this.setState({ warehouses: response.data.warehouses });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (id) => {
    return async (event) => {
      event.preventDefault();
      try {
        await axios.post(`/api/updateSupportRequest`, this.state.formData);
        await axios.post(`/api/confirmRequest`, { id: id });
        const successMessage = `${this.state.support.name} ${this.state.support.surname}'ne ait olan yardım isteğini güncellediniz.`;
        this.props.history.push({
          pathname: '/confirmed_supports',
          state: { successMessage }
        });
      } catch (error) {
        console.error("Error confirming request:", error);
        this.setState({
          statusMessage: 'Yardım isteği güncellenirken bir hata oluştu, lütfen tekrar deneyiniz.',
          isError: true
        });
      }
    };
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteRequest/${id}`);
      const message = `${this.state.support.name} ${this.state.support.surname}'ne ait olan yardım isteğini sildiniz.`;
      this.props.history.push({
        pathname: '/confirmed_supports',
        state: { successMessage: message }
      });
    } catch (error) {
      console.error('Error deleting request:', error);
      this.setState({
        statusMessage: 'Silme işlemi sırasında bir hata oluştu, lütfen tekrar deneyiniz.',
        isError: true
      });
    }
  };

  render() {
    let support = this.state.support;
    let user = this.state.user;
    let item = this.state.item;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-3 mx-auto">
            <form
              onSubmit={this.handleSubmit(support.id)}
              method="POST"
              className="text-center border border-light p-5 rounded bg-blue"
            >
              <p className="h1 mb-4">Yardım Formu</p>
              {this.state.statusMessage && (
                <div className={`alert ${this.state.isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                  {this.state.statusMessage}
                </div>
              )}
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <p className="m-0 p-0">ID</p>
                  <input
                    type="text"
                    name="id"
                    placeholder="Name*"
                    required="true"
                    value={support.id}
                    readOnly="true"
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Tam İsmi</p>
                  <input
                    type="text"
                    name="datahash"
                    placeholder="Surname*"
                    required="true"
                    value={support.name + " " + support.surname}
                    readOnly="true"
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Telefonu</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={support.phone}
                    readOnly="true"
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">İhtiyaç Tipi</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={item.itemType}
                    readOnly="true"
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Gönderim Şekli</p>
                  <input
                    type="text"
                    name="needType"
                    placeholder="Need Type*"
                    required="true"
                    value={item.itemDescription}
                    readOnly="true"
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Miktar</p>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount*"
                    required="true"
                    value={support.amount}
                    readOnly="true"
                    className="form-control mb-4"
                  />
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
                  />
                  <input
                    type="text"
                    name="confirmName"
                    placeholder=""
                    required="true"
                    value={user.firstname}
                    readOnly="true"
                    className="form-control mb-4 d-none"
                  />
                  <input
                    type="text"
                    name="confirmSurname"
                    placeholder=""
                    required="true"
                    value={user.lastname}
                    readOnly="true"
                    className="form-control mb-4 d-none"
                  />
                  <p className="m-0 p-0">Onaylayan STK</p>
                  <input
                    type="text"
                    name="confirmSTK"
                    placeholder=""
                    required="true"
                    value={user.stk}
                    readOnly="true"
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Durum*</p>
                  <select
                    name="status"
                    required="true"
                    onChange={this.onChange}
                    className="browser-default custom-select mb-4"
                  >
                    <option selected className="d-none"></option>
                    <option value="Confirmed">Onaylandı</option>
                    <option value="Pending">Depoya Gönderildi</option>
                    <option value="On Warehouse">Depoda</option>
                  </select>
                  <p className="m-0 p-0">Gidicek Depo*</p>
                  <select
                    name="warehouseId"
                    required="true"
                    onChange={this.onChange}
                    className="browser-default custom-select mb-4"
                  >
                    <option selected className="d-none"></option>
                    {this.state.warehouses.map((warehouse) => {
                      return (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      );
                    })}
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
                  onClick={() => this.handleDelete(support.id)}
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

export default withRouter(EditSupport);
