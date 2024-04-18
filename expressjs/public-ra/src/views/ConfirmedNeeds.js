import React from 'react';
import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function ConfirmedNeeds() {
    const [confirmedNeeds, setConfirmedNeeds] = useState([]);
    const [userResponse, setUserResponse] = useState([]);

    const showPersonalData = (id) => {
        let myPath = '/data/' + id + '';
        return myPath;
    }

    const editConfirmedNeed = (id) => {
        let myPath = '/confirmed_need/edit/' + id + '';
        return myPath;
    }

    useEffect(() => {
        showConfirmedNeeds();
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

    function showConfirmedNeeds() {

        const apiKey = '04cbdab3-90e1-4bed-8d6e-ccfce0fa894c'

        axios.get('https://devservice-dot-dynamic-sun-260208.appspot.com/int/da124c9f1a874fe2/showAllApprovedNeeds', {
            params: { args: [] },
            headers: {
                ApiKey: apiKey,
            },
        }).then(async (response) => {
            let needs;
            if (response.data.data[0] !== "") {
                needs = response.data.data;
                setConfirmedNeeds(needs);
            }
        }).catch(err => {
            console.error(err)
        });
    }

    if (confirmedNeeds) {
        return (
            <div className="container text-center" >
                <div className="bg-dblue rounded">
                    <h1 className="mt-5 c-white p-3">Onaylanan İhtiyaçlar</h1>
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
                                    {confirmedNeeds.map(need =>
                                        <tr key={need[0]}>
                                            <th scope="row">{need[0]}</th>
                                            {userResponse === "LOGGED_IN" ? <td><Link to={showPersonalData(need[0])}>{need[1]}</Link></td> : <td>{need[1].charAt(1) + need[1].slice(1,need[1].length - 1)}</td>}
                                            <td>{need[2]}</td>
                                            <td>{need[3]}</td>
                                            {userResponse === "LOGGED_IN" ? <td><Link to={editConfirmedNeed(need[0])} className="btn btn-primary">Düzenle</Link></td> : <td></td>}
                                        </tr>
                                    )}
                                    <tr>
                                        <td>1</td>
                                        <td>J***</td>
                                        <td>D**</td>
                                        <td>Gıda</td>                                       
                                        <td>30 Ekmek</td>
                                        <td>**********</td>
                                        <td>Ankara / Keçiören ****** **** ** ***** *** </td>
                                        <td><Link to={editConfirmedNeed(1)} className="btn bg-dblue text-white">Destek ol</Link></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>J***</td>
                                        <td>D**</td>
                                        <td>Barınma</td>                                       
                                        <td>2 Konteyner</td>
                                        <td>**********</td>
                                        <td>Ankara / Mamak ****** **** **** ** </td>
                                        <td><Link to={editConfirmedNeed(1)} className="btn bg-dblue text-white">Destek ol</Link></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>J***</td>
                                        <td>D**</td>
                                        <td>Barınma</td>                                       
                                        <td>4 Adet Isıtıcı</td>
                                        <td>**********</td>
                                        <td>Ankara / Mamak ****** **** **** ** </td>
                                        <td><Link to={editConfirmedNeed(1)} className="btn bg-dblue text-white">Destek ol</Link></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>M******</td>
                                        <td>C*****</td>
                                        <td>Gıda</td>                                       
                                        <td>60 Litre İçme Suyu</td>
                                        <td>**********</td>
                                        <td>Ankara / Mamak ****** **** **** ** </td>
                                        <td><Link to={editConfirmedNeed(1)} className="btn bg-dblue text-white">Destek ol</Link></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>A***</td>
                                        <td>D**</td>
                                        <td>Hijyen</td>                                       
                                        <td>5 paket Hijyenik ped</td>
                                        <td>**********</td>
                                        <td>Ankara / Mamak ****** **** **** ** </td>
                                        <td><Link to={editConfirmedNeed(1)} className="btn bg-dblue text-white">Destek ol</Link></td>
                                    </tr>
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

export default ConfirmedNeeds;