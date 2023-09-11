//styled components
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
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  return (
    <div>
      <StyledFormArea>
        <Avatar image={Logo} />
        <StyledTitle color={colors.theme} size={30}>
          Member Login
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email adress")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short")
              .max(30, "Password  is too long")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const respone = await axios.post(
                "http://localhost:8080/api/v1/accounts/login",
                {
                  email: values.email,
                  password: values.password,
                }
              );

              if (respone.status === 200) {
                alert("Account exists");
              } else {
                console.log("Invalid credentials");
                alert("Invalid credentials");
              }
            } catch (error) {
              if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
              } else {
                console.log(error);
                alert("An error occured while logging in");
              }
            }
          }}
        >
          {() => (
            <Form>
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="peterschmidt@example.gmail"
                icon={<FiMail />}
              />

              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="**********"
                icon={<FiLock />}
              />
              <ButtonGroup>
                <StyledFormButton type="submit">Login</StyledFormButton>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          New here? <TextLink to="/signup">Signup</TextLink>
        </ExtraText>
      </StyledFormArea>
      <CopyrightText>All rights reserved &copy;2023</CopyrightText>
    </div>
  );
};
export default Login;
