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

  useEffect(() => {
    getTemplateEditData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let templateImage = res?.data.data.template_image
      let templateName = res?.data.data.template_name
      reset({
        templateImage: templateImage || '',
        templateName: templateName || ''
      });
    })
  }, [])




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

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('template_image', getImage);
    formData.append('template_name', data.templateName)
    console.log(formData.get('template_image'), "formData")

    {
      id ? (updateTemplateData(id, formData)
        .then((res) => {
          if (res?.data?.statusCode == 200) {
            toast((t) => (
              <ShowToast t={t} color="success" name={res?.data?.message} />
            ));
          }
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
            handleNavigate()
            reset();
          })
          .catch((e) => console.log("error", e)))
    }
  };

  return (
    <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
      <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm}>
        <div style={addCategoryStyle.categoryTitle}>
          <span style={addCategoryStyle.modelHeader}>{'Template Management'}</span>
        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={addCategoryStyle.modalBody}>
          <Input
           controlId="templateName"
            placeholder="Enter Template Name "
            label="Template Name "
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
              label={'Upload Image'}
              type={'file'}
            />
          </div>
          <div className="buttons" style={addCategoryStyle.buttons}>
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
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
