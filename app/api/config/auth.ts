import axios from "../config/axios";

export const loginApi = async (inputs: any) => {
  const request = await axios.post("auth/sign-in", inputs);
  localStorage.setItem("token", request.data.data[0].access_token);
  localStorage.setItem("role", request.data.data[1].role);
  return request;
};

export const signUpApi = async (inputs: any) => {
  const request = await axios.post("user/signup", inputs);
  return request;
};

export const projectApi = async (inputs: any) => {
  const request = await axios.post("/project", inputs);
  return request;
};

export const getProjectsApi = async () => {
  const request = await axios.get("/project");
  return request;
};
