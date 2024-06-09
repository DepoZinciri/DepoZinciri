import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import updateSupportStatus from '../web3/updateSupportStatus';

class EditConfirmedSupport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      support: "",
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
      .get(`/api/getConfirmedRequestById/${this.state.id}`)
      .then((response) => {
        this.setState({ support: response.data.request[0] });
        this.setState({ formData: response.data.request[0] });
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
        await updateSupportStatus(id.toString(), this.state.formData.status);
        await axios.post(`/api/updateSupportRequest`, this.state.formData);
        const successMessage = `${this.state.support.name} ${this.state.support.surname}'ne ait olan destek isteğini güncellediniz.`;
        this.props.history.push({
          pathname: '/confirmed_supports',
          state: { successMessage }
        });
      } catch (error) {
        console.error("Error confirming request:", error);
        this.setState({
          statusMessage: 'Destek isteği güncellenirken bir hata oluştu, lütfen tekrar deneyiniz.',
          isError: true
        });
      }
    };
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteRequest/${id}`);
      const message = `${this.state.support.name} ${this.state.support.surname}'ne ait olan destek isteğini sildiniz.`;
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

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-3 mx-auto">
            <form
              onSubmit={this.handleSubmit(support.id)}
              method="POST"
              className="text-center border border-light p-5 rounded bg-blue"
            >
              <p className="h1 mb-4">Onaylanmış Destek Formu</p>
              {this.state.statusMessage && (
                <div className={`alert ${this.state.isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                  {this.state.statusMessage}
                </div>
              )}
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <p className="m-0 p-0">İsim</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="İsim*"
                    required="true"
                    value={support.name}
                    readOnly="true"
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="id"
                    placeholder=""
                    required="true"
                    value={support.id}
                    readOnly="true"
                    className="d-none form-control mb-4"
                  />
                  <p className="m-0 p-0">Soyisim</p>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname*"
                    required="true"
                    value={support.surname}
                    readOnly="true"
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Destek Tipi</p>
                  <input
                    type="text"
                    name="supportType"
                    placeholder="Support Type*"
                    required="true"
                    value={support.supportType}
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
                  <p className="m-0 p-0">Detay</p>
                  <input
                    type="text"
                    name="sendType"
                    placeholder="Send Type*"
                    required="true"
                    value={support.sendType}
                    readOnly="true"
                    className=" form-control mb-4"
                  />
                </div>
                <div className="col-lg-6 mt-3">
                  <p className="m-0 p-0">Telefon</p>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone*"
                    required="true"
                    value={support.phone}
                    readOnly="true"
                    className="form-control mb-4"
                  />
                  <p className="m-0 p-0">Adres</p>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address*"
                    required="true"
                    value={support.address}
                    readOnly="true"
                    className="form-control mb-4"
                  />
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
                    <option value="OnTheWay">Yolda</option>
                    <option value="OnTheWarehouse">Depoda</option>
                    <option value="Delivered">Teslim Edildi</option>
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
                  Değiştir
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

export default withRouter(EditConfirmedSupport);
