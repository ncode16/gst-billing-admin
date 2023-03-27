import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function SelectDropdown(props) {

  const bodyClassName = React.useRef('');
  const [dropdownBackground, setDropdownBackground] = useState({});
  const [dropdownBorder, setDropdownBorder] = useState({});

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    bodyClassName.current = body[0].classList[0];

    if(bodyClassName.current === 'dark-layout'){
      setDropdownBackground({
        background: "#283046"
      })
      setDropdownBorder({
        border: '1px solid #404656'
      });
    } else {
      setDropdownBackground({
        background: "#fff"
      })
      setDropdownBorder({
        border: '1px solid #d8d6de'
      });
    }

  }, [bodyClassName.current]);

  const {
    id,
    label,
    onBlur,
    isSearchable,
    showError,
    defaultValue,
    placeholder,
    options,
    error,
    disabled,
    isClearable,
    onChange,
    name,
    isMulti,
    closeMenuOnSelect,
    isRequired,
    selected,
    value,
    blurInputOnSelect,
  } = props;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      border: dropdownBorder.border
      // '&:hover': {
      //   border: '1px solid #ff8b67',
      // },
      // '&:focus': {
      //   border: '1px solid #ff8b67',
      // },
    }),
    menuPortal: provided => ({ ...provided, zIndex: 9999, cursor: 'pointer' }),
    menu: provided => ({ ...provided, zIndex: 9999, cursor: 'pointer', background: dropdownBackground.background }),
    container: provided => ({
      ...provided,
      width: "100%",
    }),
    singleValue: provided => ({
      ...provided,
      color: 'grey'
    })
  };

  return (
    <div className={`form-group ${error ? 'is-error' : ''}`}>
      <Form.Label>
        {label}
        {isRequired && <span className="required">*</span>}
      </Form.Label>
      <div className="input-group">
        
        <Select
          name={name}
          selected={selected}
          value={value}
          isClearable={isClearable}
          defaultValue={defaultValue}
          isDisabled={disabled}
          closeMenuOnSelect={closeMenuOnSelect || false}
          blurInputOnSelect={blurInputOnSelect}
          components={animatedComponents}
          isMulti={isMulti}
          isSearchable={isSearchable}
          options={options}
          onChange={onChange}
          className="react-select-dropdown"
          classNamePrefix="options"
          onBlur={onBlur}
          id={id}
          styles={customStyles}
          placeholder={placeholder}
        >
        </Select>
      </div>
      {showError && error && (<Form.Text className="error-text">{error}</Form.Text>)}
    </div>
  );
}