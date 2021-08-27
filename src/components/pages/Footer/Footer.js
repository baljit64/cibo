import Logo from '../../assets/logo2.png'
import './Footer.css'
import Slide from 'react-reveal/Slide';
export default function Foter() {
  return (
    <Slide bottom>
      <div className="container-fluid d-md-block d-none  px-0">
        <div className="footer-wrap">
          <div className="container mx-auto">
            <div className="footer-inner-wrap py-5">
              <div className="footer-about pb-3  d-flex flex-row ">
                <img className="footer-logo" src={Logo} alt="logo" />
                <div className="d-flex px-2 flex-column text-light">
                  <h4 className="pb-2">About Us</h4>
                  <p className="about-p">
                    Some short text about company like You might remember
                    the Dell computer commercials in which a youth reports.
                  </p>
                </div>
              </div>
              <div className="footer-err-services d-flex flex-row justify-content-around">
                <div className="d-flex footer-err-child flex-row justify-content-between footer-width">
                  <div className="d-flex flex-column footer-width pb-3 text-light">
                    <h4 className="pb-2">Error pages</h4>
                    <div className="footer-links">
                      <p>Not found</p>
                      <p>Maintence</p>
                      <p>Coming Soon</p>
                    </div>

                  </div>
                  <div className="d-flex flex-column footer-width pb-3  text-light ">
                    <h4 className="pb-2">Services</h4>
                    <div className="footer-links">
                      <p>Not found</p>
                      <p>Maintence</p>
                      <p>Coming Soon</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row  footer-err-child  footer-width justify-content-between">
                  <div className="d-flex flex-column footer-width pb-3  text-light">
                    <h4 className="pb-2">For Users</h4>
                    <div className="footer-links">
                      <p> User Login </p>
                      <p> User register </p>
                      <p> Forget password </p>
                      <p> Account setting </p>
                    </div>
                  </div>
                  <div className="d-flex flex-column footer-width pb-3  text-light ">
                    <h4 className="pb-2">More pages</h4>
                    <div className="footer-links">
                      <p>Not found</p>
                      <p>Maintence</p>
                      <p>Coming Soon</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  )
}
