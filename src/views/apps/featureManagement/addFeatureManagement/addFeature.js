import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../../../common";
import schema from "../../../../schema/featureManagement/featureSchema";
import { AddFeatureData, getEditFeatureData, updateFeatureData } from "../../../../api/featureManagement/featureApi";
import toast from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const AddFeature = () => {
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
      featureName: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getEditFeatureData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let featureName = res?.data.data.feature_name
      reset({
        featureName: featureName || '',
      });
    })
  }, [])

  const handleNavigate = () => {
    navigate("/apps/featureManagement");
  };

  const onSubmit = (data) => {
    const body = {
      feature_name: data.featureName
    }
    {
      id ? (updateFeatureData(id, body)
        .then((res) => {
          if (res?.data?.statusCode == 200) {
            toast((t) => (
              <ShowToast t={t} color="success" name={res?.data?.message} />
            ));
          }
          handleNavigate();
          reset();
        })
        .catch((e) => console.log("error", e))) : (AddFeatureData(data)
          .then((res) => {
            if (res?.data?.statusCode == 200) {
              toast((t) => (
                <ShowToast t={t} color="success" name={res?.data?.message} />
              ));
            }
            handleNavigate();
            reset()
          })
          .catch((e) => console.log("error", e)))
    }
  };

  const addCategoryStyle = {

    categoryTitle: {
      padding: "10px 0",
      background: "#A7A2A2",
      border: "1px solid #A7A2A2",
    },

    modelHeader: {
      color: "#fff",
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
    }
  }

  return (
    // <div>
    //   <Container>
    //     <Row>
    //       <Col></Col>
    //       <Col>
    //         <Form>
    //           <Input
    //             placeholder="feature name"
    //             label="Feature"
    //             showError={true}
    //             error={errors?.featureName?.message}
    //             registeredEvents={register("featureName")}
    //             isRequired
    //           />
    //           <br></br>
    //           <br></br>
    //           <Button color="primary" onClick={handleSubmit(onSubmit)}>
    //             Add Feature
    //           </Button>
    //           &nbsp;
    //           <Button type="button" onClick={handleNavigate} outline>
    //             Cancel
    //           </Button>
    //         </Form>
    //       </Col>
    //       <Col></Col>
    //     </Row>
    //   </Container>
    // </div>
    <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
      <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm} onSubmit={handleSubmit(onSubmit)}>
        <div style={addCategoryStyle.categoryTitle}>
          <span style={addCategoryStyle.modelHeader}>{'Feature Management'}</span>
        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={addCategoryStyle.modalBody}>
          <Input
            placeholder="Enter Feature Name"
            label="Feature"
            showError={true}
            error={errors?.featureName?.message}
            registeredEvents={register("featureName")}
            isRequired
          />
        </div>
        <div style={addCategoryStyle.marginStyle}>
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            Add Feature
          </Button>
          &emsp;
          <Button type="button" onClick={handleNavigate} outline>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddFeature;
