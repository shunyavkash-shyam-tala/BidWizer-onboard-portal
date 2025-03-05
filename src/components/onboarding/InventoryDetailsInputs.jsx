import React, { useEffect } from "react";
import FormSubTitle from "../global/inputs/FormSubTitle";
import SelectInput from "../global/inputs/SelectInput";
import CheckboxInput from "../global/inputs/CheckboxInput";
import TextAreaInput from "../global/inputs/TextAreaInput";
import { useFormContext } from "react-hook-form";
import useSetFormDefaults from "../../hooks/useSetFormDefaults";

export default function InventoryDetailsInputs({ defaultFormValues }) {
  useSetFormDefaults(defaultFormValues);
  const { watch, setValue } = useFormContext();
  const isInventoryCombined = watch(
    "is_the_inventory_combined_with_another_store_",
    defaultFormValues?.is_the_inventory_combined_with_another_store_
  );
  const inventoryStayCombined = watch(
    "inventory_ok_to_stay_combined_",
    defaultFormValues?.inventory_ok_to_stay_combined_
  );
  const separateNewInventory = watch(
    "separate_new_inventory_",
    defaultFormValues?.separate_new_inventory_
  );
  const separateUsedInventory = watch(
    "separate_used_inventory_",
    defaultFormValues?.separate_used_inventory_
  );

  useEffect(() => {
    if (isInventoryCombined === "No") {
      setValue("inventory_ok_to_stay_combined_", "");
      setValue("separate_new_inventory_", "");
      setValue("stock_number_differentiator", "");
      setValue("separate_used_inventory_", "");
      setValue("stock_number_differentiator__used_", "");
    }
    if (inventoryStayCombined === "Yes - No Adjustments Needed") {
      setValue("separate_new_inventory_", "");
      setValue("stock_number_differentiator", "");
      setValue("separate_used_inventory_", "");
      setValue("stock_number_differentiator__used_", "");
    }

    if (separateNewInventory === "No") {
      setValue("stock_number_differentiator", "");
    }

    if (separateUsedInventory === "No") {
      setValue("stock_number_differentiator__used_", "");
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
          options={inventoryCombinedOptions}
        />
      )}
      {separateNewInventory === "Yes" && (
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
          options={inventoryCombinedOptions}
        />
      )}
      {separateUsedInventory === "Yes" && (
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
