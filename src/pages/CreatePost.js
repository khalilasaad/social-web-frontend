import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const CreatePost = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const initialValues = {
    title: "",
    postText: "",
  };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log("success");
        navigate(-1);
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="border rounded p-6 w-2/3">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="flex flex-col gap-4">
            <label htmlFor="title">Title:</label>
            <Field name="title" className="border p-2" />
            <ErrorMessage
              name="title"
              component="span"
              className="text-red-500 text-sm"
            />

            <label htmlFor="postText">Post:</label>
            <Field name="postText" className="border p-2" />
            <ErrorMessage
              name="postText"
              component="span"
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Create Post
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreatePost;
