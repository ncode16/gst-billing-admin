import * as Yup from "yup";

const faq = Yup.object({
  question: Yup.string().required("This field is required."),
  description: Yup.string().required("This field is required."),
});

export default faq;
