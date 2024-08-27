const fs = require("fs");
const socketIo = require("socket.io");

const config = require("../data/constData");
exports.mySocketIo = (server) => {
  const io = socketIo(server);

  // Set up a connection event for socket.io
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle a disconnect event
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    // Handle custom events
    socket.on("chat message", (msg) => {
      console.log("message", msg);
      io.emit("chat message", msg);
    });
    socket.on("get new id", (msg) => {
      let id = Date.now();
      console.log("get new id", id);
      io.emit("get new id", id);
    });
    socket.on(config.dataConfig.data_sample_dev.nameGetData, (msg) => {
      console.log(config.dataConfig.data_sample_dev.nameGetData);

      io.emit(config.dataConfig.data_sample_dev.nameGetData, msg);
      fs.writeFile(
        "./data/data_sample_dev/data.json",
        JSON.stringify(msg, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file", err);
          } else {
            console.log("JSON file has been saved.");
          }
        }
      );
    });
  });
};
