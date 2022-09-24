import { PhotosType, ProfileType } from "../types/types"
import { instance, APIResponseType } from "./api"

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateStatus(newStatus: string) {
        return instance.put<APIResponseType>(`profile/status`, { status: newStatus })
            .then(response => response.data)
    },
    savePhoto(file: any) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
            .then(response => response.data)
    },
}