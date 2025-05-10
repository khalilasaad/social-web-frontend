import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (data) => {
    try {
      axios.post("http://localhost:3001/auth/register", data).then((res) => {
        if (res.data.success) {
          toast.success("Account has been created");
          navigate("/account/login");
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(16).required(),
  });

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="border rounded p-6 w-2/3">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form autoComplete="off" className="flex flex-col gap-4">
            <label htmlFor="username">Username:</label>
            <Field
              name="username"
              autoComplete="off"
              placeholder="Enter your username"
              className="border p-2"
            />
            <ErrorMessage
              name="username"
              component="span"
              className="text-red-500 text-sm"
            />
            <label htmlFor="password">Password:</label>
            <Field
              name="password"
              autoComplete="new-password"
              type="password"
              placeholder="Enter your password"
              className="border p-2"
            />
            <ErrorMessage
              name="password"
              component="span"
              className="text-red-500 text-sm"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Sign up
            </button>
            <div className="flex gap-2">
              <p>Already have an account?</p>
              <Link
                className="text-gray-700 hover:text-gray-500 underline"
                to={"/account/login"}
              >
                Login
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
