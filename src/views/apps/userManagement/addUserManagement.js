import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
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

  useEffect(() => {
    getEditUserData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let firstName = res?.data?.data?.first_name
      let lastName = res?.data?.data?.last_name
      let email = res?.data?.data?.email
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
  }, [])

  const handleNavigate = () => {
    navigate("/apps/userManagement");
  };

  const onSubmit = (data) => {
    
    const body = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      mobile_number: data.mobileNumber
    }

    id ? (updateUserData(id, body)
      .then((res) => {
        if (res?.data?.statusCode == 200) {
          toast((t) => (
            <ShowToast t={t} color="success" name={res?.data?.message} />
          ));
        }
        handleNavigate()
        reset();
      }).catch((e) => console.log("error", e))) : (addUser(body)
      .then((res) => {
        if (res?.data?.statusCode == 200) {
          toast((t) => (
            <ShowToast t={t} color="success" name={res?.data?.message} />
          ));
        }
        handleNavigate()
        reset();        
      }).catch((e) => console.log("error", e)))
  };

  const addCategoryStyle = {

    categoryTitle: {
      padding: "10px 0",
      background: "#f3f1f3",
    },

    modelHeader: {
      color: "#372f37",
      fontWeight: "500",
      marginLeft: "50px",
    },

    categoryContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px"
    },

    categoryForm: {
      width: "50rem",
      padding: "20px 0",
    },

    modalBody: {
      background: "#fff",
      padding: "20px 50px",
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
      {/* <Container>
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Input
                placeholder="firstName"
                label="First Name"
                showError={true}
                error={errors?.firstName?.message}
                registeredEvents={register("firstName")}
              />
              <br></br>
              <Input
                placeholder="lastName"
                label="Last Name"
                showError={true}
                error={errors?.lastName?.message}
                registeredEvents={register("lastName")}
              />
              <br></br>
              <Input
                placeholder="email"
                type="email"
                label="Email"
                showError={true}
                error={errors?.email?.message}
                registeredEvents={register("email")}
              />
              <br></br>
              <Input
                placeholder=" mobile number"
                type="number"
                label="Mobile Number"
                showError={true}
                error={errors?.mobileNumber?.message}
                registeredEvents={register("mobileNumber")}
              />
              <br></br>
              <Input
                placeholder="password"
                type="password"
                label="Password"
                showError={true}
                error={errors?.password?.message}
                registeredEvents={register("password")}
              />
              <br></br>
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
              > Update User </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container> */}
      <div style={addCategoryStyle.userManagement}>
        <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
          <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm}>
            <div style={addCategoryStyle.categoryTitle}>
              <span style={addCategoryStyle.modelHeader}>{id ? 'Update User' : 'Add User'}</span>
            </div>
            <div className='flex-grow-1 pb-sm-0 pb-3' style={addCategoryStyle.modalBody}>
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
