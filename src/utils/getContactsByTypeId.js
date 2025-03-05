export default function getContactsByTypeId({
  contacts,
  typeId,
  excludeTypeId,
} = {}) {
  return contacts.filter((contact) =>
    contact.properties.associationTypes.some(
      (type) =>
        type.typeId === typeId &&
        (!excludeTypeId ||
          !contact.properties.associationTypes.some(
            (type) => type.typeId === excludeTypeId
          ))
    )
  );
}
