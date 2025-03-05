function prepareOnboardingPayload(payload) {
  return {
    associateCompanyId: payload?.associateCompanyId,
    company: {
      group_name: payload?.group_name,
      dealer_id: payload?.hs_owner_email,
      hs_owner_email: payload?.hs_owner_email,
      name: payload?.name,
      website: payload?.website,
      address: payload?.address,
      city: payload?.city,
      state: payload?.state,
      zip: payload?.zip,
      warranty_product: payload?.warranty_product,
      dealer_doc___admin_fees: payload?.dealer_doc___admin_fees,
      package_fee__if_any_: payload?.package_fee__if_any_,
      used_car_package_fee: payload?.used_car_package_fee,
      is_the_inventory_combined_with_another_store_:
        payload?.is_the_inventory_combined_with_another_store_,
      inventory_ok_to_stay_combined_: payload?.inventory_ok_to_stay_combined_,
      separate_new_inventory_: payload?.separate_new_inventory_,
      stock_number_differentiator: payload?.stock_number_differentiator,
      separate_used_inventory_: payload?.separate_used_inventory_,
      stock_number_differentiator__used_:
        payload?.stock_number_differentiator__used_,
      include_in_transit_new_vehicles: payload?.include_in_transit_new_vehicles,
      deal_funding_contact_email: payload?.deal_funding_contact_email,
      deal_funding_contact_first_name: payload?.deal_funding_contact_first_name,
      deal_funding_contact_last_name: payload?.deal_funding_contact_last_name,
      deal_funding_contact_phone: payload?.deal_funding_contact_phone,
      dealer_inventory_authorizer_email:
        payload?.dealer_inventory_authorizer_email,
      dealer_inventory_authorizer_first_name:
        payload?.dealer_inventory_authorizer_first_name,
      dealer_inventory_authorizer_last_name:
        payload?.dealer_inventory_authorizer_last_name,
      dealer_inventory_authorizer_phone:
        payload?.dealer_inventory_authorizer_phone,
      inventory_feed_provider_name: payload?.inventory_feed_provider_name,
      inventory_feed_provider_email: payload?.inventory_feed_provider_email,
      inventory_feed_provider: payload?.inventory_feed_provider,
    },
    contacts: {
      primary: {
        firstname: payload?.firstname,
        lastname: payload?.lastname,
        email: payload?.email,
        phone: payload?.phone,
        association: ["primary", "administrator"],
        recreate: payload?.id ? false : true,
      },
      additionalContacts: payload?.additionalContacts?.map((contacts) => ({
        ...contacts,
        association: contacts?.role,
        recreate: true,
      })),
    },
    currentAdditionalUser: payload?.currentAdditionalUser ?? [],
    removeAssociationContacts: payload?.removeAssociationContacts ?? [],
    removeAdditionalUserAssociation:
      payload?.removeAdditionalUserAssociation ?? [],
  };
}

export { prepareOnboardingPayload };
