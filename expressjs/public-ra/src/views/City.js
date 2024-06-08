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
      .then(async (data) => this.setState({ info: data.city }))
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

    const dailyWaterNeed = nufus * 15; // 15 liters per person for all water needs
    const dailyDrinkingWaterNeed = nufus * 3; // 3 liters per person for drinking water
    const dailyHygienicPadNeed = Math.ceil(kadin_nufus * 0.25); // 25% of female population
    const dailyBabyFormulaNeed = Math.ceil(nufus * 0.05 * 0.2); // 5% of population are infants, 0.2 kg per infant
    const portableToiletNeed = Math.ceil(nufus / 50); // 1 toilet per 50 people

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

    const formatNumber = (value) => {
      return value ? parseInt(value).toLocaleString() : "-";
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
                <strong>Günlük su ihtiyacı:</strong> {formatNumber(needs.dailyWaterNeed)} litre
              </p>
              <p>
                <strong>Günlük içme suyu ihtiyacı:</strong> {formatNumber(needs.dailyDrinkingWaterNeed)} litre
              </p>
              <p>
                <strong>Günlük hijyenik ped ihtiyacı:</strong> {formatNumber(needs.dailyHygienicPadNeed)} paket
              </p>
              <p>
                <strong>Günlük bebek maması ihtiyacı:</strong> {formatNumber(needs.dailyBabyFormulaNeed)} kg
              </p>
              <p>
                <strong>Portatif tuvalet ihtiyacı:</strong> {formatNumber(needs.portableToiletNeed)} adet
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default City;
