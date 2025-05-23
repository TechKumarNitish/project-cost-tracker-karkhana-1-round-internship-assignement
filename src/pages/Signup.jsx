// src/Signup.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Input, Flex, Field, Heading, Text } from "@chakra-ui/react"
import { registerUser, logoutUser } from "../auth/authActions";
import { useNavigate, Link } from "react-router-dom"


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    dispatch(registerUser(email, password, navigate));
  };

  const handleLogout = async () => {
    dispatch(logoutUser(navigate))
  }

  return (
    <Flex style={{ padding: "20px" }} justify={"center"} align="center" height="100vh" width="100vw" backgroundColor="gray.100">
      <Flex direction="column" padding="20px" width="90%" maxWidth="350px" borderWidth="1px" borderRadius="8px" boxShadow="lg">
        {user ?
          <>
            <p>Alread logged in!</p>
            <Button onClick={handleLogout}>Logout</Button>
          </> :
          <>
            <Flex align={"center"} justify="center" marginBottom="20px">
              <Heading color="orange.500">Cost</Heading>
              <Heading color="blue.500">Tracker</Heading>
            </Flex>
            <form>
              <Flex gap="4" direction={"column"}>

                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                  <Field.ErrorText>This field is required</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input placeholder="Password" type="text" onChange={(e) => setPassword(e.target.value)} />
                  <Field.ErrorText>This field is required</Field.ErrorText>
                </Field.Root>

                <Button backgroundColor={"blue.500"} onClick={handleSignup}>sign Up</Button>
              </Flex>
            </form>
            <Flex gap="2" justifyContent="center" marginTop="10px">
              <Text textStyle="sm">Already have account!</Text>
              <Text textStyle="sm" color="blue.600">
                <Link to="/login">login</Link>
              </Text>
            </Flex>
          </>
        }

      </Flex>
    </Flex >
  );
}
