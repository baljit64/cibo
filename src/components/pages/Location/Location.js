import React, { useState, useEffect } from 'react'
import Slide from 'react-reveal/Slide';

import * as BiIcons from 'react-icons/bi'
import Logo from '../../assets/logo.png'
import './location.css';


import { useDispatch, useSelector } from 'react-redux'
import { SET_LOCATION, SET_USER_DETAIL } from '../../store/Constants'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import API from '../../Services/Api'
import Geocode from "react-geocode";
import { SET_ADDRESS } from '../../store/Constants';
Geocode.setApiKey("AIzaSyBrS5eBzOCobjmCbBtMIheZT3OX3WyneNM");
Geocode.setLanguage("en");

function Location() {
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState('')
  const [manualLocation, setManualLocation] = useState('')
  const [errorMsg, setErorMsg] = useState('')
  let [adress, setAdress] = useState('')
  // profile data

  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  useEffect(() => {
    (async function () {
      try {
        let result = await API.get('/view-profile', {
          headers: headers
        });
        if (result.status === 200) {
          dispatch({
            type: SET_USER_DETAIL,
            payload: result.data.data
          })
        }
      }
      catch (e) {
        if (e.response) {
          console.log(e.response)
        }
      }
    })();
  }, [])

  // end of profile data
  const Confirm = (e) => {
    e.preventDefault()
    setErorMsg('')
    if (manualLocation === '') {
      setErorMsg('Please select a location')
      return false
    }
    setLocation(manualLocation)

  }
  const addressByGeoCode = (e) => {

    Geocode.fromLatLng(location.lat, location.lng).then(
      (response) => {
        setAdress(response.results[0].formatted_address)
      },
      (error) => {
        console.error(error);
      }
    )
  }
  useEffect(() => {
    if (location === '') {
      return false
    }
    addressByGeoCode()
  }, [location])
  const handleChange = address => {
    setAddress(address);
  };
  const handleSelect = address => {
    setAddress(address)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setManualLocation(latLng)
      })
      .catch(error => console.error('Error', error));
  };
  const currentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      let data = {
        lat, lng
      }
      setLocation(data)
    });
  }
  const SendLocation = async () => {
    let data = {
      lat: location.lat, lng: location.lng, delivery_address: adress
    }

    try {
      let result = await API.post('/user', data, { headers: headers })
      if (result.status === 200) {
        dispatch({
          type: SET_LOCATION,
          payload: location
        })
        dispatch({
          type: SET_ADDRESS,
          payload: adress
        })
      }
    }
    catch (e) {
      if (e.response) {
        setErorMsg(e.response.data.message)
      }
    }
  }
  useEffect(() => {
    if (adress === '') { return false }
    SendLocation()
  }, [adress])

  return (
    <div id="select-loaction">
      <div className="container-fluid px-0">
        <div className="location">
          <div className="location-left">
            <div className="location-left-inner-box">
              <div className="location-left-header pb-5">
                <Slide top>
                  <img className="location-logo my-3" alt="logo" src={Logo} />
                </Slide>
              </div>
              <Slide top>
                <div className="location-left-content-area pt-5">
                  {/* <h2>Unexpected guests?</h2> */}
                  {/* <h2>Hungry ?</h2> */}
                  {/* <h2>Game night?</h2> */}
                  <h1 className="text-dark py-1">Late night at office? </h1>
                  <h3 className="text-muted">Order food from favourite restaurants near you.</h3>
                </div>
              </Slide>
              <div className="location-left-inputBox pt-4 w-100">
                <form>
                  <p className='text-danger'>{errorMsg}</p>
                  <span className="location-input pt-3 d-flex">

                    <div className="w-100 location-wrap">

                      <PlacesAutocomplete
                        value={address}
                        onChange={handleChange}
                        onSelect={handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <input
                              {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-input-inner w-100',
                              })}
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item-location';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: 'skyblue', cursor: 'pointer' }
                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                      <button type="submit" onClick={Confirm} className="find-loaction-btn">Confirm </button>
                    </div>
                  </span>

                </form>

              </div>
              <div className='location-or py-4  text-center '><span></span> OR <span></span></div>
              <div className="location-left-footercontent pt-1">
                <div onClick={currentLocation} className="getCurrentLocation "><BiIcons.BiCurrentLocation className="mx-2" />Get My Current Location </div>
              </div>
            </div>
          </div>
          <Slide right>
            <div className="location-right  d-md-block d-none">
            </div>
          </Slide>
        </div>
      </div>
    </div>
  )
}

export default Location;
