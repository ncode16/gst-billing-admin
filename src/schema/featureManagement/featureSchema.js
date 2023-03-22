import * as Yup from "yup";

const feature = Yup.object({
  featureName: Yup.string().required("This field is required."),
});

export default feature;
