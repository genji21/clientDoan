import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, Input } from "reactstrap";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};
function InputField(props) {
  const { form, name, label, disable, id, } = props;
  const { formState,control } = form;
  const { errors, touchedFields } = formState;
  const hasError = errors[name];
  return (
    <>
      <Controller
        control={form.control}
        name={name}
        invalid = {!!hasError ? true : false }
        disable={disable}
        render={({ field }) => {
          return (
            <>
              <Input
                invalid = {!!hasError  ?  true : false}
                id={id}
                className={!!hasError ? "input-error" : ""}
                placeholder={label}
                {...field}
              />
              <FormFeedback   >
                {errors[name]?.message}
              </FormFeedback>
            </>
          );
        }}
      />
    </>
  );
}
export default InputField;
