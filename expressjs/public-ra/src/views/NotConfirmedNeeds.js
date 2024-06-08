import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';

function NotConfirmedNeeds() {
    const [notConfirmedNeeds, setNotConfirmedNeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const successMessage = location.state?.successMessage || '';

    const editNotConfirmedNeed = (id) => {
        let myPath = '/need/edit/' + id + '';
        return myPath;
    }

    useEffect(() => {
        showNotConfirmedNeeds();
    }, []);

    const showNotConfirmedNeeds = async () => {
        try {
            const response = await fetch("/api/getNotConfirmedNeedRequests", {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            const data = await response.json();
            setNotConfirmedNeeds(data.requests.map((need, index) => ({ ...need, displayId: index + 1 })));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching not confirmed needs:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (notConfirmedNeeds.length === 0) {
        return <div>No not confirmed needs found.</div>;
    }

    return (
        <div className="container text-center">
            {successMessage && <div className="alert alert-success mt-4">{successMessage}</div>}
            <div className="bg-dblue rounded">
                <h1 className="mt-5 c-white p-3">Onaylanmamış İhtiyaçlar</h1>
            </div>
            <div className="bg-blue p-2 mt-2 rounded border">
                <div className="bg-white rounded">
                    <div className="table-responsive">
                        <table className="table table-bordered mt-3 rounded">
                            <thead className="thead-dark rounded">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">İsim</th>
                                    <th scope="col">Aciliyet Durumu</th>
                                    <th scope="col">Soyisim</th>
                                    <th scope="col">İhtiyaç Tipi</th>
                                    <th scope="col">Detay</th>
                                    <th scope="col">Telefon</th>
                                    <th scope="col">Adres</th>
                                    <th scope="col">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notConfirmedNeeds.map(need =>
                                    <tr key={need.id}>
                                        <th scope="row">{need.displayId}</th>
                                        <td>{need.name}</td>
                                        <td>{need.emergencyStatus}</td>
                                        <td>{need.surname}</td>
                                        <td>{need.itemType}</td>
                                        <td>{need.itemDescription}</td>
                                        <td>{need.phone}</td>
                                        <td>{need.address}</td>
                                        <td><Link to={editNotConfirmedNeed(need.id)} className="btn bg-dblue text-white">Onayla</Link></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotConfirmedNeeds;
