const axios = require("axios");

exports.handler = function (context, event, callback) {
  console.log(`fetchData: phoneNumber = ${event.phoneNumber}`);
  const profile = axios.create({
    baseURL: `https://profiles.segment.com/v1/spaces/${context.SEGMENT_SPACE}/collections/users/profiles`,
    auth: {
      username: context.SEGMENT_PROFILE_TOKEN,
      password: "",
    },
  });

  const encodedPhone = `%2b${event.phoneNumber.slice(1)}`;
  console.log(`fetchData: encodedPhone = ${encodedPhone}`);
  profile
    .get(`/user_id:${encodedPhone}/traits`)
    .then((response) => {
      return callback(null, response.data.traits);
    })
    .catch((error) => {
      console.log(`fetchData: ERROR:`, error);
      return callback(error);
    });
};
