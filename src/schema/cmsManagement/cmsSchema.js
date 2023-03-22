import * as Yup from "yup";

const cms = Yup.object({
    title: Yup.string().required("This field is required."),
    description: Yup.string().required("This field is required.")
});

export default cms;