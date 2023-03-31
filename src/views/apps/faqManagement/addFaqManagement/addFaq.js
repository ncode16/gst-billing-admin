import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label } from "reactstrap";
import { Description, Input } from "../../../common";
import schema from "../../../../schema/faqManagement/faqSchema";
import { AddFaqData, getEditFaqData, updateFaqData } from "../../../../api/faqManagement/faqApi";
import toast from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";
import $ from 'jquery'

const AddFaq = () => {
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
      question: "",
      description: "",
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
    getEditFaqData(id).then((res) => {
      // if (res?.data?.success == true) {
      //   toast((t) => (
      //     <ShowToast t={t} color="success" name={res?.data?.message} />
      //   ));
      // }
      let question = res?.data.data.title
      let description = res?.data.data.description.replace(/<[^>]+>/g, '')

      reset({
        question: question || '',
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

  const handleNavigate = () => {
    navigate("/apps/faqManagement");
  };

  const [isDisabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    const body = {
      title: data.question,
      description: data.description.replace(/<[^>]+>/g, ''),
    };
    setDisabled(true);
    {
      id ? (updateFaqData(id, body)
        .then((res) => {
          if (res?.data?.statusCode == 200) {
            toast((t) => (
              <ShowToast t={t} color="success" name={res?.data?.message} />
            ), {
              toastId: 'update-faq'
            });
          }
          setDisabled(false);
          handleNavigate();
          reset();
        })
        .catch((e) => console.log("error", e))) : (AddFaqData(body)
          .then((res) => {
            if (res?.data?.statusCode == 200) {
              toast((t) => (
                <ShowToast t={t} color="success" name={res?.data?.message} />
              ), {
                toastId: 'update-faq'
              });
            }
            setDisabled(false);
            handleNavigate();
            reset();
          })
          .catch((e) => console.log("error", e)))
    }

  };

  const addCategoryStyle = {

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

    buttons: {
      margin: "30px 0",
      paddingBottom: "30px",
    },

    marginStyle: {
      marginTop: "20px",
    }
  }

  $(document).ready(() => {
    $(".spinner-border").css("width", "15px");
    $(".spinner-border").css("height", "15px");
  })

  return (
    <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
      <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm} onSubmit={handleSubmit(onSubmit)}>
        <div style={categoryTitle}>
          <span style={modelHeader}>{id ? 'Update FAQ' : 'Add FAQ'}</span>

        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={modelBody}>
          <Input
            placeholder="Enter FAQ Title"
            label="FAQ Title"
            showError={true}
            error={errors?.question?.message}
            registeredEvents={register("question")}
            isRequired
          />
          <div style={addCategoryStyle.marginStyle}>
            {/* <Input
              placeholder="Enter FAQ Description"
              label="FAQ Description"
              showError={true}
              error={errors?.description?.message}
              registeredEvents={register("description")}
              isRequired
            /> */}
            <Label for='task-desc' className='form-label'>
              FAQ Description
            </Label>
            <Controller
              render={({ field }) => <Description  error={errors?.description?.message} {...field} isRequired />}
              name="description"
              control={control}
            />
          </div>
          <div className="buttons" style={addCategoryStyle.buttons}>
            <Button
              label="Add FAQ"
              color="primary"
              disabled={isDisabled}
              onClick={handleSubmit(onSubmit)}
            >
              {isDisabled ? <Spinner/> : id ? 'Update FAQ' : 'Add FAQ'}
            </Button>{" "}
            &emsp;
            <Button onClick={handleNavigate} outline>
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddFaq;
