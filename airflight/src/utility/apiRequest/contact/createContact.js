import apiCaller from "../apiCaller";
import { getAuth } from "firebase/auth";

const createContact = async (contactBody) => {
  const token = await getAuth().currentUser.getIdToken();
  const { data } = await apiCaller.post("contact/create", contactBody, {
    authorization: `Bearer ${token}`,
  });

  return data;
};

export default createContact;
