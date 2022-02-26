import apiCaller from "../apiCaller";
import { getAuth } from "firebase/auth";

const createVueshop = async (vueshopBody) => {
  const token = await getAuth().currentUser.getIdToken();
  const { data } = await apiCaller.post("vueshop/create", vueshopBody, {
    authorization: `Bearer ${token}`,
  });

  return data;
};

export default createVueshop;
