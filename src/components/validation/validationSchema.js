import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be 50 characters or less")
    .required("First name is required"),

  lastname: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be 50 characters or less")
    .required("Last name is required"),

  address: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be 50 characters or less")
    .required("Address is required"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  phoneNumber: Yup.string()
  .matches(/^[/+]?[1-9][\d]{0,15}$/, "Phone number is not valid")
  .required("Number is required"),

  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Required"),

  category: Yup.string()
  .required("Please select a category"),
});


export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Must be at least 8-12 characters")
        .matches(/[a-z]+/, /[A-Z]+/, "A mix of uppercase and lowercase")
        .matches(/[@$!%*#?&]+/, "Contains special characters")
        .matches(/\d+/, "One number")
        .required("Required"),

});


export const createAccountSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be 50 characters or less")
    .required("First name is required"),

  lastname: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be 50 characters or less")
    .required("Last name is required"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
        .min(8, "Must be at least 8-12 characters")
        .matches(/[a-z]+/, /[A-Z]+/, "A mix of uppercase and lowercase")
        .matches(/[@$!%*#?&]+/, "Contains special characters")
        .matches(/\d+/, "One number")
        .required("Required"),

    terms: Yup.boolean()
    .oneOf([true], "please tick")
    .required("Required"),

});