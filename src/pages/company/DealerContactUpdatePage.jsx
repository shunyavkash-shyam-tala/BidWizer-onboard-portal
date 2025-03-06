import React, { useCallback, useState } from "react";
import OnboardingFormLayout from "../../components/layouts/OnboardingFormLayout";
import SearchInput from "../../components/global/inputs/SearchInput";
import ExistingContactFrom from "../../components/updateDealerContacts/ExistingContactFrom";
import getContactsByTypeId from "../../utils/getContactsByTypeId";
import associationInfo from "../../constants/associationInfo";

export default function DealerContactUpdatePage() {
  const [selectedDealer, setSelectedDealer] = useState();
  const [associatedContacts, setAssociatedContacts] = useState([]);
  function setDealer(dealer) {
    const administrators = getContactsByTypeId({
      contacts: dealer.associatedContacts,
      typeId: associationInfo.administrator.id,
      excludeTypeId: associationInfo.primary.id,
    })?.map((contact) => ({
      contactId: contact?.contactId,
      email: contact?.properties?.email,
      firstname: contact?.properties?.firstname,
      lastname: contact?.properties?.lastname,
      phone: contact?.properties?.phone,
      role: associationInfo.administrator.label,
    }));

    const bidders = getContactsByTypeId({
      contacts: dealer.associatedContacts,
      typeId: associationInfo.bidder.id,
    })?.map((contact) => ({
      contactId: contact?.contactId,
      email: contact?.properties?.email,
      firstname: contact?.properties?.firstname,
      lastname: contact?.properties?.lastname,
      phone: contact?.properties?.phone,
      role: associationInfo.bidder.label,
    }));
    setAssociatedContacts([...administrators, ...bidders]);

    setSelectedDealer(dealer);
  }

  const removeAssociatedContact = useCallback(
    (contactId) => {
      const excludeContact = associatedContacts.filter(
        (contact) => contact.contactId !== contactId
      );

      setAssociatedContacts(excludeContact);
    },
    [associatedContacts]
  );

  const onUpdate = useCallback(
    ({ contactId, updatedPayload } = {}) => {
      const excludeContact = associatedContacts.map((contact) => {
        if (contact.contactId == contactId) {
          return { ...contact, ...updatedPayload };
        }

        return contact;
      });

      setAssociatedContacts(excludeContact);
    },
    [associatedContacts]
  );
  return (
    <>
      {!selectedDealer ? (
        <OnboardingFormLayout formTitle={"Search Dealer"}>
          <SearchInput
            onSelect={setDealer}
            apiEndPoint="onboardedDealerSearch"
          />
        </OnboardingFormLayout>
      ) : (
        <OnboardingFormLayout formTitle={"Manage additional dealer contact"}>
          {associatedContacts?.map((contact) => (
            <ExistingContactFrom
              key={contact.contactId}
              userInfo={contact}
              companyId={selectedDealer?.id}
              onRemove={removeAssociatedContact}
              onUpdate={onUpdate}
            />
          ))}
        </OnboardingFormLayout>
      )}
    </>
  );
}
