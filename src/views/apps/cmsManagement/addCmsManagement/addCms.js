import React, { useEffect, useState } from "react";
import { Description, Input } from "../../../common";
import { Form } from "react-bootstrap";
import { AddCmsData, updateCmsData, getEditCmsData } from "../../../../api/cmsManagement/cmsApi";
import toast from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";
import { Button, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import schema from '../../../../schema/cmsManagement/cmsSchema';
import { yupResolver } from "@hookform/resolvers/yup";


const AddCms = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    control,
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
    getEditCmsData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let title = res?.data.data.aboutus_title
      let description = res?.data.data.aboutus_description.replace(/<[^>]+>/g, '')
      reset({
        title: title || '',
        description: description.replace(/<[^>]+>/g, '') || ''
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

  const [isDisabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    const body = {
      aboutus_title: data.title,
      aboutus_description: data.description.replace(/<[^>]+>/g, '')
    }
    setDisabled(true);
    const addData = {
      aboutusTitle: data.title,
      aboutusDescription: data.description.replace(/<[^>]+>/g, '')
    }
    {
      id ? (updateCmsData(id, body)
        .then((res) => {
          if (res?.data?.statusCode == 200) {
            toast((t) => (
              <ShowToast t={t} color="success" name={res?.data?.message} />
            ));
          }
          setDisabled(false);
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
          <span style={modelHeader}>{id ? 'Update CMS' : 'Add CMS'}</span>
        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={modelBody}>
          <Input
            placeholder="Enter CMS Name"
            label="CMS Name"
            showError={true}
            error={errors?.title?.message}
            registeredEvents={register("title")}
            isRequired
          />
          <div style={addCategoryStyle.marginStyle}>
            {/* <Input
              placeholder="Enter Description"
              label="Description "
              showError={true}
              error={errors?.description?.message}
              registeredEvents={register("description")}
              isRequired
            /> */}
                 <Label for='task-desc' className='form-label'>
                CMS Description
              </Label>
              

              <Controller
                render={({ field }) => <Description  error={errors?.description?.message} {...field} />}
                name="description"
                control={control}
              />
          </div>
          <div className="buttons" style={addCategoryStyle.buttons}>
            <Button color="primary" onClick={handleSubmit(onSubmit)} disabled={isDisabled}>
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
