import { postWithAuth, getWithAuth } from '../../Basic/HttpService';

export const getAllModels = async () => {
    let res = await getWithAuth(`models`);
    return res;
};

export const getModelById = async (id) => {
    let res = await getWithAuth(`models/${id}`);
    return res;
};

export const postModelData = async (data) => {
    let res = await postWithAuth(`models`, data);
    return res;
};

export const getModelDropdownData = async (data) => {
    let res = await getWithAuth(`Models/screenDropdowns`);
    return res;
};
