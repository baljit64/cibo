import { Modal } from 'react-bootstrap';
import './Popup.css'
import { useState } from 'react'
import API from '../../../Services/Api'
import { useSelector } from 'react-redux'
function Example(props) {
  const token = useSelector(state => state.authReducer.token)
  const [old_password, setOld_password] = useState('')
  const [new_password, setNew_password] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [msg, setMsg] = useState('')
  const [updating, setUpdating] = useState(false)
  const [success, setSuccess] = useState(false)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const validation = () => {
    if (!old_password || !new_password || !confirm_password) {
      setMsg('All Fields are required')
      return false
    }
    else {
      return true
    }
  }
  const changePassword = async (e) => {
    e.preventDefault();
    setMsg('')
    setSuccess(false)
    let data = {
      old_password, new_password, confirm_password
    }
    if (validation())
      setUpdating(true)
    try {
      let result = await API.post('/change-password', data, { headers: headers });
      if (result.status === 200) {
        setUpdating(false)
        setNew_password('')
        setConfirm_password('')
        setOld_password('')
        setSuccess(true)
        setMsg('Successfully Updated...')
      }

    }
    catch (e) {
      if (e.response) {
        setUpdating(false)
        setMsg(e.response.data.message)
      }
    }
  }
  let error = ''
  if (msg) {
    if (success) {
      error = (
        <p className='alert-msg py-1 px-3 alert alert-success'>{msg}</p>
      )
    }
    else {
      error = (
        <p className='alert-msg py-1 px-3 alert alert-danger'>{msg}</p>
      )
    }

  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className='change-password-heading'>
            Change Password
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {error}
        <form >
          <div className="form-group">
            <label for="old-password" className="col-form-label">Old Password</label>
            <input type="password" value={old_password} onChange={e => (setOld_password(e.target.value))} className="form-control" id="recipient-name" />
          </div>
          <div className="form-group">
            <label for="new-password" className="col-form-label">New Password</label>
            <input type="password" value={new_password} onChange={e => (setNew_password(e.target.value))} className="form-control new-password" id="recipient-name" />
          </div>
          <div className="form-group">
            <label for="new-password" className="col-form-label">Confirm Password</label>
            <input type="password" value={confirm_password} onChange={e => (setConfirm_password(e.target.value))} className="form-control confirm-password" id="recipient-name" />
          </div>
          <div className='text-center pt-3'>
            <button onClick={changePassword} type='submit' className={!updating ? "Change-pass-btn" : "d-none"}>Update password</button>
            <span className={updating ? "Change-pass-btn" : "d-none"}>Updating....</span>
          </div>
        </form>

      </Modal.Body>
    </Modal>


  );
}

export default Example;
