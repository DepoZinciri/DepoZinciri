import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import updateNeedStatus from '../web3/updateNeedStatus';

class EditConfirmedNeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            need: '',
            item: '',
            user: props.user,
            formData: {
                id: props.match.params.id,
                name: '',
                surname: '',
                needType: '',
                amount: '',
                phone: '',
                address: '',
                emergencyStatus: '',
                status: ''
            },
            statusMessage: '',
            isError: false
        };
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

    handleSubmit = async (e) => {
        e.preventDefault();
        const { id, status } = this.state.formData;
        try {
            // Wait for MetaMask transaction approval
            await updateNeedStatus(id.toString(), status);

            // Proceed to API call after MetaMask transaction approval
            await axios.post('/api/editConfirmNeed', this.state.formData);
            console.log("Request confirmed");
            const { need } = this.state;
            const successMessage = `${need.name} ${need.surname}'ne ait olan İhtiyaç'ı güncellediniz.`;
            this.props.history.push({
                pathname: '/confirmed_needs',
                state: { successMessage }
            });
        } catch (err) {
            console.error(err);
            this.setState({
                statusMessage: 'İhtiyaç güncellenirken bir hata oluştu, lütfen tekrar deneyiniz.',
                isError: true
            });
        }
    };

    handleDelete = async (id) => {
        try {
            await axios.delete(`/api/deleteRequest/${id}`);
            const { need } = this.state;
            const message = `${need.name} ${need.surname}'ne ait olan İhtiyaç'ı sildiniz.`;
            this.props.history.push({
                pathname: '/confirmed_needs',
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

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
    };

    render() {
        let need = this.state.need;
        let user = this.state.user;
        let item = this.state.item;
        let { name, surname, needType, amount, phone, address, emergencyStatus, status } = this.state.formData;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mt-3 mx-auto">
                        <form onSubmit={this.handleSubmit} method="POST" className="text-center border border-light p-5 rounded bg-blue">
                            <p className="h1 mb-4">Onaylanmış İhtiyaç Formu</p>
                            <div className="row">
                                <div className="col-lg-6 mt-3">
                                    <p className="m-0 p-0">İsim</p>
                                    <input onChange={this.handleChange} type="text" name="name" placeholder="Name*" required="true" value={name} className="form-control mb-4" />
                                    <p className="m-0 p-0">Soyisim</p>
                                    <input onChange={this.handleChange} type="text" name="surname" placeholder="Surname*" required="true" value={surname} className="form-control mb-4" />
                                    <p className="m-0 p-0">İhtiyaç Tipi</p>
                                    <input onChange={this.handleChange} type="text" name="needType" placeholder="Need Type*" required="true" readOnly="true" value={item.itemType} className="form-control mb-4" />
                                    <p className="m-0 p-0">Miktar</p>
                                    <input onChange={this.handleChange} type="text" name="amount" placeholder="Amount*" required="true" value={amount} className="form-control mb-4" />
                                    <p className="m-0 p-0">Telefon</p>
                                    <input onChange={this.handleChange} type="text" name="phone" placeholder="Phone*" required="true" value={phone} className="form-control mb-4" />
                                </div>
                                <div className="col-lg-6 mt-3">
                                    <p className="m-0 p-0">Adres</p>
                                    <input onChange={this.handleChange} type="text" name="address" placeholder="Address*" required="true" value={address} readOnly="true" className="form-control mb-4" />
                                    <p className="m-0 p-0">Onaylayan İsim Soyisim</p>
                                    <input type="text" name="NameSurname" placeholder="" required="true" value={user.firstname + " " + user.lastname} readOnly="true" className="form-control mb-4" />
                                    <input type="text" name="confirmName" placeholder="" required="true" value={user.firstname} readOnly="true" className="form-control mb-4 d-none" />
                                    <input type="text" name="confirmSurname" placeholder="" required="true" value={user.lastname} readOnly="true" className="form-control mb-4 d-none" />
                                    <p className="m-0 p-0">Onaylayan STK</p>
                                    <input type="text" name="confirmSTK" placeholder="" required="true" value={user.stk} readOnly="true" className="form-control mb-4" />
                                    <p className="m-0 p-0">Aciliyet Durumu*</p>
                                    <select name="emergencyStatus" onChange={this.handleChange} required="true" className="browser-default custom-select mb-4">
                                        {need.emergencyStatus === "urgent" ? <option value="urgent" selected>Yüksek</option> : <option value="urgent">Yüksek</option>}
                                        {need.emergencyStatus === "mid" ? <option value="mid" selected>Orta</option> : <option value="mid">Orta</option>}
                                        {need.emergencyStatus === "not urgent" ? <option value="not urgent" selected>Düşük</option> : <option value="not urgent">Düşük</option>}
                                    </select>
                                    <p className="m-0 p-0">Durum*</p>
                                    <select name="status" onChange={this.handleChange} required="true" className="browser-default custom-select mb-4">
                                        <option selected className="d-none"></option>
                                        {need.status === "Confirmed" ? <option value="Confirmed" selected>Onaylandı</option> : <option value="Confirmed">Onaylandı</option>}
                                        {need.status === "NotConfirmed" ? <option value="NotConfirmed" selected>İptal Edildi</option> : <option value="NotConfirmed">İptal Edildi</option>}
                                        {need.status === "Delivered" ? <option value="Delivered" selected>Teslim Edildi</option> : <option value="Delivered">Teslim Edildi</option>}
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-success mt-3 w-50 mx-1">Değiştir</button>
                                <button type="button" onClick={() => this.handleDelete(need.id)} className="btn btn-danger mt-3 w-50 mx-1">Sil</button>
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

export default withRouter(EditConfirmedNeed);
