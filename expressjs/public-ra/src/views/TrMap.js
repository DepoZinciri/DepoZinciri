import React from "react";
import TurkeyMap from 'turkey-map-react';
import { useHistory } from "react-router-dom";
import { Tooltip } from "antd";

const TrMap = () => {
  const history = useHistory();
    const renderCity = (cityComponent, cityData) => ( 
        <Tooltip title={cityData.name} key={cityData.id}> 
            {cityComponent} 
        </Tooltip>
      );
      
      return (
        <TurkeyMap onClick={ ({ name }) => history.push("/turkey-map/" + name) }  cityWrapper={renderCity} />
      )
};

export default TrMap;
