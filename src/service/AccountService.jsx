import request from "utils/Request"

export const updateInformationService = (params) => {
    return request('/api/admin/update/profile', {
        method: 'PUT',
        data: params
    })
}