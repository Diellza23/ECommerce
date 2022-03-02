import apiCaller from "../apiCaller";
import { getAuth } from "firebase/auth";

const deleteVueshop = async (id) => {
  const token = await getAuth().currentUser.getIdToken();

  return await apiCaller.delete(`vueshop/delete/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export default deleteVueshop;
