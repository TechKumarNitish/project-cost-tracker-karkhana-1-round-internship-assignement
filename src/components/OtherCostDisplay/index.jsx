import { Heading, Table, Button } from "@chakra-ui/react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { deleteOtherCostForUser } from "../../otherCosts/otherActions"
import { MdDeleteForever, MdModeEdit  } from "react-icons/md";

export default function OtherCostDisplay() {

    const { user } = useSelector(state => state.auth);
     const otherCosts = useSelector(state => state.otherCosts);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchItems(user.uid))
    // });

    const handleDeleteItem = (id) => {
        dispatch(deleteOtherCostForUser(user.uid, id))
    }
    console.log("item:",otherCosts)
    return (
        <>
            <Heading color={"blue.600"}>Other Cost</Heading>
            <Table.ScrollArea borderWidth="1px" rounded="md" maxHeight="500px">
                <Table.Root size="sm" stickyHeader>
                    <Table.Header>
                        <Table.Row bg="bg.subtle">
                            <Table.ColumnHeader color="blue.500">Item Name</Table.ColumnHeader>
                            <Table.ColumnHeader color="blue.500">Cost</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {otherCosts.map((item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.description}</Table.Cell>
                                <Table.Cell>₹{item.amount}</Table.Cell>
                                <Table.Cell textAlign="end">
                                    <Button variant="plain" size="xs" color="red.500" marginRight="5px"
                                        onClick={()=>handleDeleteItem(item.id)}
                                    ><MdDeleteForever/></Button>
                                    <Button variant="plain" size="xs" color="green.500"><MdModeEdit /></Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        </>
    )
}
