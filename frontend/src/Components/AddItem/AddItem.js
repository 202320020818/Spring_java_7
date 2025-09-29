import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddItem() {
  const [inventory, setInventory] = useState({
    itemId: "",
    itemName: "",
    itemCategory: "",
    itemQty: "",
    itemDetails: "",
    itemImage: "",
  });
  const { itemId, itemName, itemCategory, itemQty, itemDetails } = inventory;

  const onInputChange = (e) => {
    if (e.target.name === "itemImage") {
      setInventory({ ...inventory, itemImage: e.target.files[0] });
    } else {
      setInventory({ ...inventory, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", inventory.itemImage);
    let imageName = "";
    try {
      const uploadRes = await axios.post(
        "http://localhost:8081/inventory/itemImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      imageName = uploadRes.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      return;
    }
    const updatedInventory = { ...inventory, itemImage: imageName };
    await axios.post("http://localhost:8081/inventory", updatedInventory);
    alert("Item Added Successfully");
    window.location.reload();
  };
  return (
    <div>
      <div>
        <p className="auth_topic">AddItem</p>
        <div className="from_vontiner">
          <div className="from_sub_coon">
            <form id="itemForm" onSubmit={onSubmit}>
              <label htmlFor="itemId">Item ID:</label>
              <br />
              <input
                type="text"
                id="itemId"
                name="itemId"
                onChange={onInputChange}
                value={itemId}
              />
              <br />

              <label htmlFor="itemName">Item Name:</label>
              <br />
              <input
                type="text"
                id="itemName"
                name="itemName"
                onChange={onInputChange}
                value={itemName}
              />
              <br />

              <label htmlFor="itemCategory">Item Category:</label>
              <br />
              <select
                id="itemCategory"
                name="itemCategory"
                onChange={onInputChange}
                value={itemCategory}
              >
                <option value="" disabled>
                  Select Item Category
                </option>
                <option value="Apparel & Fashion">Apparel & Fashion</option>
                <option value="Electronics & Gadgets">
                  Electronics & Gadgets
                </option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Home & Furniture">Home & Furniture</option>
              </select>
              <br />

              <label htmlFor="itemQty">Item Quantity:</label>
              <br />
              <input
                type="number"
                id="itemQty"
                name="itemQty"
                onChange={onInputChange}
                value={itemQty}
              />
              <br />

              <label htmlFor="itemDetails">Item Details:</label>
              <textarea
                id="itemDetails"
                name="itemDetails"
                rows="4"
                cols="50"
                onChange={onInputChange}
                value={itemDetails}
              ></textarea>
              <br />

              <label htmlFor="itemImage">Item Image</label>
              <input
                type="file"
                id="itemImage"
                name="itemImage"
                accept="image/*"
                onChange={onInputChange}
              />
              <br />

              <button type="submit" className="fom_btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
