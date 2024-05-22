import React from 'react';
import axios from 'axios';
import { add } from 'lodash';

class EditConfirmedNeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            need: '',
            item: '',
            user: props.user,
            formData: {
                id:props.match.params.id,
                name: '',
                surname: '',
                needType: '',
                amount: '',
                phone: '',
                address: '',
                emergencyStatus: '',
                status: ''
            }
        }
    }

    componentDidMount() {
        this.getTheNeed();
    }
    getTheNeed() {
        axios
        .get(`/api/getConfirmedRequestById/${this.state.id}`, {})
        .then(async (response) => {
          this.setState({ need: response.data.request[0] });
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
    }


    render() {
        let need = this.state.need;
        let user = this.state.user;
        let item = this.state.item;
        let { name, surname, needType, amount, phone, address, emergencyStatus, status } = this.state.formData;

        const getPath = () => {
            let myPath = '/confirmed_need/delete/' + need.id + '';
            return myPath
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(this.state.formData)
            axios.post('/api/editConfirmNeed', this.state.formData)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        const OnChange = (e) => {
            console.log(e.target.name, e.target.value)
            this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mt-3 mx-auto">
                        <form onSubmit={handleSubmit} method="POST" className="text-center border border-light p-5 rounded bg-blue">
                            <p className="h1 mb-4">Onaylanmış İhtiyaç Formu</p>
                            <div className="row">
                                <div className="col-lg-6 mt-3">
                                    <p className="m-0 p-0">İsim</p>
                                    <input onChange={OnChange} type="text" name="name" placeholder="Name*" required="true" value={name}  className="form-control mb-4"></input>
                                    <input onChange={OnChange} type="text" name="id" placeholder="" required="true" value={need.id} className="d-none form-control mb-4"></input>
                                    <p className="m-0 p-0">Soyisim</p>
                                    <input onChange={OnChange} type="text" name="surname" placeholder="Surname*" required="true" value={surname} className="form-control mb-4"></input>
                                    <p className="m-0 p-0">İhtiyaç Tipi</p>
                                    <input onChange={OnChange} type="text" name="requestType" placeholder="Need Type*" required="true" readonly="true" value={need.requestType === 2 ? "Gıda" : "Diğer"} className="form-control mb-4"></input>
                                    <p className="m-0 p-0">Miktar</p>
                                    <input onChange={OnChange} type="text" name="amount" placeholder="Amount*" required="true" value={amount} className="form-control mb-4"></input>
                                    <p className="m-0 p-0">Telefon</p>
                                    <input onChange={OnChange} type="text" name="phone" placeholder="Phone*" required="true" value={phone} className="form-control mb-4"></input>
                                </div>
                                <div className="col-lg-6 mt-3">
                                    <p className="m-0 p-0">Adres</p>
                                    <input onChange={OnChange} type="text" name="address" placeholder="Address*" required="true" value={address} readonly="true" className="form-control mb-4"></input>
                                    <p className="m-0 p-0">Onaylayan İsim Soyisim</p>
                                    <input type="text" name="NameSurname" placeholder="" required="true" value={user.firstname + " " + user.lastname} readonly="true" className="form-control mb-4"></input>
                                    <input type="text" name="confirmName" placeholder="" required="true" value={user.firstname} readonly="true" className="form-control mb-4 d-none"></input>
                                    <input type="text" name="confirmSurname" placeholder="" required="true" value={user.lastname} readonly="true" className="form-control mb-4 d-none"></input>
                                    <p className="m-0 p-0">Onaylayan STK</p>
                                    <input type="text" name="confirmSTK" placeholder="" required="true" value={user.stk} readonly="true" className="form-control mb-4"></input>
                                    <p className="m-0 p-0">Aciliyet Durumu*</p>
                                    <select name="emergencyStatus" onChange={OnChange} required="true" className="browser-default custom-select mb-4">
                                        {need.emergencyStatus === "urgent" ? <option value="urgent" selected>Yüksek</option> : <option value="urgent">Yüksek</option>}
                                        {need.emergencyStatus === "mid" ? <option value="mid" selected>Orta</option> : <option value="mid">Orta</option>}
                                        {need.emergencyStatus === "not urgent" ? <option value="not urgent" selected>Düşük</option> : <option value="not urgent">Düşük</option>}
                                    </select>
                                    <p className="m-0 p-0">Durum*</p>
                                    <select name="status" onChange={OnChange} required="true" className="browser-default custom-select mb-4">
                                        <option selected className="d-none"></option>
                                        {need.status === "Confirmed" ? <option value="Confirmed" selected>Onaylandı</option> : <option value="Confirmed">Onaylandı</option>}
                                        {need.status === "Pending" ? <option value="Pending" selected>Yolda</option> : <option value="Pending">Yolda</option>}
                                        {need.statys === "On Warehouse" ? <option value="On Warehouse" selected>Depoda</option> : <option value="On Warehouse">Depoda</option>}
                                        {need.status === "Delivered" ? <option value="Delivered" selected>Teslim Edildi</option> : <option value="Delivered">Teslim Edildi</option>}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success btn-block mt-3 w-50 mx-auto">Değiştir</button>
                            <a href={getPath(need.id)} className="btn btn-danger btn-block mt-3 w-50 mx-auto">Sil</a>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
}

export default EditConfirmedNeed;