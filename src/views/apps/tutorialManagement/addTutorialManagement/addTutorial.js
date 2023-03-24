import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AddTutorialData, getCategoryDropdownData, getEditTutorialData, updateTutorialData } from "../../../../api/tutorialManagement/tutorialApi";
import { Input, Dropdown } from "../../../common";
import schema from "../../../../schema/tutorialSchema/tutorial";
import { Button } from "reactstrap";
import { formatDropdownData, ShowToast } from "../../../../utility/Utils";
import { toast } from "react-hot-toast";

const AddTutorial = () => {
  const [categoryData, setCategoryData] = useState([]);

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
      link: "",
      categoryId: "",
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
    getCategoryDropdownData().then((res) => {
      if (res?.data?.success == true) {
        setCategoryData(res?.data?.data)
      }
    })
    getEditTutorialData(id).then((res) => {
      if (res?.data?.success == true) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      let categoryId = res?.data.data.category_name
      let tutorialTitle = res?.data.data.tutorial_title
      let tutorialLink = res?.data.data.tutorial_link
      reset({
        categoryId: categoryId || '',
        title: tutorialTitle || '',
        link: tutorialLink || '',
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

  const options = formatDropdownData(categoryData, 'category_id', 'category_name')

  const handleNavigate = () => {
    navigate("/apps/tutorialManagement");
  };

  const onSubmit = (data) => {

    const body = {
      tutorialTitle: data.title,
      tutorialLink: data.link,
      categoryId: data.categoryId.value,
    };

    const updateBody = {
      tutorial_link: data.link,
      tutorial_title: data.title,
      category_id: data.categoryId.value
    }

    {
      id ? (
        updateTutorialData(id, updateBody)
          .then((res) => {
            if (res?.data?.statusCode == 200) {
              toast((t) => (
                <ShowToast t={t} color="success" name={res?.data?.message} />
              ));
            }
            handleNavigate();
            reset();
          })
          .catch((e) => console.log("error", e))) : (
        AddTutorialData(body)
          .then((res) => {
            if (res?.data?.statusCode == 200) {
              toast((t) => (
                <ShowToast t={t} color="success" name={res?.data?.message} />
              ));
            }
            handleNavigate();
            reset()
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
    },
  }

  return (
    <div className='addCategoryContainer' style={addCategoryStyle.categoryContainer}>
      <Form id='form-modal-todo' className='todo-modal' style={addCategoryStyle.categoryForm} onSubmit={handleSubmit(onSubmit)}>
        <div style={categoryTitle}>
          <span style={modelHeader}>{id ? 'Update Tutorial' : 'Add Tutorial'}</span>
        </div>
        <div className='flex-grow-1 pb-sm-0 pb-3' style={modelBody}>
          <Controller
            name="categoryId"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <Dropdown
                    showError={true}
                    error={errors?.categoryId?.message}
                    label={"Select Category"}
                    id="categoryId"
                    defaultValue={value}
                    closeMenuOnSelect={true}
                    selected={value}
                    value={value}
                    options={options || []}
                    onChange={onChange}
                    isRequired
                  />
                </div>
              );
            }}
          />

          <div style={addCategoryStyle.marginStyle}>
            <Input
              placeholder="Enter Tutorial Title"
              label="Tutorial Title"
              showError={true}
              error={errors?.title?.message}
              registeredEvents={register("title")}
              isRequired
            />
          </div>
          <div style={addCategoryStyle.marginStyle}>
            <Input
              placeholder="Enter Tutorial Link"
              label="Tutorial Link"
              showError={true}
              error={errors?.link?.message}
              registeredEvents={register("link")}
              isRequired
            />
          </div>
          <div className="buttons" style={addCategoryStyle.buttons}>
            <Button onClick={handleSubmit(onSubmit)} color="primary">
              {id ? 'Update Tutorial' : 'Add Tutorial'}
            </Button>
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

export default AddTutorial;
