import React, { useEffect, useState } from 'react'
import { Fade } from 'react-reveal'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import API from '../../Services/Api'
import Loader from '../Loaders/Spinner'
import { Modal, Button } from 'react-bootstrap'
function Items() {

  const token = useSelector(state => state.authReducer.token)
  const delivery_mode = useSelector(state => state.getLocation.delivery)
  const pickup_mode = useSelector(state => state.getLocation.pickup_only)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const ApiCall = async () => {
    try {
      let result = await API.get('/listed-item', { headers: headers })

      if (result.status === 200) {
        setData(result.data.data)
        setLoading(false)
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  useEffect(() => {
    ApiCall()
  }, [])
  const DelItem = async (id) => {
    let d = {
      operation: "delete",
      item_id: id
    }
    try {
      let result = await API.post('/items', d, { headers: headers })

      if (result.status === 200) {

        ApiCall()
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // edit item function
  const [editPageOn, setEditPageOn] = useState(false)
  const EditDetails = (item) => {
    setEditPageOn(true)
    dispatch({ type: 'EDIT_ITEM', payload: item })
  }

  if (loading) {
    return (
      <Loader />
    )
  }
  if (editPageOn) {
    return (
      <Redirect to="/seller/items/edit" />
    )
  }

  return (
    <div className='w-100'>
      <div className='seller-items-wrap'>
        <div className='seller-items-header p-2 d-flex flex-row justify-content-between'>
          <span>All Items</span>
          {delivery_mode === false && pickup_mode === false ?
            <span onClick={handleShow} className='add-lnk'>+ Add Items</span> : <Link className='add-lnk' to='/seller/items/additems'>+ Add Items</Link>
          }
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <div className='d-flex align-items-center model-wrap'>
              <span> Selected Delivery option to add item</span>
            </div>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                ok
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className='seller-listed-item-wrap d-flex flex-column'>
          {data.length > 0 ? data.map((item, i) =>

            <div key={i} className='seller-items-list d-flex flex-column my-2'>
              <Fade up>
                <div className='seller-item-content px-2 w-100'>
                  <div className='d-flex flex-row w-100 justify-content-between'>
                    <div className='seller-item-img-wrap'>
                      <img src={item.i_image} alt='' />
                    </div>
                    <div className='item-info px-2 d-flex flex-column'>
                      <span className='seller-item-name'>{item.item_name}</span>
                      <span className='seller-item-category'>{item.category}</span>
                      <span className='seller-item-description'>{item.description}</span>
                    </div>
                  </div>

                </div>
              </Fade>
              <hr />
              <Fade up>
                <div className='d-flex flex-row justify-content-between px-3 align-items-center'>
                  <div className='seller-item-price'>${item.price}</div>
                  <div className='seller-items-btns  d-flex flex-row align-items-center'>
                    <button onClick={() => EditDetails(item)} className='edit-item-btn' >Edit</button>
                    <button onClick={() => DelItem(item._id)} className='delete-item-btn'>Delete</button>
                  </div>
                </div>
              </Fade>
            </div>
          )
            : 'no data to display'}





        </div>
      </div>

    </div>
  )
}

export default Items
