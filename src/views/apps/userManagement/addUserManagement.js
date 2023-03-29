import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input, Switch } from "../../common";
import schema from "../../../schema/userManagementSchema/userManagement";
import { addUser, getEditUserData, updateUserData } from '../../../api/userManagement/userManagement';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ShowToast } from "../../../utility/Utils";
import { Button } from "reactstrap";
import userManagement from "../../../schema/userManagementSchema/userManagement";

import $ from 'jquery';

const AddUserManagement = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      // password: "",
    },
    resolver: yupResolver(schema),
  });

  const bodyClassName = React.useRef('');

  const [modelBody, setModelBody] = useState({
    padding: "20px 50px",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  });

  const [categoryTitle, setCategoryTitle] = useState({
      padding: "10px 0",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
  });

  const [modelHeader, setModelHeader] = useState({
      fontWeight: "500",
      marginLeft: "50px",
  });

  useEffect(() => {
    getEditUserData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let firstName = res?.data?.data?.first_name
      let lastName = res?.data?.data?.last_name
      let email = res?.data?.data?.last_name
      let mobileNumber = res?.data?.data?.mobile_number
      // let password = res?.data?.data?.password

      reset({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        mobileNumber: mobileNumber || '',
        // password: res?.data?.data?.password,
      });
    })

    const body = document.getElementsByTagName("body");
    bodyClassName.current = body[0].classList[0];

    if(bodyClassName.current === 'dark-layout'){
      setModelBody({
        background: "#283046",
        padding: "20px 50px",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      });
      setCategoryTitle({
        padding: "10px 0",
        background: "#343d55",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      })
      setModelHeader({
        color: "#fff",
        fontWeight: "500",
        marginLeft: "50px",
      })
    } else {
      setModelBody({
        background: "#fff",
        padding: "20px 50px",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      });
      setCategoryTitle({
        padding: "10px 0",
        background: "#f3f1f3",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      })
      setModelHeader({
        color: "#372f37",
        fontWeight: "500",
        marginLeft: "50px",
      })
    }

  }, [bodyClassName.current])

  const handleNavigate = () => {
    navigate("/apps/userManagement");
  };

  const [isDisabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    
    const body = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      mobile_number: data.mobileNumber
    }

    setDisabled(true);

    id ? (updateUserData(id, body)
      .then((res) => {
        if (res?.data?.statusCode == 200) {
          toast((t) => (
            <ShowToast t={t} color="success" name={res?.data?.message} />
          ));
        }
        setDisabled(false);
        handleNavigate()
        reset();
      }).catch((e) => console.log("error", e))) : (addUser(body)
      .then((res) => {
        if (res?.data?.statusCode == 200) {
          toast((t) => (
            <ShowToast t={t} color="success" name={res?.data?.message} />
          ));
        }
        setDisabled(false);
        handleNavigate()
        reset();        
      }).catch((e) => console.log("error", e)))
  };

  const addCategoryStyle = {

    categoryContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },

    categoryForm: {
      width: "50rem",
      padding: "20px 0",
    },

    buttons: {
      margin: "30px 0",
      paddingBottom: "30px",
    },

    marginStyle: {
      marginTop: "20px",
    },

    userManagement: {
      width: "100%",
      height: "100%",
    }

  }

  return (
    <>
      <div style={addCategoryStyle.userManagement}>
        <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
          <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm}>
            <div  className="abc" style={categoryTitle}>
              <span style={modelHeader}>{id ? 'Update User' : 'Add User'}</span>
            </div>
            <div className='flex-grow-1 pb-sm-0 pb-3 ' style={modelBody}>
              <Input
                placeholder="Enter First Name"
                label="First Name"
                showError={true}
                error={errors?.firstName?.message}
                registeredEvents={register("firstName")}
              />
              <div style={addCategoryStyle.marginStyle}>
                <Input
                  placeholder="Enter Last Name"
                  label="Last Name"
                  showError={true}
                  error={errors?.lastName?.message}
                  registeredEvents={register("lastName")}
                />
              </div>
              <div style={addCategoryStyle.marginStyle}>
                <Input
                  placeholder="Enter Email"
                  type="email"
                  label="Email *"
                  showError={true}
                  error={errors?.email?.message}
                  registeredEvents={register("email")}
                />
              </div>
              <div style={addCategoryStyle.marginStyle}>
                <Input
                  id="number"
                  placeholder="Enter Mobile Number"
                  type="number"
                  label="Mobile Number *"
                  showError={true}
                  error={errors?.mobileNumber?.message}
                  registeredEvents={register("mobileNumber")}
                />
              </div>
              {/* <div style={addCategoryStyle.marginStyle}>
                <Input
                  placeholder="password"
                  type="password"
                  label="Password"
                  showError={true}
                  error={errors?.password?.message}
                  registeredEvents={register("password")}
                />
              </div> */}
              <div className="buttons" style={addCategoryStyle.buttons}>
                <Button
                  color="primary"
                  type="button"
                  // disabled={isDisabled}
                  className="submitButton"
                  onClick={handleSubmit(onSubmit)}
                > {id ? 'Update User' : 'Add User'} </Button>
                &emsp;
                <Button type="button" onClick={handleNavigate} outline> Cancel </Button>
              </div>
            </div> 
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddUserManagement;
