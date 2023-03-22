import { post, get } from '../../utility/client';

const AddTemplateData = (body) => {
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    return post('create/template', body, config.headers);
};

const getTemplateData = (body) => {
    return post('templates', body)
}

const deleteTemplateData = (id) => {
    return post(`delete/template/${id}`)
}

const activeTemplateData = (id, body) => {
    return post(`active-inactive/template/${id}`, body)
}

const getTemplateEditData = (id) => {
    return get(`edit/template/${id}`)
}

const updateTemplateData = (id, body) => {
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    return post(`update/template/${id}`, body, config.headers)
}

export { AddTemplateData, getTemplateData, deleteTemplateData, activeTemplateData, getTemplateEditData, updateTemplateData };