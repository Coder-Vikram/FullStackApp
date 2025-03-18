import { postRequest } from "./api.js";

const testApiCall = async () => {
    const response = await postRequest("/test", { name: "John Doe" });
    console.log(response);
};

testApiCall();
