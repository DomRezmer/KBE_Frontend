//styled components
import React from "react";
import axios from "axios";
import {
  //StyledTextInput,
  StyledFormArea,
  StyledFormButton,
  //StyledLabel,
  Avatar,
  StyledTitle,
  colors,
  ButtonGroup,
  ExtraText,
  TextLink,
  CopyrightText,
} from "./../components/Styles";

import Logo from "./../assets/logo.png";

// formik
import { Formik, Form } from "formik";
import { TextInput } from "../components/FromLib";
import * as Yup from "yup";

//icons
import { FiMail, FiLock, FiUser, FiCalendar } from "react-icons/fi";

const Signup = () => {
  const initialValues = {
    email: "",
    password: "",
    repeatPassword: "",
    dateOfBirth: "",
    name: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email adress").required("Required"),
    name: Yup.string().required("Required"),
    password: Yup.string()
      .min(8, "Password is too short")
      .max(30, "Password  is too long")
      .required("Required"),
    //repeatPassword: Yup.string().oneOf([Yup.ref("password"), ""], "Password must match").required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/accounts",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("Server Response: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <StyledFormArea>
        <Avatar image={Logo} />
        <StyledTitle color={colors.theme} size={30}>
          Member Signup
        </StyledTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <TextInput
                  name="name"
                  type="text"
                  label="Full Name"
                  placeholder="Peter Schmidt"
                  icon={<FiUser />}
                />
                <TextInput
                  name="email"
                  type="text"
                  label="Email Address"
                  placeholder="peterschmidt@example.gmail"
                  icon={<FiMail />}
                />
                <TextInput
                  name="dateOfBirth"
                  type="date"
                  label="Date of Birth"
                  icon={<FiCalendar />}
                />
                <TextInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="**********"
                  icon={<FiLock />}
                />

                <ButtonGroup>
                  <StyledFormButton type="submit">Signup</StyledFormButton>
                </ButtonGroup>
              </Form>
            );
          }}
        </Formik>
        <ExtraText>
          Already have an account?
          <TextLink to="/login">Login</TextLink>
        </ExtraText>
      </StyledFormArea>
      <CopyrightText>All rights reserved &copy;2023</CopyrightText>
    </div>
  );
};

export default Signup;
