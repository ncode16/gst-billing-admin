import { post, get } from "../../utility/client";

const AddTutorialData = (body) => {
  return post("create/tutorial", body);
};

const getCategoryDropdownData = (body) => {
  return get("list/category", body);
};

const getTutorialData = (body) => {
  return post("tutorials", body);
};

const deleteTutorialData = (id) => {
  return post(`delete/tutorial/${id}`)
}
const getEditTutorialData = (id) => {
  return get(`edit/tutorial/${id}`)
}
const updateTutorialData = (id, body) => {
  return post(`update/tutorial/${id}`, body)
}

const activeTutorialData = (id, body) => {
  return post(`active-inactive/tutorial/${id}`, body)
}


export { AddTutorialData, getTutorialData, getEditTutorialData, getCategoryDropdownData, deleteTutorialData, activeTutorialData, updateTutorialData };
