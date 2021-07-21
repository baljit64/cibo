import React, { Component } from 'react'
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import { GoogleComponent } from 'react-google-location'

import Logo from '../../assets/logo.png'
import './location.css';

const API_KEY = "Your api key here";

export default class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: null
    };

  }

  render() {
    console.log(this.state.place)
    return (
      <div id="select-loaction">
        <div className="container-fluid px-0">
          <div className="location">
            <div className="location-left">
              <div className="location-left-inner-box">
                <div className="location-left-header">
                  <Slide top>
                    <img className="location-logo my-3" src={Logo} />
                  </Slide>
                </div>
                <Slide top>
                  <div className="location-left-content-area py-5 ">
                    {/* <h2>Unexpected guests?</h2> */}
                    {/* <h2>Hungry ?</h2> */}
                    {/* <h2>Game night?</h2> */}
                    <h1 className="text-dark py-1">Late night at office? </h1>
                    <h3 className="text-muted">Order food from favourite restaurants near you.</h3>
                  </div>
                </Slide>
                <div className="location-left-inputBox py-3 w-100">
                  <form>
                    <span className="w-100 d-flex">
                      <div className="location-input w-75">
                        <GoogleComponent
                          apiKey={API_KEY}
                          language={'en'}
                          country={'country:in' | 'country:us'}
                          coordinates={true}
                          locationBoxStyle={'location-input-inner w-100'}
                          locationListStyle={'location-listStyle'}

                          onChnage={(e) => {
                            this.setState({
                              place: e
                            })
                          }}
                        />

                      </div>
                      <button className="find-loaction-btn w-25">FIND </button>
                    </span>

                  </form>
                </div>
                <div className="location-left-footercontent"></div>
              </div>

            </div>
            <Zoom>
              <div className="location-right  d-md-block d-none">
              </div>
            </Zoom>
          </div>
        </div>
      </div>
    )
  }
}
