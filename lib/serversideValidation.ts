import * as yup from "yup";
export const signinSchema = yup.object().shape({
  email: yup.string().required().email("not a valid email"),
  password: yup.string().required(),
});

export const signupSchema = yup.object().shape({
  firstname: yup
    .string()
    .required("first name is required")
    .min(3, "user name too short"),
  email: yup
    .string()
    .required("email is required")
    .email("email must be a valid email"),
  imagurl: yup.string().url("image url must be a valid url").optional(),
  password: yup.string().required().min(6, "password too short"),
});
