import React from "react";
import * as Turkey from "turkey-district-maps-3";
import { Tooltip } from "antd";

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.formatCityName(decodeURIComponent(props.match.params.city)),
      info: {},
    };
  }

  formatCityName(city) {
    if (city.charAt(0) === "i") {
      return "I" + city.slice(1);
    } else {
      return city.charAt(0).toUpperCase() + city.slice(1);
    }
  }

  async componentDidMount() {
    const encodedCity = encodeURIComponent(this.state.city);
    const url = `/api/getMapInfo/${encodedCity}`;
    fetch(url)
      .then(async (response) => response.json())
      .then(async (data) => {
        this.setState({ info: data.city });
      })
      .catch((err) => {
        console.error("Error fetching city data:", err);
      });
  }

  calculateNeeds(info) {
    const parseNumber = (value) => {
      return parseInt(value.replace(/\D/g, ""), 10) || 0;
    };

    const nufus = parseNumber(info.nufus);
    const kadin_nufus = parseNumber(info.kadin_nufus);

    const dailyWaterNeed = nufus * 15; // litre
    const dailyDrinkingWaterNeed = nufus * 2; // litre
    const dailyHygienicPadNeed = Math.ceil(kadin_nufus * 0.25); // paket
    const dailyBabyFormulaNeed = Math.ceil(nufus * 0.05) * 0.2; // kg
    const portableToiletNeed = Math.ceil(nufus / 50); // adet

    return {
      dailyWaterNeed,
      dailyDrinkingWaterNeed,
      dailyHygienicPadNeed,
      dailyBabyFormulaNeed,
      portableToiletNeed,
    };
  }

  render() {
    const info = this.state.info;
    const needs = info.nufus ? this.calculateNeeds(info) : {};

    const handleHover = (district) => {
      console.log(district);
    };

    const renderCityComponents = () => {
      try {
        const ComponentName = Turkey[this.state.city];

        if (!ComponentName) {
          throw new Error(`Component for ${this.state.city} is not found`);
        }

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
        console.error("Error rendering city component:", error);
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
                <strong>Günlük su ihtiyacı:</strong> {needs.dailyWaterNeed} litre
              </p>
              <p>
                <strong>Günlük içme suyu ihtiyacı:</strong> {needs.dailyDrinkingWaterNeed} litre
              </p>
              <p>
                <strong>Günlük hijyenik ped ihtiyacı:</strong> {needs.dailyHygienicPadNeed} paket
              </p>
              <p>
                <strong>Günlük bebek maması ihtiyacı:</strong> {needs.dailyBabyFormulaNeed} kg
              </p>
              <p>
                <strong>Portatif tuvalet ihtiyacı:</strong> {needs.portableToiletNeed} adet
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default City;
