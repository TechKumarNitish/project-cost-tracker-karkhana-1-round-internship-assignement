import AddCostForm from "../AddCostForm";

export default function AddOtherCost(props) {
    const{ onAddCost } = props
    const placeholder = {
        titlePlaceholder: "Description",
        amountPlaceholder: "Amount"
    }

    return <div>
        <AddCostForm placeholder={placeholder} onAddCost={onAddCost}/>
    </div>
}