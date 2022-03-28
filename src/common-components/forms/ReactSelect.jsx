import React from "react";
import Select from "react-select";
import { Col, FormGroup, FormText, Label } from "reactstrap";
import PropTypes from "prop-types";

const ReactSelect = ({
  className,
  error,
  helperText,
  isClearable,
  isDisabled,
  isLoading,
  isMulti,
  isRequired,
  isSearchable,
  label,
  loadingMessage,
  name,
  noOptionsMessage,
  onChange,
  onInputChange,
  options,
  value,
  setRow,
  labelsm,
  placeholder,
  defaultValue,
}) => {

  const onChangeHandler = (value) => {
    onChange && onChange(name, value);
  };

  const customStyles = {
    control: (styles, { isDisabled }) => {
      return {
        ...styles,
        cursor: isDisabled ? "not-allowed" : "default",
        opacity: 0.8,
      };
    },
  };

  return (
    <FormGroup row={setRow} className={className}>
      <Col sm={setRow && labelsm}>
        {label ? (
          <>
            <Label className="text-secondary" for={name} >{label}</Label>
            {isRequired ? <span className='text-danger'>*</span> : null}
          </>
        ) : null}
      </Col>
      <Col
        // style={{ minWidth: "250px" }}
      >
        <Select
          classNamePrefix='react_select'
          isClearable={isClearable}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isMulti={isMulti}
          isSearchable={isSearchable}
          loadingMessage={() => loadingMessage}
          name={name}
          noOptionsMessage={() => noOptionsMessage}
          onChange={onChangeHandler}
          onInputChange={onInputChange}
          options={options}
          styles={customStyles}
          value={value}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </Col>
      {helperText && <FormText color='muted'>{helperText}</FormText>}
      {error ? <span className='text-danger fs-12'>{error}</span> : null}
    </FormGroup>
  );
};

ReactSelect.defaultProps = {
  className: "",
  error: "",
  helperText: "",
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRequired: false,
  label: "",
  labelsm: 3,
  loadingMessage: "Loading...",
  noOptionsMessage: "No options",
  setRow: false,
  value: null,
  defaultValue: null
};

ReactSelect.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSearchable: PropTypes.bool,
  label: PropTypes.string,
  labelsm: PropTypes.number,
  menuPlacement: PropTypes.string,
  name: PropTypes.string.isRequired,
  noOptionsMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  setRow: PropTypes.bool,
  value: PropTypes.object,
  placeholder: PropTypes.string
};

export default ReactSelect;