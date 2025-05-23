import { Button, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";

export default function AddCostForm(props) {
    const { placeholder, onAddCost } = props
    const { titlePlaceholder, amountPlaceholder } = placeholder;
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);

    const submitHanlder = (event) => {
        event.preventDefault();
        onAddCost(title, amount);
        setTitle("");
        setAmount(0);
        console.log(title, amount);
    }

    const onChangeTitleHandler = (event) => {
        setTitle(event.target.value);
    }

    const onChangeAmountHandler = (event) => {  
        setAmount(parseFloat(event.target.value));
    }


    return <form onSubmit={submitHanlder} >
        <Input
        marginBottom="10px"
        type="text" placeholder={titlePlaceholder} name="title" value={title}  onChange={onChangeTitleHandler}/>
        <Input marginBottom="10px"
         type="number" placeholder={amountPlaceholder} value={amount}  onChange={onChangeAmountHandler}/>
        
        <Button type="submit" variant="subtle" color="blue.500" backgroundColor="blue.100"
         size="xs"
        >Add Cost</Button>
        
    </form>
}