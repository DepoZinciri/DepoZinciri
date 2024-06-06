import React from "react";
import * as Turkey from "turkey-district-maps-3";
import { Tooltip } from "antd";

class City extends React.Component {
  constructor(props) {
    super(props);
    // (TODO): Fix "I" city map show issue
    this.state = {
      city: this.formatCityName(decodeURIComponent(props.match.params.city)),
      info: {},
    };
  }

  formatCityName(city) {
    if (city.charAt(0) === "i") {
      return "I" + city.slice(1, city.length);
    } else {
      return city.charAt(0).toUpperCase() + city.slice(1, city.length);
    }
  }

  async componentDidMount() {
    const encodedCity = encodeURIComponent(this.state.city);
    const url = `/api/getMapInfo/${encodedCity}`;
    fetch(url)
      .then(async (response) => response.json())
      .then(async (data) => this.setState({ info: data.city }));
  }

  render() {
    const info = this.state.info;
    console.log(info);

    const handleHover = (district) => {
      console.log(info);
    };

    const renderCityComponents = () => {
      try {
        console.log(this.state.city);
        const ComponentName = Turkey[this.state.city];

        if (!ComponentName) {
          throw new Error(`Component for ${this.state.city} is not found`);
        }

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
              <p>
                <strong>Nüfus:</strong> {info.nufus}
              </p>
              <p>
                <strong>Yüz Ölçümü:</strong> {info.yuzolcumu} km²
              </p>
              <p>
                <strong>Kadın Nüfusu:</strong> {info.kadin_nufus}
              </p>
              <p>
                <strong>Erkek Nüfusu:</strong> {info.erkek_nufus}
              </p>
              <h5 className="font-weight-bold">
                Bölgesel İhtiyaç Analizi Sonuçları
              </h5>
              <p>
                {" "}
                <strong>Günlük su ihtiyacı:</strong> 87.000 m³
              </p>
              <p>
                <strong>Günlük içme suyu ihtiyacı:</strong> 11.607 m³
              </p>
              <p>
                <strong>Günlük hijyenik ped ihtiyacı:</strong> 196.208 paket
              </p>
              <p>
                <strong>Günlük mama ihtiyacı:</strong> 592 kg
              </p>
              <p>
                <strong>Portatif tuvalet ihtiyacı:</strong> 580.348 adet
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
