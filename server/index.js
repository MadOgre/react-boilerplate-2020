import http from "http";
import app from "./server";

const server = http.createServer(app);

let currentApp = app;

if (module.hot) {
  module.hot.accept("./server.js", () => {
    server.removeListener("request", currentApp);
    server.on("request", app);
    currentApp = app;
  });
}

server.listen(3000);
