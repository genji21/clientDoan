import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { AiOutlineCamera } from "react-icons/ai";
import InputField from '../../../component/formControl/inputField'
import PasswordField from '../../../component/formControl/passwordField'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import upLoadApi from "../../../api/uploadApi";
import userApi from "../../../api/userApi";
import { toast } from "react-toastify";
FormUser.propTypes = {};

function FormUser(props) {
     const tokenAccess = localStorage.getItem("accessToken");

     const user = useSelector((state) => state.user.current.user);
    const loading = useSelector((state)=>state.user.loading)
    const [modal,setModal] = useState(false)
  const {token} = props
   const [loadingImage,setLoadingImage] = useState(false)
     const PHONE_NO_REGEX = /^[0-9\- ]{8,14}$/
      const formData = new FormData();
     const changeImage = async (e) =>{
       formData.append(
         "file",
         e.target.files[0]
       );
        setLoadingImage(true)
       const data = await upLoadApi.uploadAvatar(formData, token);
        setLoadingImage(false);
     
     form.setValue("image", data.url, { shouldValidate: true });
    }
    const schema = yup.object().shape({
      name: yup.string().required("Vui lòng nhập họ tên"),
      email: yup
        .string()
        .required("Vui Lòng Nhập Email")
        .email("Please enter valid email"),
      phone: yup
        .string()
        .matches(PHONE_NO_REGEX, "Số Điện Thoại Không Đúng")
        .nullable(),
        address:yup.string().required("Không được để trống ")
    });

    const form = useForm({
      defaultValues: {
        name:"" ,
        email:"" ,
        phone: "" ,
        address: "",
        image:"",
        
      },
      resolver: yupResolver(schema),  
    });
      const { register,   } = useForm({});

    const handleSubmit = (values) =>{
      const newvalue = {...values,id:user._id}
      if (props.onSubmit) {
        props.onSubmit(newvalue)
      } 
    }
    useEffect(() => {
      if (user !== undefined) {
       
        form.reset({
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          image: user.avatar
        });
        
      }
    }, [loading]);
    
    const handleName = (name) =>{
      if (typeof name === "string"){
        const arrayName = name.split(' ')
        return arrayName[name.split(" ").length - 1];
      }
    }
    const handleModalChangePassword= () =>{
      setModal(!modal)
      formChangePass.reset()
    }



    // 
    const schemaFormChangePass = yup.object().shape({
      oldpass: yup.string().required("Nhập mật khẩu hiện tại "),
      newpass: yup
        .string()
        .required("Không được để trống")
        .min("6", "Mật Khẩu từ 6 đến 20 kí tự")
        .max(20, "Mật khẩu từ 6 đến 20 ký tự"),
      confirmPass: yup
        .string()
        .required("Không được để trống")
        .oneOf([yup.ref("newpass")], "Mật khẩu không trùng với mật khẩu trên"),
    });
    const formChangePass = useForm({
      defaultValues: {
        oldpass: "",
        newpass: "",
        confirmPass: "",
      },
      resolver: yupResolver(schemaFormChangePass),
    });
    const handleSubmitChangePass = async (values) =>{
      // if (props.onSubmitChangePass) {
       
      //   props.onSubmitChangePass(newValue);
      //   formChangePass.reset();
      //   // setModal(!modal)
      // }
      try {
         const newValue = {
           ...values,
           id: user?._id,
           password: formChangePass.getValues("newpass"),
         };
      await userApi.resetPassword(newValue, token);
      toast.success("Thay Đổi Mật Khẩu Thành Công ")
         setModal(!modal)
        formChangePass.reset()
    } catch (error) {
      toast.error(error);
      }
    }
  return (
    <div className="form-user-dashboard">
      <div className="form-user">
        <Form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="form-user-wrap">
            <FormGroup>
              <Input
                {...register("image")}
                style={{ display: "none" }}
                type="text"
              />
              <Input
                onChange={changeImage}
                id="imageUser"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
              />
              <Label htmlFor="imageUser">
                <div
                  style={{
                    backgroundColor: "none",
                    backgroundImage: `url(${form.getValues("image")})`,
                  }}
                  className="imageUser-box"
                >
                  {/* spinner */}
                  {loading || loadingImage ? (
                    <Spinner className="spinner_loading_avatar" />
                  ) : (
                    ""
                  )}
                  <span
                    style={{ display: user?.avatar !== "" ? "none" : "auto" }}
                    className="imageUser-firstLetter"
                  >
                    {handleName(user?.name)}
                  </span>
                  {/*  */}
                  <span className="imageUser-icon">
                    <AiOutlineCamera />
                  </span>
                </div>
              </Label>
            </FormGroup>
            {/* right */}
            <div className="form-user-right">
              <FormGroup>
                <Label htmlFor="name">Họ Tên</Label>
                <InputField name="name" id="name" form={form} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <InputField name="email" id="email" form={form} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Số Điện Thoại </Label>
                <InputField name="phone" id="phone" form={form} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="address">Địa Chỉ </Label>
                <InputField name="address" id="address" form={form} />
              </FormGroup>
              <FormGroup>
                <Button className="button_save">Lưu Lại</Button>
              </FormGroup>
              <FormGroup>
                <span
                  onClick={handleModalChangePassword}
                  style={{ color: "rgb(0,182,243)", cursor: "pointer" }}
                >
                  Đổi Mật Khẩu
                </span>
              </FormGroup>
            </div>
          </div>
        </Form>
      </div>
      {
        <Modal
          className="modal_changePass"
          contentClassName="content_ChangePass"
          centered
          isOpen={modal}
          toggle={handleModalChangePassword}
        >
          <ModalHeader
            className="form-header-changePassword"
            toggle={handleModalChangePassword}
          >
            Đổi Mật Khẩu
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={formChangePass.handleSubmit(handleSubmitChangePass)}
            >
              <FormGroup>
                <PasswordField
                  id="oldpass"
                  name="oldpass"
                  label="Mật Khẩu Cũ"
                  form={formChangePass}
                />
              </FormGroup>
              <FormGroup>
                <PasswordField
                  id="newpass"
                  name="newpass"
                  label="Mật Khẩu Mới"
                  form={formChangePass}
                />
              </FormGroup>
              <FormGroup>
                <PasswordField
                  id="confirmPass"
                  name="confirmPass"
                  label="Nhập Lại Mật Khẩu"
                  form={formChangePass}
                />
              </FormGroup>
              <Button block  children="Hoàn Thành" className="button_submit" >
              </Button>
            </Form>
          </ModalBody>
          
        </Modal>
      }
    </div>
  );
}

export default FormUser;
