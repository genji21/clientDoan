import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import InputField from "../../../component/formControl/inputField";
import PasswordField from "../../../component/formControl/passwordField";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ContainerLoading from "../../../util/loading";

RegisterForm.propTypes = {};

function RegisterForm(props) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter email")
      .email("Please enter valid email"),
    password: yup
      .string()
      .required("Please enter password")
      .min(6, "Mật Khẩu Phải Từ 6 đến 10 kí tự")
      .max(10, "Mật Khẩu Phải Từ 6 đến 10 kí tự"),
    name: yup
      .string()
      .required("Please enter your full name")
      .test(
        "should have at least two word",
        "Please enter at least two word",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),
    retypepassword: yup
      .string()
      .required("Please retype password")
      .oneOf([yup.ref("password")], "password does not match"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      retypepassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handlesubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };
  const { isSubmitting } = form.formState;
  return (
    <>
      {isSubmitting ? <ContainerLoading /> : ""}
      <Form
        onSubmit={form.handleSubmit(handlesubmit)}
        className="form form_login"
      >
        <FormGroup>
          <Label for="emailSignup" className="login_label">
            email
          </Label>
          <InputField id="emailSignup" form={form} name="email" label="email" />
        </FormGroup>
        <FormGroup>
          <Label for="fullname" className="login_label">
            fullname
          </Label>
          <InputField id="fullname" form={form} name="name" label="FullName" />
        </FormGroup>
        <FormGroup>
          <Label for="passwordSignup" className="login_label">
            password
          </Label>
          <PasswordField
            id="passwordSignup"
            form={form}
            name="password"
            label="password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="retypePassword" className="login_label">
            retypepassword
          </Label>
          <PasswordField
            id="retypePassword"
            form={form}
            name="retypepassword"
            label="password"
          />
        </FormGroup>

        <Button type="submit">Test</Button>
      </Form>
    </>
  );
}

export default RegisterForm;
