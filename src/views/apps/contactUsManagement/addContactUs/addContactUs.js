import { yupResolver } from '@hookform/resolvers/yup';
// import { Editor, EditorState } from 'draft-js';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { Button, Label } from 'reactstrap';
import { Form } from 'react-bootstrap';
import { Description, Input } from '../../../common';
import { useNavigate, useParams } from "react-router-dom";
import { getEmailData, sendEmailData } from '../../../../api/contactUs/contactUsApi'
import { toast } from 'react-hot-toast';
import { ShowToast } from '../../../../utility/Utils';
// ** Spinner (Splash Screen)
import Spinner from "../../../../@core/components/spinner/Loading-spinner";

const AddContactUs = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loader, setLoader] = useState(false);

  // const [desc, setDesc] = useState(EditorState.createEmpty())
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

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
      email: '',
      description: "",
    },
    // resolver: yupResolver(schema),
  });


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
    }
  }

  useEffect(() => {
    getEmailData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let name = res?.data.data.contact_email
      reset({
        email: name || '',
      });
    })
  }, [])

  const handleNavigate = () => {
    navigate("/apps/contactUsManagement");
  };


  const onSubmit = (data) => {
    sendEmailData(data).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      handleNavigate()
      reset();
    })
  }

  return (
    <div>
     
      <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
      <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm} onSubmit={handleSubmit(onSubmit)}>
        <div style={addCategoryStyle.categoryTitle}>
          <span style={addCategoryStyle.modelHeader}>Send Email</span>
        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={addCategoryStyle.modalBody}>
        <Input
              placeholder="Enter Contact Email "
              label="Contact Email"
              showError={true}
              error={errors?.email?.message}
              registeredEvents={register("email")}
              isRequired
              is
            />
            <div style={addCategoryStyle.marginStyle}>
            <Label for='task-desc' className='form-label'>
                Contact Description
              </Label>


              <Controller
                render={({ field }) => <Description  {...field} />}
                name="description"
                control={control}
              />
            </div>
            <div style={addCategoryStyle.buttons}>
            <Button onClick={handleSubmit(onSubmit)} color="primary">
                Send Email
              </Button>
              &emsp;
              <Button type="button" onClick={handleNavigate} outline> Cancel </Button>
            </div>
        </div>
        </Form>
        </div>
  

    </div>
  )
}

export default AddContactUs
