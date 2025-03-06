const apis = {
  dealer: {
    dealerSearch: {
      method: "GET",
      url: "/v1/hubspot/dealer/list/pending",
    },
    onboarding: {
      method: "POST",
      url: "/v1/hubspot/dealer/onboard",
    },
    onboardedDealerSearch: {
      method: "GET",
      url: "/v1/hubspot/dealer/list/onboarded",
    },
    dealerUpdate: {
      method: "POST",
      url: "/v1/hubspot/dealer/edit/onboard",
    },
    removeAssociateContact: {
      method: "POST",
      url: "/v1/hubspot/dealer/remove/association",
    },
    updateAssociateContact: {
      method: "POST",
      url: "/v1/hubspot/dealer/edit/contact",
    },
    addNewAssociateContact: {
      method: "POST",
      url: "/v1/hubspot/dealer/create/new-contact",
    },
  },
};

export default apis;
