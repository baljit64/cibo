
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Geocode from "react-geocode";
import { SET_ADDRESS } from '../../store/Constants';
Geocode.setApiKey("AIzaSyBrS5eBzOCobjmCbBtMIheZT3OX3WyneNM");
Geocode.setLanguage("en");

function GeoCode() {
  const dispatch = useDispatch()
  const latlng = useSelector(state => state.getLocation.Location)

  let lat = latlng.lat
  let lng = latlng.lng
  Geocode.fromLatLng(lat, lng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      dispatch({
        type: SET_ADDRESS,
        payload: address
      })
    },
    (error) => {
      console.error(error);
    }
  );

  return (
    <></>
  )

}

export default GeoCode
