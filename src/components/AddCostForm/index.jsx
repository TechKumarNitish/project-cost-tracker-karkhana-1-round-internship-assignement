import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { BeatLoader } from "react-spinners"
import { apiStatusConstants } from "../../apiStatusConstant";

export default function AddCostForm(props) {
    const { placeholder, onAddCost, initialTitle = '', initialAmount = 0 } = props
    const { titlePlaceholder, amountPlaceholder } = placeholder;
    const [title, setTitle] = useState(initialTitle);
    const [amount, setAmount] = useState(initialAmount);

    const submitHanlder = (event) => {
        event.preventDefault();
        onAddCost(title, amount);
        setTitle("");
        setAmount(0);
    }

    const onChangeTitleHandler = (event) => {
        setTitle(event.target.value);
    }

    const onChangeAmountHandler = (event) => {
        setAmount(parseFloat(event.target.value));
    }

    return <form onSubmit={submitHanlder} >
        <Input
            marginBottom="10px" required
            type="text" placeholder={titlePlaceholder} name="title" value={title} onChange={onChangeTitleHandler} />
        <Input marginBottom="10px" required
            type="number" placeholder={amountPlaceholder} value={amount} onChange={onChangeAmountHandler} min={1} />

        <Button type="submit" variant="subtle" color="blue.500" backgroundColor="blue.100"
            size="xs"
            loading={apiStatusConstants.loading == props.status}
            disabled={apiStatusConstants.loading == props.status}
            spinner={<BeatLoader size={8} color="white" />}
        >Add</Button>

    </form>
}