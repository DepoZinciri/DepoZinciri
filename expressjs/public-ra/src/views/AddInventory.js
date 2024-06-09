import React from "react";
import AddInventoryForm from "../components/AddInventoryForm";

function AddInventory(props) {
    return (
        <div className="container">
            <div className="col-lg-12 mt-5">
                <AddInventoryForm warehouseId={props.match.params.warehouseId} />
            </div>
        </div>
    );
}

export default AddInventory;
