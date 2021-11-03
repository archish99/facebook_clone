import React, { useState } from "react";
import { useColorModeValue, useColorMode } from "@chakra-ui/color-mode";
import {
  Box,
  Flex,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { FiMoon } from "react-icons/fi";
import { BsSun, BsFacebook } from "react-icons/bs";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { LOGIN, SIGNUP } from "../../graphql/mutation/mutation";
import { setUserDetails } from "../../redux/userSlice/userSlice";

const LoginSignUp = () => {
  const bg = useColorModeValue("#fff", "#18191A");
  const formBg = useColorModeValue("#fff", "#242526");
  const headingColor = useColorModeValue("#14A0F9", "#fff");

  const toast = useToast();

  const history = useHistory();
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const [login] = useMutation(LOGIN);
  const [signup] = useMutation(SIGNUP);

  const loginSignUpFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    onSubmit: async (values, helpers) => {
      console.log({ ...values });
      setIsLoading(true);
      if (isSignUp) {
        // Sign up the user
        if (values.confirmPassword !== values.password) {
          setIsLoading(false);
          return toast({
            title: "Password and Confirm password must match",
            status: "error",
            duration: 1000,
          });
        }

        try {
          const signUpData = await signup({
            variables: { ...values },
          });
          console.log(signUpData.data.register);
          toast({
            title: "Signed up successfully",
            description: "Redirecting you to home",
            status: "success",
            duration: "1000",
          });
          localStorage.setItem("token", signUpData?.data?.register?.token);
          setTimeout(() => {
            history.push("/");
            dispatch(
              setUserDetails({
                username: signUpData?.data?.register?.username,
                email: signUpData?.data?.register?.email,
                id: signUpData?.data?.register?.id,
              })
            );
          }, 1200);
        } catch (err) {
          toast({
            title: "Error signing up",
            description: "Try after a while",
            status: "error",
            duration: "1000",
          });
          console.log(err);
        }
      } else {
        // Login
        const { username, password } = values;
        try {
          const loginData = await login({ variables: { username, password } });
          console.log(loginData.data.login);
          toast({
            title: "Logged in successfully",
            description: "Redirecting you to home",
            status: "success",
            duration: "1000",
          });
          localStorage.setItem("token", loginData?.data?.login?.token);
          setTimeout(() => {
            history.push("/");
            dispatch(
              setUserDetails({
                username: loginData?.data?.login?.username,
                email: loginData?.data?.login?.email,
                id: loginData?.data?.login?.id,
              })
            );
          }, 1200);
        } catch (err) {
          toast({
            title: "Error logging in",
            description: "Try after a while",
            status: "error",
            duration: "1000",
          });
          console.log(err);
        }
      }
      helpers.resetForm();
      setIsLoading(false);
    },
  });

  const { values, handleBlur, handleChange, handleSubmit, setFieldValue } =
    loginSignUpFormik;

  return (
    <VStack bg={bg} h="100vh" p="20px">
      <Flex w="100%" justifyContent="space-between">
        <Icon as={BsFacebook} mr="10px" fontSize="40px" fill="#14A0F9" />
        <Button
          fontSize="25px"
          borderRadius="50%"
          p="0"
          onClick={toggleColorMode}
        >
          <Icon as={colorMode === "dark" ? BsSun : FiMoon} />
        </Button>
      </Flex>
      <Flex alignItems="center" justifyContent="center" w="100%" h="100%">
        <Box
          w={{
            xl: "25%",
            lg: "27%",
            md: "35%",
            sm: "45%",
            xs: "60%",
            xxs: "95%",
          }}
        >
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <VStack
              bg={formBg}
              p="20px"
              borderRadius="10px"
              spacing={4}
              boxShadow="0 2px 4px rgba(0, 0, 0, .25)"
            >
              <Heading color={headingColor}>
                {isSignUp ? "Sign Up" : "Login"}
              </Heading>
              <FormControl isRequired p="2px">
                <FormLabel>User Name</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              {isSignUp ? (
                <FormControl isRequired p="2px">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
              ) : null}
              <FormControl isRequired p="2px">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              {isSignUp ? (
                <FormControl
                  isRequired
                  p="2px"
                  isInvalid={
                    values.confirmPassword?.length > 0 &&
                    values.password !== values.confirmPassword
                  }
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>
                    Password and confirm password do not match
                  </FormErrorMessage>
                </FormControl>
              ) : null}
              <HStack w="100%" justifyContent="space-between">
                <Button isLoading={isLoading} type="submit">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setFieldValue("username", "");
                    setFieldValue("password", "");
                  }}
                >
                  {isSignUp ? "Login" : "Sign Up"}
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </Flex>
    </VStack>
  );
};

export default LoginSignUp;
