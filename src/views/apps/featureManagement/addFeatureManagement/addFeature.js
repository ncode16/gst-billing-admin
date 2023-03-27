import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
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
    navigate("/apps/featureManagement");
  };

  const [isDisabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    const body = {
      feature_name: data.featureName
    }
    setDisabled(true);
    {
      id ? (updateFeatureData(id, body)
        .then((res) => {
          if (res?.data?.statusCode == 200) {
            toast((t) => (
              <ShowToast t={t} color="success" name={res?.data?.message} />
            ));
          }
          setDisabled(false);
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
            setDisabled(false);
            handleNavigate();
            reset()
          })
          .catch((e) => console.log("error", e)))
    }
  };

  const addCategoryStyle = {

    // categoryTitle: {
    //   padding: "10px 0",
    //   background: "#f3f1f3",
    // },

    // modelHeader: {
    //   color: "#372f37",
    //   fontWeight: "500",
    //   marginLeft: "50px",
    // },

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

    // modalBody: {
    //   background: "#fff",
    //   padding: "20px 50px",
    // },

    buttons: {
      margin: "30px 0",
      paddingBottom: "30px",
    },

    marginStyle: {
      marginTop: "20px",
    }
  }

  return (
    <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
      <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm} onSubmit={handleSubmit(onSubmit)}>
        <div style={categoryTitle}>
          <span style={modelHeader}>{id ? 'Update Feature' : 'Add Feature'}</span>
        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={modelBody}>
          <Input
            placeholder="Enter Feature Name"
            label="Feature Name"
            showError={true}
            error={errors?.featureName?.message}
            registeredEvents={register("featureName")}
            isRequired
          />
          <div style={addCategoryStyle.buttons}>
            <Button color="primary" onClick={handleSubmit(onSubmit)} disabled={isDisabled}>
              {id ? 'Update Feature' : 'Add Feature'}
            </Button>
            &emsp;
            <Button type="button" onClick={handleNavigate} outline>
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddFeature;
