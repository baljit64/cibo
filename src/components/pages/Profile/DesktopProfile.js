import React from 'react'
import ChangePassword from './Popup/ChangePassword'
import * as BsIcons from 'react-icons/bs'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Fade from 'react-reveal'
import API from '../../Services/Api'
import { SET_USER_DETAIL } from '../../store/Constants'
import LoadingImg from '../../assets/loader.gif'
function DesktopProfile() {


  const token = useSelector(state => state.authReducer.token)
  const user = useSelector(state => state.authReducer.user)
  const dispatch = useDispatch()
  let headers = {
    Authorization: `Bearer ${token}`

  }

  const [name, setName] = useState(user.name)

  const [email, setEmail] = useState(user.email)
  const [phone_number, setPhone_number] = useState(user.phone_number)
  const [bio, setBio] = useState(user.bio)
  const [errorMsg, setErrorMsg] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updatingImg, setUpdatingImg] = useState(false);
  const [updatingData, setUpdatingData] = useState(false)
  const validate = () => {
    if (!email || !name || !phone_number || !bio) {
      setErrorMsg('All fileds are required.')
      return false
    }

    else {
      return true
    }
  }
  const updateProfile = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false)
    let data = new FormData();
    data.append('name', name)
    data.append('email', email)
    data.append('phone_number', phone_number)
    data.append('bio', bio)
    if (validate()) {
      setUpdatingData(true)
      try {
        let result = await API.post(`/update-user`, data, { headers: headers });
        if (result.status === 200) {
          reloadProfile();
          setSuccess(true)
          setErrorMsg('Profile Updated Successfully..')
          setUpdatingData(false)
        }
      }
      catch (e) {
        if (e.response) {
          setUpdatingData(false)
          setErrorMsg(e.response.data.message)


        }
      }
    }
  }

  const reloadProfile = async () => {
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
        setErrorMsg(e.response.data.message)
      }
    }

  }
  const changeImage = async (e) => {
    let data = new FormData();
    data.append('image', e)
    data.append('name', name)
    data.append('email', email)
    data.append('phone_number', phone_number)
    data.append('bio', bio)
    setUpdatingImg(true)
    try {
      let result = await API.post('/update-user', data, { headers: headers });
      if (result.status === 200) {
        reloadProfile()
        setUpdatingImg(false)
      }
    }
    catch (e) {
      if (e.response) {
        setUpdatingImg(false)
        console.log(e.response.data)
      }
    }
  }

  let error = ''
  if (errorMsg) {
    if (success) {
      error = (
        <p className='alert alert-msg py-1 mx-3 mt-2 alert-success'>{errorMsg}</p>
      )
    }
    else {
      error = (
        <p className='alert alert-msg py-1 mx-3 mt-2 alert-danger'>{errorMsg}</p>
      )
    }

  }
  return (
    <>
      <Fade right>
        <div className="profile-form">

          <ChangePassword
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <form className='d-none d-md-block'>

            <div className="profile-inner-wrap pb-3">
              <Fade right>
                <div className="profile-header">
                  <span>My  account</span>
                </div>
              </Fade>
              <div className='d-flex flex-row'>
                <Fade right>

                  <div className='width-30  d-flex pt-3 jusity-content-top align-items-center flex-column'>
                    <div className='desktop-userimg'>
                      <img src={updatingImg ? LoadingImg : user.image} alt='user' />
                    </div>

                    <div className='w-50 update-profile-pic-btn-wrap mt-3 d-flex justify-content-around'>
                      {/* <span className='pic-edit-desktop-btns'>Edit</span>
                      <span className='pic-edit-desktop-btns'>Delete</span> */}
                      <input onChange={e => e.target.files.length > 0 ? changeImage(e.target.files[0]) : ""} className="profile-pic-input" type="file" accept="image/png, image/jpeg" />
                      <span className='w-75 update-profile-pic-btn'>
                        Update</span>
                    </div>
                  </div>
                  <div className='width-70'>
                    {error}
                    <div className="profile-input-fields px-3 d-flex flex-column">
                      <label>Full Name</label>
                      <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Full Name"></input>
                    </div>
                    <div className="profile-input-fields px-3 d-flex flex-column">
                      <label>Phone Number</label>
                      <input type="number" onChange={(e) => setPhone_number(e.target.value = e.target.value.slice(0, 10))} value={phone_number} placeholder="Phone Number"></input>
                    </div>
                    <div className="profile-input-fields px-3 d-flex flex-column">
                      <label>Email</label>
                      <input type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email Address"></input>
                    </div>
                    <div className="profile-input-fields px-3 d-flex flex-column">
                      <label>Bio</label>
                      <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Add Bio Detail...." ></textarea>
                    </div>
                  </div>
                </Fade>
              </div>
              <div className='px-3 pt-3 d-flex justify-content-end'>
                <button type='submit' onClick={updateProfile} className={updatingData ? "d-none" : 'update-profile-btn'} >Save Changes</button>
                <span className={updatingData ? 'd-flex justify-contnet-center align-items-center update-profile-btn' : 'd-none'} >Saving...</span>
              </div>
              <hr />
              <Fade right>
                <div className='px-3 pt-3'>
                  <span onClick={() => setModalShow(true)} className='w-100 change-password-btn'>Change Password <BsIcons.BsArrowRight className='animated-profile-arrow' /></span>
                </div>
                <div className=' px-3 pt-3 '>
                  <button className='w-100 deactivate-account-btn'>Deactivate Account <BsIcons.BsArrowRight className='animated-profile-arrow' /></button>
                </div>
              </Fade>
            </div>

          </form>

          <form className='d-block d-md-none'>
            <Fade right>
              <div className="profile-inner-wrap pb-3">
                <div className="profile-header">
                  <span>My  account</span>
                </div>
                {error}
                <div className='d-flex justify-content-center   py-3'>

                  <div className='profile-pic-form-box w-100 text-center'>
                    <img className='user-img' src={updatingImg ? LoadingImg : user.image} alt='user-pic' />
                    <div className="profile-dots"><BsIcons.BsThreeDotsVertical />
                      <ul>
                        <li>
                          <input onChange={e => e.target.files.length > 0 ? changeImage(e.target.files[0]) : ""} className="profile-pic-input" type="file" accept="image/png, image/jpeg" />
                          Edit</li>
                        <li>Delete</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="profile-input-fields px-3 d-flex flex-column">
                  <label>Full Name</label>
                  <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Full Name"></input>
                </div>
                <div className="profile-input-fields px-3 d-flex flex-column">
                  <label>Phone Number</label>
                  <input type="number" o onChange={(e) => setPhone_number(e.target.value = e.target.value.slice(0, 10))} value={phone_number} placeholder="Mobile Number"></input>
                </div>
                <div className="profile-input-fields px-3 d-flex flex-column">
                  <label>Email</label>
                  <input type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email Address"></input>
                </div>
                <div className="profile-input-fields px-3 d-flex flex-column">
                  <label>Bio</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Add Bio Detail...." ></textarea>
                </div>
                <div className=' px-3 pt-3 text-center'>
                  <button type='submit' onClick={updateProfile} className='w-50  update-profile-btn' >Save Changes</button>
                </div>
                <hr />
                <div className=' px-3 pt-3 '>
                  <span onClick={() => setModalShow(true)} className='w-100 change-password-btn'>ChangePassword <BsIcons.BsArrowRight className='animated-profile-arrow' /></span>
                </div>
                <div className=' px-3 pt-3 '>
                  <button className='w-100 deactivate-account-btn'>Deactivate Account <BsIcons.BsArrowRight className='animated-profile-arrow' /></button>
                </div>
              </div>
            </Fade>
          </form>
        </div>
      </Fade>
    </>
  )
}

export default DesktopProfile
