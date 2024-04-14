import React from "react";
import * as Turkey from  "turkey-district-maps-3";
import { Tooltip } from "antd";

class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: props.match.params.city,
            support: '',
            user: ''
        }
    }
    render() {        
        const handleHover = (district) => {
            console.log(`${district.name} is hovered!`);
          };
          
          const renderCityComponents = () => {
            try {
                const ComponentName = Turkey[this.state.city]; 
                console.log(ComponentName)
                
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
            }catch (error) {
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
                    <h1>{this.state.city}</h1>
                  </div>
                  <div className="col-10 min-vh-75">
                    {renderCityComponents()}
                  </div>
                  <div className="col-2">
                    <h1>City Info</h1>
                    <p>City: {this.state.city}</p>
                    <p>Population: 1000000</p>
                    <p>Area: 1000 km2</p>
                    <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </div>
                </div>
              </div>
            </div>
          );
    }

};

export default City;
