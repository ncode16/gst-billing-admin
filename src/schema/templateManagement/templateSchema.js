import * as Yup from "yup";

const templateSchema = Yup.object({
    templateImage: Yup.string().required("This field is required."),
    templateName: Yup.string().required("This field is required."),
});

export default templateSchema;

