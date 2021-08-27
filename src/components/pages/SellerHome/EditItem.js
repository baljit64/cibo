import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import API from '../../Services/Api'
import picBg from '../../assets/picBg.svg'
import * as BiIcons from 'react-icons/bi'
import Fade from 'react-reveal'
function EditItem() {
  const token = useSelector(state => state.authReducer.token)
  const item = useSelector(state => state.data.item)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [itemName, setItemName] = useState(item.item_name)
  const [price, setPrice] = useState(item.price)
  const [category, setCategory] = useState(item.category)
  const [description, setDescription] = useState(item.description)
  const [special_note, setSpecial_note] = useState(item.special_notes)
  const [image, setImage] = useState('')
  const [imgUrl, setImgUrl] = useState(null)
  const [msg, setMsg] = useState('')
  const [updating, setUpdating] = useState(false)
  const [previousPage, setPreviousPage] = useState(false)
  const submitData = (e) => {
    e.preventDefault();
    setMsg('')
    if (Validation()) {
      ApiCall()
    }
  }
  const Validation = () => {
    if (!itemName || !price || !category || !description || !special_note) {
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
    setUpdating(true)
    let data = new FormData();
    data.append('item_name', itemName)
    data.append('category', category)
    data.append('price', price)
    data.append('description', description)
    data.append('special_notes', special_note)
    data.append('i_image', image)
    data.append('operation', 'edit')
    data.append('item_id', item._id)
    try {
      let result = await API.post('/items', data, { headers: headers })
      if (result.status === 200) {
        setPreviousPage(true)
        setUpdating(false)
      }
    }
    catch (e) {
      if (e.response) {
        setUpdating(false)
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
        <span className='w-50'>Edit Item</span>
      </div>
      <form>
        {error}
        <Fade up>
          <div className='add-items-body'>

            <div className='add-items-fields-wrap'>
              <div className='add-items-img'>
                <input onChange={e => e.target.files.length > 0 ? Preview(e.target.files[0]) : clearImg()} type='file' />
                <img alt='' src={imgUrl === null ? item.i_image : imgUrl} />
              </div>
              <div className='add-items-right d-flex flex-column'>
                <input className='add-items-input' onChange={e => setItemName(e.target.value)} value={itemName} placeholder='Name' type='text' />
                <input className='add-items-input' value={price} onChange={e => setPrice(e.target.value)} placeholder='$ Price' type='number' />
                <select onChange={e => setCategory(e.target.value)} value={category} className='add-items-input' placeholder='category'>
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
                <textarea placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} rows='3'></textarea>
              </div>
              <div className='add-item-textarea' >
                <textarea placeholder='Special notes' value={special_note} onChange={e => setSpecial_note(e.target.value)} rows='3' ></textarea>
              </div>
            </div>
            <div className='d-flex justify-content-end pt-1 pb-3 px-3'>
              {updating ? <span className='add-item-submit-btn' >UPDATING..</span> : <button onClick={submitData} className='add-item-submit-btn' type="submit" >UPDATE</button>
              }
            </div>
          </div>
        </Fade>
      </form>
    </div>
  )
}

export default EditItem
