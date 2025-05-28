import { Heading, Table, Button, Input } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { deleteItemForUser } from "../../redux/items/itemActions"
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { useState } from "react";
import Modal from "../Modal";
import { updateItemForUser } from "../../redux/items/itemActions";
import { apiStatusConstants } from "../../apiStatusConstant";
import { toaster } from "../ui/toaster";
import { BeatLoader } from "react-spinners"

export default function ItemCostDisplay() {

    const placeholder = {
        titlePlaceholder: "Item Name",
        amountPlaceholder: "Item Cost"
    }

    const { user } = useSelector(state => state.auth);
    const items = useSelector(state => state.items);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [itemName, setItemName] = useState("");
    const [itemCost, setItemCost] = useState(0);
    const [sortOrder, setSortOrder] = useState(0);
    const [status, setStatus] = useState(apiStatusConstants.initial);

    const updateApiStatus = (path) => (newStatus, newMsg) => {
        setStatus(newStatus);
        toaster.create({
            title: newMsg,
            type: newStatus.toLowerCase(),
            duration: 1000,
        });
        if (path && newStatus === apiStatusConstants.success)
            navigate(path);
    }

    const handleDeleteItem = (id) => {
        dispatch(deleteItemForUser(user.uid, id, updateApiStatus(null)))
    }

    const handleEdit = (item) => {
        setItemName(item.name);
        setItemCost(item.cost);
        setId(item.id);
        setOpen(true);
    }

    const updateHanlder = (e) => {
        e.preventDefault();
        setStatus(apiStatusConstants.loading);
        dispatch(updateItemForUser(user.uid, id, { name: itemName, cost: itemCost }, setOpen, updateApiStatus(null)));
    }

    const sortData = (items) => {
        return [...items].sort((a, b) => sortOrder == 0 ? a.cost - b.cost : b.cost - a.cost)

    }

    return (
        <>
            <Heading color={"blue.600"}>Item Cost</Heading>
            <Table.ScrollArea borderWidth="1px" rounded="md" maxHeight="500px">
                <Table.Root size="sm" stickyHeader>
                    <Table.Header>
                        <Table.Row bg="bg.subtle">
                            <Table.ColumnHeader color="blue.500">Item Name</Table.ColumnHeader>
                            <Table.ColumnHeader color="blue.500">Cost</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end">
                                <Button variant="plain" size="sm" onClick={() => setSortOrder(prev => !prev)}>
                                    {sortOrder == 0 ? <GoSortAsc /> : <GoSortDesc />}
                                </Button>
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {items && sortData(items).map((item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>₹{item.cost}</Table.Cell>
                                <Table.Cell textAlign="end">
                                    <Button variant="plain" size="xs" color="red.400" marginRight="5px"
                                        onClick={() => handleDeleteItem(item.id)}
                                    ><MdDeleteForever /></Button>
                                    <Button
                                        onClick={() => { handleEdit(item) }} variant="plain" size="xs" color="green.500"><MdModeEdit /></Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <Heading color="orange.600" margin="5px">Update Cost</Heading>
                <form onSubmit={updateHanlder} >
                    <Input
                        marginBottom="10px"
                        type="text" placeholder={placeholder.titlePlaceholder} name="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    <Input marginBottom="10px"
                        type="number" placeholder={placeholder.amountPlaceholder}
                        name="itemCost" value={itemCost} onChange={(e) => setItemCost(e.target.value)} />
                    <Button
                        type="submit" variant="subtle" color="blue.500" backgroundColor="blue.100" size="xs"
                        loading={apiStatusConstants.loading == status}
                        disabled={apiStatusConstants.loading == status}
                        spinner={<BeatLoader size={8} color="white" />}>
                        Update
                    </Button>

                </form>
            </Modal>
        </>
    )
}
