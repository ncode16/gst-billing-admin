import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
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

  useEffect(() => {
    getEditCategoryData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let name = res?.data.data.category_name
      reset({
        categoryName: name || '',
      });
    })
  }, [])

  const handleNavigate = () => {
    navigate("/apps/categoryManagement");
  };

  const onSubmit = (data) => {
    const body = {
      category_name: data.categoryName
    }
    {
      id ? (updateCategoryData(id, body)
        .then((res) => {
          if (res?.data?.statusCode == 200) {
            toast((t) => (
              <ShowToast t={t} color="success" name={res?.data?.message} />
            ));
          }
          handleNavigate()
          reset();
        })
        .catch((e) => console.log("error", e))) : (AddCategoryData(data)
          .then((res) => {
            if (res?.data?.statusCode == 200) {
              toast((t) => (
                <ShowToast t={t} color="success" name={res?.data?.message} />
              ));
            }
            handleNavigate()
            reset();
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
    // <Container>
    //   <Row>
    //     <Col></Col>
    //     <Col>
    //       <Form>
    //         <Input
    //           placeholder="category name"
    //           label="Category "
    //           showError={true}
    //           error={errors?.categoryName?.message}
    //           registeredEvents={register("categoryName")}
    //           isRequired
    //         />
    //         <br></br>
    //         <br></br>
    //         <Button color="primary" onClick={handleSubmit(onSubmit)}>
    //           {id ? 'Update Category' : 'Add Category'}
    //         </Button>
    //         &nbsp;
    //         <Button type="button" onClick={handleNavigate} outline> Cancel </Button>
    //       </Form>
    //     </Col>
    //     <Col></Col>
    //   </Row>
    // </Container>
    <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
      <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm} onSubmit={handleSubmit(onSubmit)}>
        <div style={addCategoryStyle.categoryTitle}>
          <span style={addCategoryStyle.modelHeader}>{'Category Management'}</span>

        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={addCategoryStyle.modalBody}>
          <Input
            placeholder="Enter Category Name"
            label="Category Name "
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
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
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
