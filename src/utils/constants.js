export const APIKey = "fb75fd6eba0cc218feadbef348aca578";
export const latitude = 52.5244;
export const longitude = 13.4105;
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.euronatura.pt"
    : "http://localhost:3001";
