const prod = {
  WS_URL: "wss://rockscissorspaper.online/ws",
};
const dev = {
  WS_URL: "ws://localhost:9000",
};

export const config = process.env.REACT_APP_ENV === "development" ? dev : prod;
