import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import API from '../../Services/Api'
import picBg from '../../assets/picBg.svg'
import * as BiIcons from 'react-icons/bi'
import Fade from 'react-reveal'
function AddItems() {
  const token = useSelector(state => state.authReducer.token)

  let headers = {
    Authorization: `Bearer ${token}`
  }

  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [special_note, setSpecial_note] = useState('')
  const [image, setImage] = useState('')
  const [imgUrl, setImgUrl] = useState(null)
  const [msg, setMsg] = useState('')
  const [previousPage, setPreviousPage] = useState(false)

  const submitData = (e) => {
    e.preventDefault();
    setMsg('')
    if (Validation()) {
      ApiCall()
    }

  }
  const Validation = () => {
    if (!itemName || !price || !category || !description || !special_note || !image) {
      setMsg('All fields are Required...')
      return false
    }
    else if (itemName.length < 6) {
      setMsg('Item name Must be 6 Characters...')
      return false
    }
    else {
      return true
    }
  }
  const Preview = (e) => {
    setImgUrl(URL.createObjectURL(e))
    setImage(e)
  }
  const clearImg = () => {
    setImgUrl(null)
    setImage('')
  }
  const ApiCall = async () => {
    let data = new FormData();
    data.append('item_name', itemName)
    data.append('category', category)
    data.append('price', price)
    data.append('description', description)
    data.append('special_notes', special_note)
    data.append('i_image', image)
    data.append('operation', 'add')
    try {
      let result = await API.post('/items', data, { headers: headers })
      if (result.status === 200) {
        setPreviousPage(true)
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
        setMsg(e.response.data.message)
      }
    }
  }
  let error = ''
  if (msg) {
    error = (
      <div className='alert alert-danger px-3 py-1 mx-2'>{msg}</div>
    )
  }
  if (previousPage) {
    return (
      <Redirect to='/seller/items/' />
    )
  }
  return (
    <div className='addd-items-wrap'>
      <div className='add-items-header mb-3 p-2 d-flex flex-row justify-content-between align-items-center'>
        <Link to="/seller/items"><BiIcons.BiArrowBack /></Link>
        <span className='w-50'>Add item</span>
      </div>
      <form>
        {error}
        <Fade up>
          <div className='add-items-body'>

            <div className='add-items-fields-wrap'>
              <div className='add-items-img'>
                <input onChange={e => e.target.files.length > 0 ? Preview(e.target.files[0]) : clearImg()} type='file' />
                <img alt='' src={imgUrl === null ? picBg : imgUrl} />
              </div>
              <div className='add-items-right d-flex flex-column'>
                <input className='add-items-input' onChange={e => setItemName(e.target.value)} placeholder='Name' type='text' />
                <input className='add-items-input' onChange={e => setPrice(e.target.value)} placeholder='$ Price' type='number' />
                <select onChange={e => setCategory(e.target.value)} className='add-items-input' placeholder='category'>
                  <option value=''>Select category</option>
                  <option value='Vegetarian'>Vegetarian</option>
                  <option value='Non vegitarian'>Non vegitarian</option>
                  <option value='South indian'>South indian</option>
                  <option value='North indian'>North indian</option>
                  <option value='Chinese'>Chinese</option>
                  <option value='Sweets'>Sweets</option>
                </select>
              </div>
            </div>


            <div className='add-items-fields-wrap'>
              <div className='add-item-textarea' >
                <textarea placeholder='Description' onChange={e => setDescription(e.target.value)} rows='3'></textarea>
              </div>
              <div className='add-item-textarea' >
                <textarea placeholder='Special notes' onChange={e => setSpecial_note(e.target.value)} rows='3' ></textarea>
              </div>
            </div>

            <div className='d-flex justify-content-end pt-1 pb-3 px-3'>
              <button onClick={submitData} className='add-item-submit-btn' type="submit" >SUBMIT</button>
              {/* <span className='add-item-submit-btn' type="submit" >SUBMIT</span> */}

            </div>



          </div>
        </Fade>
      </form>


    </div>
  )
}

export default AddItems
