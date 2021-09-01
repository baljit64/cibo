import './Error.css'

export default function Error(props) {

  return (
    <div className="d-flex error-page-wrap justify-content-center align-items-center">
      <h3>{props.error}</h3>
    </div>
  )
}


