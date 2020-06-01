import request from '@/utils/request.js'

export function entry_face(faceInfo,username) {
    return request({
        url: '/users/entry_face/',
        method: 'post',
        data: {
            'face-info': faceInfo,
            'username': username
        }
    })
}

export function sign_by_face(faceInfo,username) {
    return request({
        url: '/users/sign_in_by_face',
        method: 'post',
        data: {
            'face-info': faceInfo,
            'username': username
        }
    })
}