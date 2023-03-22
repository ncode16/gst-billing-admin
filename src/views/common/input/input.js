import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "../buttons/button";

const CustomInput = ({
  controlId,
  label,
  type,
  placeholder,
  error,
  showError,
  inputRef,
  name,
  disabled,
  onChange,
  onClick,
  onBlur,
  buttonLabel,
  isLoading,
  isButtonDisabled,
  onButtonClick,
  isRequired,
  value,
  isControlled,
  iconClass,
  buttonVariant,
  hasButton,
  buttonType,
  prependText,
  hintText,
  registeredEvents,
  isPassword,
  isLeftIcon,
  isRightIcon,
  isBothIcon,
  autocomplete,
  autoFocus,
  defaultValues,
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  const customOnChange = (e) => {
    registeredEvents?.onChange?.(e);
    onChange?.(e);
  };

  const displayIconWithInput = () => {
    if (isLeftIcon && isLeftIcon == true) {
      return "with-icon left";
    } else if (isRightIcon && isRightIcon == true) {
      return "with-icon right";
    } else if (isBothIcon && isBothIcon == true) {
      return "with-icon left" + " " + "with-icon right";
    } else {
      return "";
    }
  };

  const managePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const displayIcon = () => {
    if (isPassword) {
      return (
        <i
          className={
            hidePassword ? "fas fa-eye-slash" : "fa fa-eye show-icon-in-textbox"
          }
          aria-hidden="true"
          onClick={managePasswordVisibility}
        />
      );
    }
    return null;
  };

  return (
    <Form.Group
      autocomplete={"off"}
      // className={iconClass && !onButtonClick ? 'with-icon' : ''}
      className={`${displayIconWithInput()} ${error ? "is-error" : ""}`}
      controlId={controlId}
    >
      {label && (
        <Form.Label>
          {label}
          {isRequired && <span className="required"> *</span>}
          {hintText && <span className="input-example">{hintText}</span>}
        </Form.Label>
      )}
      <InputGroup>
        {isControlled ? (
          <Form.Control
            name={name}
            placeholder={placeholder}
            ref={inputRef}
            type={isPassword && !hidePassword ? "text" : type}
            disabled={disabled}
            onChange={customOnChange}
            onBlur={onBlur}
            value={value}
            onClick={onClick}
            defaultValue={defaultValues}
            autoFocus={autoFocus}
            autocomplete={autocomplete}
            className={
              (isLeftIcon || isRightIcon || isBothIcon) && "full-radius"
            }
          />
        ) : (
          <Form.Control
            {...(registeredEvents || {})}
            // type={type}
            value={value}
            onClick={onClick}
            onChange={customOnChange}
            defaultValue={defaultValues}
            autoFocus={autoFocus}
            autocomplete={autocomplete}
            placeholder={placeholder}
            disabled={disabled}
            type={isPassword && !hidePassword ? "text" : type}
            className={
              (isLeftIcon || isRightIcon || isBothIcon) && "full-radius"
            }
          />
        )}

        {(buttonLabel || iconClass) && (
          <InputGroup.Append>
            {hasButton && (
              <Button
                disabled={isButtonDisabled}
                isLoading={isLoading}
                label={buttonLabel}
                onClick={onButtonClick}
                variant={buttonVariant}
                iconClass={iconClass}
                type={buttonType}
              />
            )}
            {!hasButton && iconClass && <i className={iconClass} />}
          </InputGroup.Append>
        )}
        {prependText && <span className="numbers">{prependText}</span>}
        {isPassword && (
          <div className="setClick showIcon input-group-prepend">
            {displayIcon()}
          </div>
        )}
      </InputGroup>
      {showError && error && (
        <Form.Text className="error-text">{error}</Form.Text>
      )}
    </Form.Group>
  );
};

export default CustomInput;
