import React, { useState } from 'react'
import * as BiIcons from 'react-icons/bi'
import Slide from 'react-reveal/Slide';
import { Link } from 'react-router-dom'
import API from '../../../Services/Api';

function Forget() {


  const [email, setEmail] = useState('')
  const [required, setRequired] = useState('')
  const [msg, setMsg] = useState('')

  const callApi = async () => {
    let data = {
      email
    }
    try {

      let result = await API.post('/forget', data);
      if (result.status === 200) {
        setMsg(result.data.message)
      }
    }
    catch (e) {
      if (e.response) {
        setRequired(e.response.data.message)
      }
    }
  }

  const forget = (e) => {
    setRequired('')
    e.preventDefault();
    if (!email) {
      setRequired('Required')
      return false;
    }
    callApi()
  }
  return (
    <>
      <div className="login-form w-100">
        <div className="login-heading text-left">
          {/* <span className="d-inline-block "> <img className="p-0 mb-3 login-logo" src={Logo} /></span> */}
          <h4>Forget   Password  </h4>
          <p className="text-muted forget-p-heading py-3 mx-auto w-50">Please enter your registered email address. You will receive a link
            to create a new password via email.</p>
        </div>
        <form>
          <Slide top>
            <div className="login-input-box mx-auto d-flex flex-column">
              <span className='required text-danger'>{required}</span>
              <span className='required text-success'>{msg}</span>
              <label className=" w-100 mb-3">
                <span className="field-icons"><BiIcons.BiLock /></span>
                <input onChange={e => setEmail(e.target.value)} value={email} className="login-fileds d-block w-100" placeholder="Email Address" type="email" >
                </input>
              </label>
              <button type="submit" onClick={forget} className="login-btn">SUBMIT</button>
            </div>
          </Slide>
        </form>
        <div>
          <p className="dont-have-account pt-3">Already have an Account ? <Link to='/'>Log in</Link></p>
        </div>
      </div>
    </>
  )
}

export default Forget
