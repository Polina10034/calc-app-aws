import axios from "axios";

export default {
  get(endpoint, data) {
    return connectApi(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return connectApi(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return connectApi(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return connectApi(endpoint, "DELETE", data);
  },
};

async function connectApi(endpoint, method = "get", data = null) {
  // const Authorization = localStorage.getItem("idToken");
  // const token = localStorage.getItem("accessToken");
  // const user = localStorage.getItem("user");
  try {
    const res = await axios({
      url: `https://${process.env.REACT_APP_API_DEV}${endpoint}`,
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        // Authorization, user, token
      },
      data,
    });
    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the endpoint, ${endpoint}, with data: ${JSON.stringify(
        data
      )}`
    );
    console.dir(err.response);
    // if (err.response && err.response.status === 401) {
    //   window.location.assign("/#/signup");
    // }
    throw err.response;
  }
}