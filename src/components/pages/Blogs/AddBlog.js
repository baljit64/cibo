import React, { useState } from 'react'
import * as MdIcons from 'react-icons/md'
import picBg from '../../assets/picBg.svg'
import { Link, Redirect } from 'react-router-dom'
import API from '../../Services/Api'
import { useSelector } from 'react-redux'

function AddBlog() {

  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [blog_image, setBlog_image] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState(null)
  // error msg
  const [imgMsg, setImgMsg] = useState('')
  const [titleMsg, setTitleMsg] = useState('')
  const [descriptionMsg, setDescriptionMsg] = useState('')
  const [submiting, setSubmiting] = useState(false)
  // 
  const [previousPage, setPreviousPage] = useState(false)
  const selectImage = (e) => {
    setBlog_image(e)
    setUrl(URL.createObjectURL(e))
  }
  const clearImg = () => {
    setBlog_image('')
    setUrl(null)
  }

  const validation = () => {
    if (!blog_image && !title && !description) {
      setImgMsg('Required')
      setTitleMsg("Required")
      setDescriptionMsg("Required")
    }
    else if (!blog_image) {
      setImgMsg('Required')
      return false
    }
    else if (!title) {
      setTitleMsg("Required")
      return false
    }
    else if (!description) {
      setDescriptionMsg("Required")
      return false
    }
    else {
      return true
    }
  }
  const callAPI = async () => {
    let data = new FormData();
    data.append('blog_image', blog_image)
    data.append('title', title)
    data.append('description', description)
    try {
      setSubmiting(true)
      let result = await API.post('/blog', data, { headers: headers })
      console.log(result)
      if (result.status === 200) {
        setSubmiting(false)
        setPreviousPage(true)
      }

    }
    catch (e) {
      if (e.response) {
        setSubmiting(false)
        console.log(e.response.data)
      }
    }
  }
  const noAction = (e) => {
    e.preventDefault()
  }
  const PostBlog = (e) => {
    setImgMsg('')
    setTitleMsg("")
    setDescriptionMsg("")
    e.preventDefault();
    if (validation()) {
      callAPI()
    }
  }
  if (previousPage) {
    return (
      <Redirect to='/profile/blogs' />
    )
  }
  return (
    <div className='add-blog-page w-100'>
      <div className='add-blog-header d-flex flex-row justify-content-between align-items-center'>
        <Link to='/profile/blogs' style={{ textDecoration: 'none' }} className='blog-back-btn'><MdIcons.MdKeyboardBackspace /></Link>
        <span className='blog-label'>Add blog</span>
      </div>
      <form>
        <div className='add-blog-form  mx-auto'>

          <div className='img-preview'>
            <input onChange={e => e.target.files.length > 0 ? selectImage(e.target.files[0]) : clearImg()} type='file' accept=".png,.jpg" />
            <img className='bg-img' src={url ? url : picBg} />
            <span className='blogErorMsg'>{imgMsg}</span>
          </div>

          <div className='fields-width text-center'>
            <div className='fields-wrap py-2'>
              <input placeholder='Title' onChange={e => setTitle(e.target.value)} value={title} className='blog-title pt-3' />
              <span className='blogEror'>{titleMsg}</span>
            </div>
            <div className='fields-wrap py-2'>
              <textarea placeholder='Description' className='blog-title' onChange={e => setDescription(e.target.value)} value={description} rows='4'></textarea>
              <span className='blogEror'>{descriptionMsg}</span>
            </div>
            <div className='text-center w-100'>
              {submiting ? <button
                onClick={noAction} className='blog-submit-btn'>Submiting...</button> : <button type='submit'
                  onClick={PostBlog}
                  className='blog-submit-btn'>Submit</button>}
            </div>
          </div>

        </div>
      </form>

    </div>
  )
}

export default AddBlog
