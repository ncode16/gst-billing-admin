import * as Yup from 'yup';

const login = Yup.object({
  email: Yup.string()
    .trim('Your type can’t start or end with a blank space')
    .strict(true)
    .required('This field is required.')
    .email('Enter valid email address.'),
  password: Yup.string()
    .required('This field is required.')
});

export default login;
