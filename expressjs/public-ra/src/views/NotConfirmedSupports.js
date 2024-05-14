import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function NotConfirmedNeeds() {
    const [notConfirmedNeeds, setnotConfirmedNeeds] = useState([]);
    const [userResponse, setUserResponse] = useState([]);

    const editNotConfirmedNeed = (id) => {
        let myPath = '/confirmed_need/edit/' + id + '';
        return myPath;
    }

    useEffect(() => {
        showNotConfirmedNeeds();
        fetch("/api/auth")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUserResponse(data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    function showNotConfirmedNeeds() {
        fetch("/api/getNotConfirmedSupportRequests")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data.requests);
            setnotConfirmedNeeds(data.requests);
        })
        .catch((err) => {
            console.log(err);
        });
    }


    if (notConfirmedNeeds) {
        return (
            <div className="container text-center" >
                <div className="bg-dblue rounded">
                    <h1 className="mt-5 c-white p-3">Onaylanmamış Yardımlar</h1>
                </div>
                <div className="bg-blue p-2 mt-2 rounded border">
                    <div className="bg-white rounded">
                        <div className="table-responsive">
                            <table className="table table-bordered mt-3 rounded">
                                <thead className="thead-dark rounded">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">İsim</th>
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
                                            <th scope="row">{need.id}</th>
                                            <td>{need.name}</td>
                                            <td>{need.surname}</td>
                                            <td>{need.requestType == 2 ? "Gıda" : "Diğer"}</td>
                                            <td>{need.confirmed}</td>
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
        )
    } else {
        return <Redirect to='/' />
    }
}

export default NotConfirmedNeeds;