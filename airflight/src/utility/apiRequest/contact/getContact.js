import apiCaller from "../apiCaller";
import { getAuth } from "firebase/auth";

const getContactList = async (contactId) => {
  const token = await getAuth().currentUser.getIdToken();
  const result = await apiCaller.get(`contact/${contactId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

export default getContactList;
