
import { Modal } from 'react-bootstrap';
import './Popup.css'
function CardModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title >
          <div className='card-modal-heading'>
            Add Credit/Debit Card
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='card-headlines d-flex flex-column'>
          <span>Add new card</span>
          <span>WE ACCEPT (Master Card / Visa Card / Rupay)</span>

        </div>
        <form>
          <div className="form-group">
            <label for="card-number" className="col-form-label">Card number</label>
            <input type="password" className="form-control" />
          </div>
          <div className="form-group d-flex flex-row w-100 justify-content-between">

            <div className='w-74'>
              <label for="new-password" className="col-form-label">Valid through (MM/YY)</label>
              <input type="password" className="form-control new-password" />
            </div>
            <div className='w-24'>
              <label for="new-password" className="col-form-label">CVV</label>
              <input type="password" className="form-control  new-password" />
            </div>

          </div>
          <div className="form-group">
            <label for="new-password" className="col-form-label">Name on card</label>
            <input type="password" class="form-control confirm-password" id="recipient-name" />
          </div>
          <div className='add-card-footer w-100 d-flex justify-content-between pt-3'>
            <div className='w-75 d-flex flex-row align-items-start'> <div className='add-card-checkbox' ><input type="checkbox" /> </div> <span className='px-2'>Securely save this card for a faster <br /> checkout next time.</span></div>
            <button className="w-25 add-card-btn">Add card</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CardModal;
