import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class EditIncomingSupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            need: '',
            item: '',
            user: props.user,
            formData: {
                id: props.match.params.id,
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
            .then((response) => {
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

    handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('/api/editConfirmedSupportStatus', this.state.formData)
            .then((response) => {
                console.log(response);
                this.props.history.push('/incoming-supports');
            })
            .catch((err) => {
                console.error(err);
            });
    }

    onChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
    }

    render() {
        let need = this.state.need;
        let user = this.state.user;
        let item = this.state.item;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mt-3 mx-auto">
                        <form onSubmit={this.handleSubmit} method="POST" className="text-center border border-light p-5 rounded bg-blue">
                            <p className="h1 mb-4">Gelen Yardımı Düzenle</p>
                            <div className="row">
                                <div className="col-lg-6 mt-3">
                                    <p className="m-0 p-0">İsim</p>
                                    <input type="text" name="name" placeholder="Name*" required={true} value={need.name} className="form-control mb-4" readOnly />
                                    <p className="m-0 p-0">Soyisim</p>
                                    <input type="text" name="surname" placeholder="Surname*" required={true} value={need.surname} className="form-control mb-4" readOnly />
                                    <p className="m-0 p-0">İhtiyaç Tipi</p>
                                    <input type="text" name="requestType" placeholder="Need Type*" required={true} value={item.itemType} className="form-control mb-4" readOnly />
                                    <p className="m-0 p-0">Miktar</p>
                                    <input type="text" name="amount" placeholder="Amount*" required={true} value={need.amount} className="form-control mb-4" readOnly />
                                    <p className="m-0 p-0">Telefon</p>
                                    <input type="text" name="phone" placeholder="Phone*" required={true} value={need.phone} className="form-control mb-4" readOnly />
                                </div>
                                <div className="col-lg-6 mt-3">
                                    <p className="m-0 p-0">Adres</p>
                                    <input type="text" name="address" placeholder="Address*" required={true} value={need.address} className="form-control mb-4" readOnly />
                                    <p className="m-0 p-0">Onaylayan İsim Soyisim</p>
                                    <input type="text" name="NameSurname" placeholder="" required={true} value={user.firstname + " " + user.lastname} className="form-control mb-4" readOnly />
                                    <input type="text" name="confirmName" placeholder="" required={true} value={user.firstname} className="form-control mb-4 d-none" readOnly />
                                    <input type="text" name="confirmSurname" placeholder="" required={true} value={user.lastname} className="form-control mb-4 d-none" readOnly />
                                    <p className="m-0 p-0">Onaylayan STK</p>
                                    <input type="text" name="confirmSTK" placeholder="" required={true} value={user.stk} className="form-control mb-4" readOnly />
                                    <p className="m-0 p-0">Aciliyet Durumu*</p>
                                    <input type="text" name="emergencyStatus" placeholder="Emergency Status*" required={true} value={need.emergencyStatus} className="form-control mb-4" readOnly />
                                    <p className="m-0 p-0">Durum*</p>
                                    <select name="status" onChange={this.onChange} required={true} className="browser-default custom-select mb-4">
                                        <option value="Onaylandı" selected={need.status === "Onaylandı"}>Onaylandı</option>
                                        <option value="Yolda" selected={need.status === "Yolda"}>Yolda</option>
                                        <option value="Teslim Edildi" selected={need.status === "Teslim Edildi"}>Teslim Edildi</option>
                                        <option value="Depoya Girişi Yapıldı" selected={need.status === "Depoya Girişi Yapıldı"}>Depoya Girişi Yapıldı</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn bg-dblue text-white btn-success btn-block mt-3 w-50 mx-auto">Düzenle</button>
                            {/* <a href={getPath(need.id)} className="btn btn-danger btn-block mt-3 w-50 mx-auto">Sil</a> */}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditIncomingSupport);
