import { getAuth } from "firebase/auth";
import apiRequest from "../index";

const getVueShopList = async () => {
  const token = await getAuth().currentUser.getIdToken();
  const result = await apiRequest.get("vueshop/list", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export default getVueShopList;
