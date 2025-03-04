const environment = import.meta.env.VITE_ENV_MODE;

const feedProvider =
  environment == "production"
    ? [
        {
          firstname: "digitalmax",
          provider: "digitalmax",
          email: "helpdesk@maxdigital.com",
        },
        {
          firstname: "dealerslink",
          provider: "dealerslink",
          email: "support@dealerslink.com",
        },
        {
          firstname: "homenet",
          provider: "homenet",
          email: "hmn.support@coxautoinc.com",
        },
        {
          firstname: "vauto",
          provider: "vauto",
          email: "vat.support@coxautoinc.com",
        },
        {
          firstname: "dealerinsipre",
          provider: "dealerinsipre",
          email: "support@dealerinspire.com",
        },
        {
          firstname: "vinmotion",
          provider: "vinmotion",
          email: "support@dealerspecialties.com",
        },
        {
          firstname: "vincue",
          provider: "vincue",
          email: "support@vincue.com",
        },
        {
          firstname: "dealerspike",
          provider: "dealerspike",
          email: "dis@dealerspike.com",
        },
      ]
    : [
        {
          id: "89897933980",
          provider: "Jaydip1",
          firstname: "Jaydip",
          email: "jaydip.suvagiya@shunyavkash.com",
        },
        {
          id: "89897934240",
          provider: "Jaydip2",
          firstname: "Jaydip",
          email: "jdfeedprovider2@yopmail.com",
        },
      ];

export default feedProvider;
