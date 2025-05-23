import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Input, Text, Field, Flex, Heading } from "@chakra-ui/react"
import { logoutUser, loginUser } from "../redux/auth/authActions";
import { useNavigate, Link } from "react-router-dom"
import { IoArrowBackSharp } from "react-icons/io5";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    dispatch(loginUser(email, password, navigate));
  };

  const handleLogout = async () => {
    dispatch(logoutUser(navigate))
  }

  return (
    <Flex style={{ padding: "20px" }} justify={"center"} align="center" height="100vh" width="100vw" backgroundColor="gray.100">
      <Flex direction="column" padding="20px" width="90%" maxWidth="350px" borderWidth="1px" borderRadius="8px" boxShadow="lg">
        {user ?
          <>
            <Link to="/"><Text color="blue.600"><IoArrowBackSharp /></Text></Link>
            <Heading size="md" color="orange.600" marginBottom="10px" textAlign="center">Alread logged in!</Heading>
            <Button size="xs" onClick={handleLogout}>Logout</Button>
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

                <Button backgroundColor={"blue.500"} onClick={handleLogin}>Log In</Button>
              </Flex>
            </form>
            <Flex gap="2" justifyContent="center" marginTop="10px">
              <Text textStyle="sm">Don't have account!</Text>
              <Text textStyle="sm" color="blue.600">
                <Link to="/signup">signup</Link>
              </Text>
            </Flex>
          </>
        }
      </Flex>

    </Flex >
  );
}
