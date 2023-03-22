import * as Yup from "yup";

const tutorial = Yup.object({
  title: Yup.string().required("This field is required."),
  link: Yup.string().required("This field is required."),
});

export default tutorial;
