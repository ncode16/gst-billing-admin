import { post } from "../../utility/client";

const getContactUsData = (body) => {
  return post("contacts", body);
};

const sendEmailData = (body) => {
  return post ("send/contact-email", body)
}

export { getContactUsData, sendEmailData };
