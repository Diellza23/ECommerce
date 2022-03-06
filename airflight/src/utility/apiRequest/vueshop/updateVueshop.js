import apiCaller from "../apiCaller";
import { getAuth } from "firebase/auth";

const updateVueshop = async (id) => {
  const token = await getAuth().currentUser.getIdToken();

  return await apiCaller.put(`vueshop/put/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export default updateVueshop;
