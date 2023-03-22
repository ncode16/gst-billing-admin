import { post, get } from "../../utility/client";

const getContactUsData = (body) => {
  return post("contacts", body);
};

const getEmailData = (id) => {
  return get(`get/contact/${id}`)
}

const sendEmailData = (body) => {
  return post ("send/contact-email", body)
}

export { getContactUsData, sendEmailData, getEmailData };
