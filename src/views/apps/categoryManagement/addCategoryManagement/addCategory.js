import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../../../common";
import schema from "../../../../schema/categorySchema/categorySchema";
import { AddCategoryData, getEditCategoryData, updateCategoryData } from "../../../../api/categoryManagement/categoryManagement";
import toast from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";
import { Button, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const AddCategory = () => {
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
      categoryName: "",
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
    getEditCategoryData(id).then((res) => {
      // if (res?.data?.success == true) {
      //   toast((t) => (
      //     <ShowToast t={t} color="success" name={res?.data?.message} />
      //   ));
      // }
      let name = res?.data.data.category_name
      reset({
        categoryName: name || '',
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
    navigate("/apps/categoryManagement");
  };

  const [isDisabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    const body = {
      category_name: data.categoryName
    }
    setDisabled(true);
    {
      id ? (updateCategoryData(id, body)
        .then((res) => {
          if (res?.data?.statusCode == 200) {
            toast((t) => (
              <ShowToast t={t} color="success" name={res?.data?.message} />
            ), {
              toastId: 'update-category'
            });
          }
          setDisabled(false);
          handleNavigate()
          reset();
        })
        .catch((e) => console.log("error", e))) : (AddCategoryData(data)
          .then((res) => {
            if (res?.data?.statusCode == 200) {
              toast((t) => (
                <ShowToast t={t} color="success" name={res?.data?.message} />
              ), {
                toastId: 'add-category'
              });
            }
            setDisabled(false);
            handleNavigate()
            reset();
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
          <span style={modelHeader}>{id ? 'Update Category' : 'Add Category'}</span>

        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={modelBody}>
          <Input
            placeholder="Enter Category Name"
            label="Category Name"
            showError={true}
            error={errors?.categoryName?.message}
            registeredEvents={register("categoryName")}
            isRequired
          />

          {/* <div style={addCategoryStyle.marginStyle}>
            <Input
              placeholder="category name"
              label="Category "
              showError={true}
              error={errors?.categoryName?.message}
              registeredEvents={register("categoryName")}
              isRequired
            />
          </div> */}

          <div className="buttons" style={addCategoryStyle.buttons}>
            <Button color="primary" onClick={handleSubmit(onSubmit)} disabled={isDisabled}>
              {id ? 'Update Category' : 'Add Category'}
            </Button>
            &emsp;
            <Button type="button" onClick={handleNavigate} outline> Cancel </Button>
          </div>
        </div>
      </Form>
    </div>

  );
};

export default AddCategory;
