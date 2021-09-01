
import { confirmAlert } from 'react-confirm-alert';

export default function Alert(props) {
  const submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }
  return (
    <>

    </>
  )
}


