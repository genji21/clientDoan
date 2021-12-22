import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { Input } from "reactstrap";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disable, id } = props;
  const { formState } = form;
  const { errors } = formState;
  const hasError = errors[name];

  return (
    <Controller
      control={form.control}
      name={name}
      disable={disable}
      render={({ field }) => {
        return (
          <>
            <Input
              id={id}
              className={!!hasError ? "input-error" : ""}
              type="password"
              placeholder={label}
              {...field}
            />
            <p className="error-message" {...field}>
              {errors[name]?.message}
            </p>
          </>
        );
      }}
    />
  );
}

export default PasswordField;
