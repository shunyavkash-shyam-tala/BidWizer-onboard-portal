import React, { useCallback } from "react";
import styles from "./UpdateContactModal.module.css";
import Modal from "../global/modal/Modal";
import PrimaryButton from "../global/buttons/PrimaryButton";
import useApiCall from "../../hooks/useApiCall";
import apis from "../../constants/apiCenter";
import useToast from "../../hooks/context/toast/useToast";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../global/inputs/TextInput";
import PhoneInput from "../global/inputs/PhoneInput";
import SelectInput from "../global/inputs/SelectInput";
import useSetFormDefaults from "../../hooks/useSetFormDefaults";
import updateUserSchema from "../../validators/updateUserSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const UpdateContactModal = ({
  isOpen,
  onClose,
  userInfo,
  companyId,
  onUpdateCb,
}) => {
  const methods = useForm({
    resolver: yupResolver(updateUserSchema),
  });
  const { apiCall, loading } = useApiCall();
  const { showToast } = useToast();
  useSetFormDefaults(userInfo, false, methods?.setValue);
  const updateContact = useCallback(
    async function (data) {
      const payload = {
        oldData: {
          id: String(userInfo?.contactId),
          email: userInfo?.email,
          first_name: userInfo?.firstname,
          last_name: userInfo?.lastname,
          phone: "+12403249144",
          association: userInfo?.role,
        },
        newData: {
          id: String(userInfo?.contactId),
          email: data?.email,
          first_name: data?.firstname,
          last_name: data?.lastname,
          phone: data?.phone,
          association: data?.role,
        },
      };
      try {
        await apiCall({
          ...apis.dealer.updateAssociateContact,
          body: {
            associateCompanyId: companyId,
            ...payload,
          },
        });

        showToast({ message: "Contact updated successfully." });
        onUpdateCb({
          contactId: userInfo?.contactId,
          updatedPayload: { contactId: userInfo?.contactId, ...data },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [apiCall, companyId, userInfo, onUpdateCb, showToast]
  );

  const userTypeOptions = [
    { title: "", selected: true },
    { title: "Administrator", value: "administrator" },
    { title: "Bidder", value: "bidder" },
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.concent_box}>
        <h2 className={styles.title}>Update Contact</h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(updateContact)}>
            <TextInput label="Email" name="email" required disabled />
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
                Update
              </PrimaryButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default UpdateContactModal;
