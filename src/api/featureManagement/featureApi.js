import { post, get } from "../../utility/client";

const AddFeatureData = (body) => {
  return post("create/feature", body);
};

const getFeatureData = (body) => {
  return post("features", body);
};

const deleteFeatureData = (id) => {
  return post(`delete/feature/${id}`)
}

const activeFeatureData = (id, body) => {
  return post(`active-inactive/feature/${id}`, body)
}

const getEditFeatureData = (id) => {
  return get(`edit/feature/${id}`)
}

const updateFeatureData = (id, body) => {
  return post(`update/feature/${id}`, body)
}

export { AddFeatureData, getFeatureData, deleteFeatureData, activeFeatureData, getEditFeatureData, updateFeatureData };
