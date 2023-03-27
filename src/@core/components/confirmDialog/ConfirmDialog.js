import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';

const ConfirmDialog =() => {

    const navigate = useNavigate();

    const DialogResponse = () => {
        navigate("/apps/userManagement", state={name:'working'})
    }

    confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {DialogResponse}
          },
          {
            label: 'No',
            onClick: () => {DialogResponse}
          }
        ]
    });
}

export {ConfirmDialog}