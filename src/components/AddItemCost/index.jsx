
import AddCostForm from "../AddCostForm";

export default function AddItemCost(props) {
    const{ onAddCost } = props
    const placeholder = {
        titlePlaceholder: "Item Name",
        amountPlaceholder: "Item Cost"
    }

    return <div>
        <AddCostForm placeholder={placeholder} onAddCost={onAddCost} status={props.status}/>
    </div>
}