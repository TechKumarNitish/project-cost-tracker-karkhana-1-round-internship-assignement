import { Heading, Table, Button, Input } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteOtherCostForUser } from "../../redux/otherCosts/otherActions"
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import Modal from "../Modal";
import { updateOtherCostForUser } from "../../redux/otherCosts/otherActions";

export default function OtherCostDisplay() {

    const placeholder = {
        titlePlaceholder: "Description",
        amountPlaceholder: "Amount"
    }

    const { user } = useSelector(state => state.auth);
    const otherCosts = useSelector(state => state.otherCosts);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [sortOrder, setSortOrder] = useState(0);

    const handleDeleteItem = (id) => {
        dispatch(deleteOtherCostForUser(user.uid, id))
    }

    const handleEdit = (item) => {
        setDescription(item.description);
        setAmount(item.amount);
        setId(item.id);
        setOpen(true);
    }

    const updateHanlder = (e) => {
        e.preventDefault();
        dispatch(updateOtherCostForUser(user.uid, id, { description, amount }, setOpen));
    }

    const sortData = (items) => {
        return [...items].sort((a, b) => sortOrder == 0 ? a.amount - b.amount : b.amount - a.amount)

    }

    return (
        <>
            <Heading color={"blue.600"}>Other Cost</Heading>
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
                        {otherCosts && sortData(otherCosts).map((item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.description}</Table.Cell>
                                <Table.Cell>₹{item.amount}</Table.Cell>
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
                        marginBottom="10px" required
                        type="text" placeholder={placeholder.titlePlaceholder} name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <Input marginBottom="10px" required
                        type="number" placeholder={placeholder.amountPlaceholder} value={amount} onChange={(e) => setAmount(e.target.value)} name="amount" min={1}/>

                    <Button type="submit" variant="subtle" color="blue.500" backgroundColor="blue.100"
                        size="xs"
                    >Update</Button>

                </form>
            </Modal>
        </>
    )
}
