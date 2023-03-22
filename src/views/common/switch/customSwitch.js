// ** Reactstrap Imports
import {

  Input,
} from "reactstrap";

const CustomSwitch = ({ handleClick, isChecked }) => {
  const toggle = {
    cursor: 'pointer'
  }
  return (
    <div>
      <div>
        <div className="form-switch form-check-primary">
          <Input
            type="switch"
            id="switch-primary"
            name="primary"
            style={toggle}
            checked={isChecked}
            defaultChecked
            onClick={handleClick}
          />
        </div>
      </div>
    </div>

  );
};
export default CustomSwitch;
