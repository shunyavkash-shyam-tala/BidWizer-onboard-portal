import React, { useCallback } from "react";
import styles from "./AddContactModal.module.css";
import Modal from "../global/modal/Modal";
import PrimaryButton from "../global/buttons/PrimaryButton";
import useApiCall from "../../hooks/useApiCall";
import apis from "../../constants/apiCenter";
import useToast from "../../hooks/context/toast/useToast";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../global/inputs/TextInput";
import PhoneInput from "../global/inputs/PhoneInput";
import SelectInput from "../global/inputs/SelectInput";
import updateUserSchema from "../../validators/updateUserSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const AddContactModal = ({ isOpen, onClose, companyId, addNewContactCB }) => {
  const methods = useForm({
    resolver: yupResolver(updateUserSchema),
  });
  const { apiCall, loading } = useApiCall();
  const { showToast } = useToast();
  const addContact = useCallback(
    async function (data) {
      const payload = {
        email: data?.email,
        firstName: data?.firstname,
        lastName: data?.lastname,
        phone: data?.phone,
        associationLabel: data?.role,
      };
      try {
        const res = await apiCall({
          ...apis.dealer.addNewAssociateContact,
          body: {
            companyId,
            ...payload,
          },
        });
        showToast({ message: "Contact Added successfully." });
        addNewContactCB({
          contactId: Number(res?.data?.Contact?.hs_object_id),
          ...data,
        });
        return methods.reset();
      } catch (error) {
        console.error(error);
      }
    },
    [apiCall, companyId, showToast, addNewContactCB, methods]
  );

  const userTypeOptions = [
    { title: "", selected: true },
    { title: "Administrator", value: "administrator" },
    { title: "Bidder", value: "bidder" },
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.concent_box}>
        <h2 className={styles.title}>Add New Contact</h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(addContact)}>
            <TextInput label="Email" name="email" required />
            <TextInput label="First Name" name="firstname" required />
            <TextInput label="Last Name" name="lastname" required />
            <PhoneInput label="Phone" name="phone" required />

            <SelectInput
              label="User: Job Role"
              name="role"
              required
              options={userTypeOptions}
            />

            <div className={styles.actions}>
              <PrimaryButton
                onClick={onClose}
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  width: "100%",
                  background: "var(--secondary-btn)",
                  boxShadow: "none",
                  padding: "10px 20px",
                }}
                type="button"
              >
                Cancel
              </PrimaryButton>
              <PrimaryButton
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  width: "100%",
                  boxShadow: "none",
                  padding: "10px 20px",
                }}
                loading={loading}
                type="submit"
              >
                Add Contact
              </PrimaryButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default AddContactModal;
