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
  const [getImage, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState('');

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
      image: "",
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
      // if (res?.data?.success == true) {
      //   toast((t) => (
      //     <ShowToast t={t} color="success" name={res?.data?.message} />
      //   ));
      // }
      
      console.log(res);
      let title = res?.data?.data?.cms_title
      let image = res?.data.data.cms_image
      let description = res?.data.data.cms_description
      setPreviewImage(image);

      reset({
        title: title || '',
        image: image || '',
        description: description || ''
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

  

  const imageUploader = async (e) => {

    setImage(e.target.files[0]);
    const file = e.target.files[0];
    
    if (file.name.match(/\.(jpg|jpeg|png)$/)) { 
      const base64 = await convertBase64(file); 
      setImage(e.target.files[0]);
      
    } else {
      setImageValidation(
        "Uploaded file is not a valid image. Only PNG, JPG and JPEG files are allowed"
      );
      setImage("Invalid Image");
      return false;
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [isDisabled, setDisabled] = useState(false);
  const onSubmit = (data) => {
    console.log('dasdasd', data)
    const formData = new FormData();
    formData.append('cms_image', getImage);
    formData.append('cms_title', data.title);
    formData.append('cms_description', data.description.replace(/<[^>]+>/g, ''));
    // console.log(formData.get('cms_image'), "formData")
    setDisabled(true);
    setPreviewImage('');
    {
      id ? (updateCmsData(id, formData)
      .then((res) => {
        if (res?.data?.statusCode == 200) {
          toast((t) => (
            <ShowToast t={t} color="success" name={res?.data?.message} />
            ), {
              toastId: 'update-cms'
            });
          }
          setDisabled(false);
          handleNavigate()
          reset();
        })
        .catch((e) => console.log("error", e))) : (AddCmsData(formData)
        .then((res) => {
            if (res?.data?.statusCode == 200) {
              toast((t) => (
                <ShowToast t={t} color="success" name={res?.data?.message} />
              ), {
                toastId: 'add-cms'
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

  const previewContainer = {
    marginTop: '15px',
    height: '120px',
  }

  const imagePreview = {
    width: '50%',
    height: '100%'
  }
  
  const img = {
    width: '100%',
    height: '100%',
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
            <br></br>
            <Input
              controlId="cmsImage"
              error={errors?.cmsImage?.message}
              onClick={(event) => {
                event.target.value = null;
              }}
              showError={true}
              registeredEvents={register('image')}
              isRequired={true}
              accept="image/png, image/jpg, image/jpeg"
              onChange={imageUploader}
              placeholder={'Upload Image'}
              label={'CMS Image'}
              type={'file'}
            />
            { previewImage ?
              <div style={previewContainer}>
                <div style={imagePreview}>
                  <img style={img} src={previewImage} alt="preview.jpg" />
                </div>
              </div> : <></>
            }
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
