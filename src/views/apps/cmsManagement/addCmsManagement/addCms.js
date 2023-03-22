import React, { useEffect } from "react";
import { Input } from "../../../common";
import { Form } from "react-bootstrap";
import { AddCmsData, updateCmsData, getEditCmsData } from "../../../../api/cmsManagement/cmsApi";
import toast from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import schema from '../../../../schema/cmsManagement/cmsSchema';
import { yupResolver } from "@hookform/resolvers/yup";


const AddCms = () => {

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
      title: "",
      description: ""
    },
    resolver: yupResolver(schema),
  });

  const handleNavigate = () => {
    navigate("/apps/cmsManagement");
  };

  useEffect(() => {
    getEditCmsData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let title = res?.data.data.aboutus_title
      let description = res?.data.data.aboutus_description
      reset({
        title: title || '',
        description: description || ''
      });
    })
  }, [])

  const onSubmit = (data) => {
    const body = {
      aboutus_title: data.title,
      aboutus_description: data.description
    }
    const addData = {
      aboutusTitle: data.title,
      aboutusDescription: data.description
    }
    {
      id ? (updateCmsData(id, body)
        .then((res) => {
          if (res?.data?.statusCode == 200) {
            toast((t) => (
              <ShowToast t={t} color="success" name={res?.data?.message} />
            ));
          }
          handleNavigate()
          reset();
        })
        .catch((e) => console.log("error", e))) : (AddCmsData(addData)
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
    //           placeholder="Title"
    //           label="Title "
    //           showError={true}
    //           error={errors?.title?.message}
    //           registeredEvents={register("title")}
    //           isRequired
    //         />
    //         <br></br>
    //         <br></br>
    //         <Input
    //           placeholder="Enter Description"
    //           label="Description "
    //           showError={true}
    //           error={errors?.description?.message}
    //           registeredEvents={register("description")}
    //           isRequired
    //         />
    //         <br></br>
    //         <br></br>
    //         <Button color="primary" onClick={handleSubmit(onSubmit)}>
    //           {id ? 'Update CMS' : 'Add CMS'}
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
          <span style={addCategoryStyle.modelHeader}>{'Cms Management'}</span>
        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={addCategoryStyle.modalBody}>
          <Input
            placeholder="Title"
            label="Title "
            showError={true}
            error={errors?.title?.message}
            registeredEvents={register("title")}
            isRequired
          />
          <div style={addCategoryStyle.marginStyle}>
            <Input
              placeholder="Enter Description"
              label="Description "
              showError={true}
              error={errors?.description?.message}
              registeredEvents={register("description")}
              isRequired
            />
          </div>
          <div className="buttons" style={addCategoryStyle.buttons}>
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
              {id ? 'Update CMS' : 'Add CMS'}
            </Button>
            &emsp;
            <Button type="button" onClick={handleNavigate} outline> Cancel </Button>
          </div>
        </div>
      </Form>
    </div>

  );
};

export default AddCms;