import React, { useEffect, useState } from "react";
import { Input } from "../../../common";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from '../../../../schema/templateManagement/templateSchema';
import { updateTemplateData, AddTemplateData, getTemplateEditData } from "../../../../api/templateManagement/template";
import { Button } from "reactstrap";
import { toast } from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";


const AddTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [getImage, setImage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      templateImage: "",
      templateName: ""
    },
    resolver: yupResolver(schema),
  });

  const handleNavigate = () => {
    navigate("/apps/templateManagement");
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
    getTemplateEditData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let templateImage = res?.data.data.template_image
      let templateName = res?.data.data.template_name

      // let image_name = templateImage.split("/");
      // let image_size= templateImage.split("/").length;

      reset({
        templateImage: templateImage || '',
        templateName: templateName || ''
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


  const imageUploader = async (e) => {
    console.log(e.target.files[0], "eee")


    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      setImageValidation(
        "Uploaded file is not a valid image. Only PNG, JPG and JPEG files are allowed"
      );
      setImage("");
      return false;
    } else {
      const base64 = await convertBase64(file);
      // setShowImage(base64);
      // setImage(e.target.files[0]);
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
    const formData = new FormData();
    formData.append('template_image', getImage);
    formData.append('template_name', data.templateName)
    console.log(formData.get('template_image'), "formData")
    setDisabled(true);

    {
      id ? (updateTemplateData(id, formData)
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
        .catch((e) => console.log("error", e))) : (AddTemplateData(formData)
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

  return (
    <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
      <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm}>
        <div style={categoryTitle}>
          <span style={modelHeader}>{id ? 'Update Template' : 'Add Template'}</span>
        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={modelBody}>
          <Input
           controlId="templateName"
            placeholder="Enter Template Title"
            label="Template Title"
            showError={true}
            error={errors?.templateName?.message}
            registeredEvents={register("templateName")}
            isRequired
          />
   
          <div style={addCategoryStyle.marginStyle}>
            {/* <Input
              placeholder="Image"
              label="Image "
              type={"file"}
              showError={true}
              error={errors?.templateImage?.message}
              registeredEvents={register("templateImage")}
              isRequired
            /> */}
            <Input
              controlId="templateImage"
              error={errors?.templateImage?.message}
              onClick={(event) => {
                event.target.value = null;
              }}
              showError={true}
              registeredEvents={register('templateImage')}
              // isControlled
              isRequired={true}
              // accept="image/*"
              accept="image/png, image/jpg, image/jpeg"
              // onChange={(e) => {
              //   if (e.target.files.length > 0) {
              //     var imageType = /image.*/;
              //     if (e.target.files[0].type.match(imageType)) {
              //       setValue('templateImage', e.target.files[0].name, {
              //         shouldValidate: true,
              //       });

              //       // setUploadImage({ uploadedImage: URL.createObjectURL(
              //       //   e.target.files[0],
              //       // ),})
              //       setUploadImage(e.target.files[0])
              //       setValue('img', e.target.files[0], {
              //         shouldValidate: true,
              //       });
              //     } else {
              //       // showToast(fileUploadedValidation);
              //     }
              //   }
              // }}
              onChange={imageUploader}
              placeholder={'Upload Image'}
              label={'Template Image'}
              type={'file'}
            />
          </div>
          <div className="buttons" style={addCategoryStyle.buttons}>
            <Button color="primary" onClick={handleSubmit(onSubmit)} disabled={isDisabled}>
              {id ? 'Update Template' : 'Add Template'}
            </Button>
            &emsp;
            <Button type="button" onClick={handleNavigate} outline> Cancel </Button>
          </div>
        </div>
      </Form>
    </div>

  );
};

export default AddTemplate;
