import { Heading, Table, Button } from "@chakra-ui/react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { fetchItems } from "../../items/itemActions"
import { deleteItemForUser } from "../../items/itemActions"
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { useState } from "react";
import Modal from "../Modal";

export default function ItemCostDisplay() {

    const { user } = useSelector(state => state.auth);
    const items = useSelector(state => state.items);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     dispatch(fetchItems(user.uid))
    // });

    const renderModal = () => {
        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <h2 className="text-xl font-bold">Hello Modal</h2>
            <p>This is a reusable modal component.</p>
        </Modal>
    }

    const handleDeleteItem = (id) => {
        dispatch(deleteItemForUser(user.uid, id))
    }
    console.log("item:", items)
    return (
        <>
            <Heading color={"blue.600"}>Item Cost</Heading>
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
                        {items.map((item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>₹{item.cost}</Table.Cell>
                                <Table.Cell textAlign="end">
                                    <Button variant="plain" size="xs" color="red.400" marginRight="5px"
                                        onClick={() => handleDeleteItem(item.id)}
                                    ><MdDeleteForever /></Button>
                                    <Button
                                        onClick={() => setOpen(true)} variant="plain" size="xs" color="green.500"><MdModeEdit /></Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        </>
    )
}
