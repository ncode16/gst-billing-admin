import { post, get } from '../../utility/client';

const AddCmsData = (body) => {
  return post('create/about-us', body);
};

const getCmsData = (body) => {
  return post('about-us', body)
}

const deleteCmsData = (id) => {
  return post(`delete/about-us/${id}`)
}

const activeCmsData = (id, body) => {
  return post(`active-inactive/about-us/${id}`, body)
}

const getEditCmsData = (id) => {
  return get(`edit/about-us/${id}`)
}

const updateCmsData = (id, body) => {
  return post(`update/about-us/${id}`, body)
}

export { AddCmsData, getCmsData, deleteCmsData, activeCmsData, getEditCmsData, updateCmsData };