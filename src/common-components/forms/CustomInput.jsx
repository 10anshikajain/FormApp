import React from "react";
import { FormGroup, FormText, Input, Label, Col } from "reactstrap";
import PropTypes from "prop-types";
import { getRegExp, getSentenceFromCamelCase } from "../../utils/Helper";

const CustomInput = ({
    checked,
    className,
    disabled,
    error,
    fixLength,
    helperText,
    isRequired,
    label,
    minLength,
    maxLength,
    name,
    onChange,
    placeholder,
    reqType,
    setRow,
    style,
    type,
    validationHandler,
    value,
    labelsm,
}) => {
    const onChangeHandler = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === "checkbox" ? checked : value;
        onChange && onChange(name, inputValue);
    };

    const onValidationChange = (event) => {
        if (!validationHandler) return;
        const { value } = event.target;
        let errorMessage = "";
        if (!value && isRequired) {
            errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
        } else if (minLength && value.length < minLength) {
            errorMessage = `${name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
                } must be at least ${minLength} characters long.`;
        } else if (maxLength && value.length > maxLength) {
            errorMessage = `${name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
                } must be ${minLength} characters long.`;
        } else if (fixLength && value.length !== fixLength) {
            errorMessage = `${name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
                } must be ${fixLength} characters.`;
        } else if (value && reqType && !getRegExp(reqType).test(value)) {
            errorMessage = `Please enter valid ${getSentenceFromCamelCase(name)}.`;
        }
        validationHandler(name, errorMessage);
    };

    return (
        <FormGroup row={setRow} className={className}>
            {label ? <Col sm={setRow && labelsm}>
                <Label for={name} className="text-secondary">{label}</Label>
                {isRequired ? <span className='text-danger'>*</span> : null}
            </Col>
                : null}
            <Col>
                <Input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    checked={checked}
                    placeholder={placeholder}
                    style={style}
                    disabled={disabled}
                    onChange={onChangeHandler}
                    onBlur={onValidationChange}
                />
            </Col>
            {helperText && <FormText color='muted'>{helperText}</FormText>}
            {error ? <span className='text-danger fs-12'>{error}</span> : null}
        </FormGroup>
    );
};

CustomInput.defaultProps = {
    checked: false,
    className: "",
    disabled: false,
    error: "",
    fixLength: 0,
    helperText: "",
    isRequired: false,
    label: "",
    labelsm: 3,
    minLength: 0,
    maxLength: 0,
    placeholder: "",
    reqType: "",
    setRow: false,
    style: {},
    type: "text",
    validationHandler: () => { },
};

CustomInput.propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    fixLength: PropTypes.number,
    helperText: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    labelsm: PropTypes.number,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    reqType: PropTypes.string,
    setRow: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.string,
    validationHandler: PropTypes.func,
    value: PropTypes.any.isRequired,
};

export default CustomInput;