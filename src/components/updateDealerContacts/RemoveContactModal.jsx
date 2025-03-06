import React, { useCallback } from "react";
import styles from "./RemoveContactModal.module.css";
import Modal from "../global/modal/Modal";
import PrimaryButton from "../global/buttons/PrimaryButton";
import useApiCall from "../../hooks/useApiCall";
import apis from "../../constants/apiCenter";
import useToast from "../../hooks/context/toast/useToast";

const RemoveContactModal = ({
  isOpen,
  onClose,
  email,
  userInfo,
  companyId,
  onRemoveCb,
}) => {
  const { apiCall, loading } = useApiCall();
  const { showToast } = useToast();
  const removeAssociation = useCallback(
    async function () {
      try {
        await apiCall({
          ...apis.dealer.removeAssociateContact,
          body: {
            contactId: String(userInfo?.contactId),
            companyId,
          },
        });

        showToast({ message: "Contact removed successfully." });
        onRemoveCb();
      } catch (error) {
        console.error(error);
      }
    },
    [apiCall, companyId, userInfo?.contactId, onRemoveCb, showToast]
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.concent_box}>
        <h2 className={styles.title}>Remove Contact</h2>
        <p className={styles.description}>
          Are you sure you want to remove the contact with the email:
        </p>
        <p className={styles.email}>{email}</p>
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
              background: "var(--danger-btn)",
              boxShadow: "none",
              padding: "10px 20px",
            }}
            loading={loading}
            onClick={removeAssociation}
          >
            Remove
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveContactModal;
