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
  },
};

export default apis;
