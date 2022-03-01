import { getAuth } from "firebase/auth";
import apiRequest from "../index";

const getContactList = async () => {
  const token = await getAuth().currentUser.getIdToken();
  const result = await apiRequest.get("contact/list", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export default getContactList;
