import React from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function SelectDropdown(props) {
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

    menuPortal: provided => ({ ...provided, zIndex: 9999, cursor: 'pointer' }),
    menu: provided => ({ ...provided, zIndex: 9999, cursor: 'pointer' }),
    container: provided => ({
      ...provided,
      width: "100%",
    }),
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