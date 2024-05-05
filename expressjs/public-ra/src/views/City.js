import React from "react";
import * as Turkey from "turkey-district-maps-3";
import { Tooltip } from "antd";
class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city:
        props.match.params.city.charAt(0) === "i"
          ? "I" +
            props.match.params.city.slice(1, props.match.params.city.length)
          : props.match.params.city.charAt(0).toUpperCase() +
            props.match.params.city.slice(1, props.match.params.city.length),
      info: '',
    };
  }
  async componentDidMount() {
    const url = "/api/getMapInfo/" + this.state.city;
    fetch(url)
      .then(async (response) => response.json())
      .then(async (data)=> this.setState({ info: data.city }))
  }
  render() {
    let info = this.state.info;
    console.log(info)
    const handleHover = (district) => {
      console.log(`${district.name} is hovered!`);
    };

    const renderCityComponents = () => {
      try {
        console.log(this.state.city);
        const ComponentName = Turkey[this.state.city];
        console.log(ComponentName);
        return (
          <ComponentName
            onHover={handleHover}
            distWrapper={(distComponent, distData) => (
              <Tooltip title={distData.name} key={distData.name}>
                {distComponent}
              </Tooltip>
            )}
          />
        );
      } catch (error) {
        console.log(error);
        return (
          <div>
            <h1>City not found</h1>
          </div>
        );
      }
    };
    return (
      <div className="mt-8">
        <div className="container">
          <div className="row">
            <div className="col-12 ">
              <h1 className="text-center">{this.state.city} İli </h1>
            </div>
            <div className="col-8 min-vh-60">{renderCityComponents()}</div>
            <div className="col-4">
              <h5 className="font-weight-bold">Genel Bilgiler</h5>
              <p>
                <strong>Şehir:</strong> {this.state.city}
              </p>
              <span>
                {info["Nüfus"]}
              </span>
              <p>
                <strong>Yüz Ölçüm:</strong> 24,521 km²
              </p>
              <p>
                <strong>Nüfus:</strong> 5803482
              </p>
              <p>
                <strong>Kadın Nüfusu:</strong> 2943121
              </p>
              <p>
                <strong>Erkek Nüfusu:</strong> 2860361
              </p>
              <h5 className="font-weight-bold">
                Bölgesel İhtiyaç Analizi Sonuçları
              </h5>
              <p>
                {" "}
                <strong>Günlük su ihtiyacı:</strong>{" "} 87.000 m³
              </p>
              <p>
                <strong>
                  Günlük içme suyu ihtiyacı:
                </strong> {" "}
                11.607 m³
              </p>
              <p>
                <strong>
                  Günlük hijyenik ped ihtiyacı:
                </strong>{" "}
                 196.208 paket
              </p>
              <p>
                <strong>
                  Günlük mama ihtiyacı:
                </strong>{" "}
                592 kg
              </p>
              <p>
                <strong>
                  Portatif tuvalet ihtiyacı:
                </strong>{" "}
                580.348 adet
              </p>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="col-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default City;
