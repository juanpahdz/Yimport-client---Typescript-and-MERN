import axios from 'axios'
import { Video } from './video'

const API = 'http://localhost:4000'

export const getVideos = async () => {
    return await axios.get<Video[]>(`${API}/videos`)
}

export const createVideos = async (video: Video) => {
    return await axios.post(`${API}/create`, video)
}

export const getVideo = async (id: string) => {
    return await axios.get<Video>(`${API}/video/${id}`)
}

export const updateVideo = async (id: string, video: Video) => {
    return await axios.put<Video>(`${API}/update/${id}`, video)
}

export const deleteVideo = async (id: string) => {
    return await axios.delete(`${API}/delete/${id}`)
}
