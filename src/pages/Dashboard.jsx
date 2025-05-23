import { Button, Heading, Grid, GridItem, Flex, Text } from '@chakra-ui/react'
import { logoutUser } from "../auth/authActions"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { addItemForUser, fetchItems } from "../items/itemActions"
import { addOtherCostForUser, fetchOtherCosts } from "../otherCosts/otherActions"
import AddItemCost from "../components/AddItemCost"
import AddOtherCost from "../components/AddOtherCost"
import ItemCostDisplay from "../components/ItemCostDisplay"
import OtherCostDisplay from "../components/OtherCostDisplay"



export default function Dashboard() {
    const [AddCostFormType, setAddCostFormType] = useState("ITEM");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const items = useSelector(state => state.items);
    const otherCosts = useSelector(state => state.otherCosts);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            dispatch(fetchItems(user.uid))
            dispatch(fetchOtherCosts(user.uid))
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logoutUser(navigate))
    }

    const handleAddItemCost = (itemName, itemCost) => {
        dispatch(addItemForUser(user.uid, itemName, itemCost))
    }

    const handleAddOtherCost = (description, amount) => {
        dispatch(addOtherCostForUser(user.uid, description, amount))
    }

    const calculateTotalCost = () => {
        const totalItemCost = items.reduce((acc, item) => acc + parseFloat(item.cost), 0);
        const totalOtherCost = otherCosts.reduce((acc, cost) => acc + parseFloat(cost.amount), 0);
        return totalItemCost + totalOtherCost;
    }


    return <Grid>
        <GridItem colSpan={12} padding="20px" borderBottom="1px solid rgba(225, 232, 239, 0.81)" marginBottom="40px">
            <Flex justify="space-between" maxWidth="900px" margin="auto">
                <Flex>
                    <Heading color="orange.500">Cost</Heading>
                    <Heading color="blue.500">Tracker</Heading>
                </Flex>
                <Button backgroundColor="blue.500" onClick={handleLogout}>Logout</Button>
            </Flex>
        </GridItem>

        <GridItem colSpan={12} padding="20px">
            <Flex maxWidth="400px"
                direction="column" gap="20px" boxShadow="md" padding="20px" borderRadius="10px" margin="auto">

                <Flex direction="row">
                    <Button
                        borderRadius="20px"
                        borderRightRadius="0px"
                        variant={AddCostFormType == "ITEM" ? "solid" : "outline"}
                        backgroundColor={AddCostFormType == "ITEM" ? "blue.500" : "white"}
                        color={AddCostFormType == "ITEM" ? "white" : "blue.500"}
                        onClick={() => setAddCostFormType("ITEM")}
                        size="xs"
                        width="50%"
                    >Item Cost</Button>
                    <Button
                        borderRadius="20px"
                        borderLeftRadius="0px"
                        variant={AddCostFormType == "OTHER" ? "solid" : "outline"}
                        backgroundColor={AddCostFormType == "OTHER" ? "blue.500" : "white"}
                        color={AddCostFormType == "OTHER" ? "white" : "blue.500"}
                        width="50%"
                        size="xs"
                        onClick={() => setAddCostFormType("OTHER")}>Other Cost</Button>
                </Flex>
                <Flex>
                    {
                        AddCostFormType == "ITEM" ?
                            <AddItemCost onAddCost={handleAddItemCost} /> :
                            <AddOtherCost onAddCost={handleAddOtherCost} />
                    }
                </Flex>


            </Flex>
        </GridItem>
        <GridItem colSpan={12} padding="20px">
            <Flex maxWidth="900px" margin="auto" align="center" gap="10px">
                <Text color="blue.700">Totol Cost: </Text>
                <Heading color="orange.600"> ₹ {calculateTotalCost()}</Heading>
            </Flex>
        </GridItem>

        <GridItem colSpan={12} padding="20px">
            <Flex maxWidth="900px" gap="20px"
                lg={{ flexDirection: "row" }}
                direction="column" margin="auto">
                <Flex direction="column" lg={{ width: "50%", marginBottom: "0px" }} width="100%" marginBottom={"20px"}>
                    <ItemCostDisplay />
                </Flex>
                <Flex direction="column" lg={{ width: "50%" }} width="100%">
                    <OtherCostDisplay />
                </Flex>
            </Flex>
        </GridItem>

    </Grid>

}