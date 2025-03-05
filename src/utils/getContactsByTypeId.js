export default function getContactsByTypeId({ contacts, typeId } = {}) {
  return contacts.filter((contact) =>
    contact.properties.associationTypes.some((type) => type.typeId === typeId)
  );
}
