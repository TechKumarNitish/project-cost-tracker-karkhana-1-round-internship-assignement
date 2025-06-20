import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Input, Text, Field, Flex, Heading } from "@chakra-ui/react"
import { logoutUser, loginUser } from "../redux/auth/authActions";
import { useNavigate, Link } from "react-router-dom"
import { IoArrowBackSharp } from "react-icons/io5";
import { BeatLoader } from "react-spinners"
import { apiStatusConstants } from "../apiStatusConstant";
import { toaster } from "../components/ui/toaster";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(apiStatusConstants.initial);

  const updateApiStatus=(path)=>(newStatus, newMsg)=>{
    setStatus(newStatus);
    toaster.create({
      title: newMsg,
      type:newStatus.toLowerCase(),
      duration: 2000,
    });
    if(newStatus === apiStatusConstants.success) 
    navigate(path );
  }

  const handleLogin = async () => {
    setStatus(apiStatusConstants.loading);
    dispatch(loginUser(email, password, updateApiStatus("/")));
  };

  const handleLogout = async () => {
    dispatch(logoutUser(updateApiStatus("/login")));
  }

  return (
    <Flex style={{ padding: "20px" }} justify={"center"} align="center" height="100vh" width="100vw" backgroundColor="gray.1">
      <Flex direction="column" padding="20px" width="90%" maxWidth="350px" borderWidth="1px" borderRadius="8px" boxShadow="lg">
        {user ?
          <>
            <Link to="/"><Text color="blue.600"><IoArrowBackSharp /></Text></Link>
            <Heading size="md" color="orange.600" marginBottom="10px" textAlign="center">Alread logged in!</Heading>
            <Button size="xs" onClick={handleLogout}>Logout</Button>
          </> :
          <>

            <Flex align={"center"} justify="center" marginBottom="20px">
              <Heading color="orange.500"><Link to="/">Cost</Link></Heading>
              <Heading color="blue.500"><Link to="/">Tracker</Link></Heading>
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

                <Button loading={apiStatusConstants.loading==status} disabled={apiStatusConstants.loading==status} backgroundColor={"blue.500"} onClick={handleLogin} spinner={<BeatLoader size={8} color="white" />}>Log In</Button>
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
