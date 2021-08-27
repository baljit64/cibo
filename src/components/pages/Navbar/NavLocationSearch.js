import React, { useEffect, useState } from 'react'
import * as MdIcons from 'react-icons/md'
import { SET_ADDRESS, SET_LOCATION } from '../../store/Constants'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux'
import API from '../../Services/Api'
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBrS5eBzOCobjmCbBtMIheZT3OX3WyneNM");
Geocode.setLanguage("en");


function NavLocationSearch(props) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [address, setAddress] = useState([])
  const [location, setLocation] = useState('')
  const [adress, setAdress] = useState('')
  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    props.onHide()
    setAddress(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setLocation(latLng)
      })
      .catch(error => console.error('Error', error));
  };
  // 
  const addressByGeoCode = () => {

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

  // change adress api call
  const changeAdress = async () => {
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
        console.log(e.response.data)
      }
    }
  }


  useEffect(() => {
    if (location === '' && adress === '') {
      return false;
    }
    changeAdress()
  }, [adress])

  const clearText = () => {
    setAddress('')
  }
  return (
    <>

      <PlacesAutocomplete
        {...props}
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search location',
                className: 'nav-location-search w-100',
              })}
            />
            <span onClick={clearText} className='location-cross-icon d-sm-none d-block'><MdIcons.MdClear /></span>
            <div className="nav-autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
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
    </>
  )
}

export default NavLocationSearch
