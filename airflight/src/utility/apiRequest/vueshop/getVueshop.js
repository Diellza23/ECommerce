import apiCaller from "../apiCaller";
import { getAuth } from "firebase/auth";

const getVueShopList = async (vueshopId) => {
  const token = await getAuth().currentUser.getIdToken();
  const result = await apiCaller.get(`vueshop/${vueshopId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export default getVueShopList;
