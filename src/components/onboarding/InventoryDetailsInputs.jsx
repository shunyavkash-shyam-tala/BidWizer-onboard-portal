import React, { useEffect } from "react";
import FormSubTitle from "../global/inputs/FormSubTitle";
import SelectInput from "../global/inputs/SelectInput";
import CheckboxInput from "../global/inputs/CheckboxInput";
import TextAreaInput from "../global/inputs/TextAreaInput";
import { useFormContext } from "react-hook-form";

export default function InventoryDetailsInputs() {
  const { watch, setValue } = useFormContext();
  const isInventoryCombined = watch(
    "is_the_inventory_combined_with_another_store_"
  );
  const inventoryStayCombined = watch("inventory_ok_to_stay_combined_");
  const separateNewInventory = watch("separate_new_inventory_");
  const separateUsedInventory = watch("separate_used_inventory_");

  useEffect(() => {
    if (isInventoryCombined === "No") {
      setValue("inventory_ok_to_stay_combined_", undefined);
      setValue("separate_new_inventory_", undefined);
      setValue("stock_number_differentiator", undefined);
      setValue("separate_used_inventory_", undefined);
      setValue("stock_number_differentiator__used_", undefined);
    }
    if (inventoryStayCombined === "Yes - No Adjustments Needed") {
      setValue("separate_new_inventory_", undefined);
      setValue("stock_number_differentiator", undefined);
      setValue("separate_used_inventory_", undefined);
      setValue("stock_number_differentiator__used_", undefined);
    }

    if (separateNewInventory === "Yes") {
      setValue("stock_number_differentiator", undefined);
    }

    if (separateUsedInventory === "Yes") {
      setValue("stock_number_differentiator__used_", undefined);
    }
  }, [
    isInventoryCombined,
    separateNewInventory,
    inventoryStayCombined,
    separateUsedInventory,
    setValue,
  ]);

  const inventoryCombinedOptions = [
    { disabled: true, selected: true, title: "" },
    { value: "Yes", title: "Yes" },
    { value: "No", title: "No" },
  ];

  const stayCombinedOptions = [
    { disabled: true, selected: true, title: "" },
    {
      value: "Yes - No Adjustments Needed",
      title: "Yes - No Adjustments Needed",
    },
    { value: "No", title: "No" },
  ];

  return (
    <>
      <FormSubTitle title="Inventory Details" sx={{ marginBlock: "40px" }} />
      <SelectInput
        name="is_the_inventory_combined_with_another_store_"
        label="Is the Inventory Combined with Another Store?"
        required
        options={inventoryCombinedOptions}
      />
      {isInventoryCombined === "Yes" && (
        <SelectInput
          name="inventory_ok_to_stay_combined_"
          label="Can Inventory Stay Combined"
          required
          options={stayCombinedOptions}
        />
      )}
      {inventoryStayCombined === "No" && (
        <SelectInput
          name="separate_new_inventory_"
          label="Separate New Inventory?"
          required
          options={stayCombinedOptions}
        />
      )}
      {separateNewInventory === "No" && (
        <TextAreaInput
          name="stock_number_differentiator"
          label="Stock Number Differentiator (New)"
          required
          rows={4}
        />
      )}
      {inventoryStayCombined === "No" && (
        <SelectInput
          name="separate_used_inventory_"
          label="Separate Used Inventory?"
          required
          options={stayCombinedOptions}
        />
      )}
      {separateUsedInventory === "No" && (
        <TextAreaInput
          name="stock_number_differentiator__used_"
          label="Stock Number Differentiator (Used)"
          required
          rows={4}
        />
      )}
      <CheckboxInput
        name="include_in_transit_new_vehicles"
        label="Include In-Transit Vehicles"
      />
    </>
  );
}
