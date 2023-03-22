import * as Yup from "yup";

const userManagement = Yup.object({
  // firstName: Yup.string().required("This field is required."),
  // lastName: Yup.string().required("This field is required."),
  // email: Yup.string().required("This field is required."),
  // mobileNumber: Yup.string().required("This field is required."),
  mobileNumber: Yup
    .string()
    .test(
      "regex",
      "Please enter a valid phone number.",
      val => {
        let regExp = /^[0-9]{10}$/;
        let emptyString = /^$/;
        return regExp.test(parseInt(val)) || emptyString.test(val);
      }
    ),
  // password: Yup.string().required("This field is required."),
});



export default userManagement;
