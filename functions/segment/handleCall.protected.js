const axios = require("axios");

exports.handler = function (context, event, callback) {
  if (!["reservation.accepted", "task.canceled"].includes(event.EventType)) {
    callback(null, {});
  }

  const callOutcome = {
    userId: JSON.parse(event.TaskAttributes).from,
    event: "call",
    properties: {
      connected: event.EventType == "reservation.accepted",
      wait_time: parseInt(event.TaskAge),
    },
  };

  const eventEndpoint = axios.create({
    baseURL: `https://api.segment.io/v1`,
    auth: {
      username: context.SEGMENT_TOKEN,
      password: "",
    },
  });

  eventEndpoint.post("/track", callOutcome).then((result) => {
    callback(null, {});
  });
};
