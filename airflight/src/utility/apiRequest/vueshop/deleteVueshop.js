import apiCaller from "../apiCaller";
import { getAuth } from "firebase/auth";

const deleteVueshop = async (vueshopBody) => {
  const token = await getAuth().currentUser.getIdToken();
  const { data } = await apiCaller.delete("vueshop/delete", vueshopBody, {
    authorization: `Bearer ${token}`,
  });

  return data;
};

export default deleteVueshop;
