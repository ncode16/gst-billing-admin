import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Input } from "../../../common";
import schema from "../../../../schema/faqManagement/faqSchema";
import { AddFaqData, getEditFaqData, updateFaqData } from "../../../../api/faqManagement/faqApi";
import toast from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";

const AddFaq = () => {
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
      question: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getEditFaqData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let question = res?.data.data.title
      let description = res?.data.data.description

      reset({
        question: question || '',
        description: description || ''
      });
    })
  }, [])

  const handleNavigate = () => {
    navigate("/apps/faqManagement");
  };

  const onSubmit = (data) => {
    const body = {
      title: data.question,
      description: data.description,
    };
    {
      id ? (updateFaqData(id, body)
        .then((res) => {
          if (res?.data?.statusCode == 200) {
            toast((t) => (
              <ShowToast t={t} color="success" name={res?.data?.message} />
            ));
          }
          handleNavigate();
          reset();
        })
        .catch((e) => console.log("error", e))) : (AddFaqData(body)
          .then((res) => {
            if (res?.data?.statusCode == 200) {
              toast((t) => (
                <ShowToast t={t} color="success" name={res?.data?.message} />
              ));
            }
            handleNavigate();
            reset();
          })
          .catch((e) => console.log("error", e)))
    }

  };

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

  return (
    // <Container>
    //   <Row>
    //     <Col></Col>
    //     <Col>
    //       <Form>
    //         <Input
    //           placeholder="Enter Question"
    //           label="Add Faq "
    //           showError={true}
    //           error={errors?.question?.message}
    //           registeredEvents={register("question")}
    //           isRequired
    //         />
    //         <br></br>
    //         <Input
    //           placeholder="Enter Description"
    //           label="Description"
    //           showError={true}
    //           error={errors?.description?.message}
    //           registeredEvents={register("description")}
    //           isRequired
    //         />
    //         <br></br>
    //         <br></br>
    //         <Button
    //           label="Add FAQ"
    //           color="primary"
    //           onClick={handleSubmit(onSubmit)}
    //         >
    //           {id ? 'Update FAQ' : 'Add FAQ'}
    //         </Button>{" "}
    //         &nbsp;
    //         <Button onClick={handleNavigate} outline>
    //           Cancel
    //         </Button>
    //       </Form>
    //     </Col>
    //     <Col></Col>
    //   </Row>
    // </Container>
    <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
      <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm} onSubmit={handleSubmit(onSubmit)}>
        <div style={addCategoryStyle.categoryTitle}>
          <span style={addCategoryStyle.modelHeader}>{id ? 'Update FAQ' : 'Add FAQ'}</span>

        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={addCategoryStyle.modalBody}>
          <Input
            placeholder="Enter FAQ Title"
            label="FAQ Title"
            showError={true}
            error={errors?.question?.message}
            registeredEvents={register("question")}
            isRequired
          />
          <div style={addCategoryStyle.marginStyle}>
            <Input
              placeholder="Enter FAQ Description"
              label="FAQ Description"
              showError={true}
              error={errors?.description?.message}
              registeredEvents={register("description")}
              isRequired
            />
          </div>
          <div className="buttons" style={addCategoryStyle.buttons}>
            <Button
              label="Add FAQ"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              {id ? 'Update FAQ' : 'Add FAQ'}
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
