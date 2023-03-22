import * as Yup from "yup";

const category = Yup.object({
  categoryName: Yup.string().required("This field is required."),
});

export default category;
