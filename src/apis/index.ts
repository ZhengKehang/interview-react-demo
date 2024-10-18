import requestUtil, {ContentType} from "./request.ts";

export const getServerTime = () => {
  return requestUtil.request({
    path: `/time`,
    method: "GET",
  })
}

export const postUploadFile = (data: any) => {
  return requestUtil.request({
    path: `/file/upload`,
    method: "POST",
    type: ContentType.FormData,
    body: data
  })
}

export interface User {
  id: number;
  name?: string;
  email?: string;
  age?: number;
}

export const getUsers = () => {
  return requestUtil.request({
    path: `/users`,
    method: "GET",
  })
}

export const putEditUser = (data: User) => {
  return requestUtil.request({
    path: `/users/${data?.id}`,
    method: "PUT",
    body: data,
  })
}

export const postCreateUser = (data: User) => {
  return requestUtil.request({
    path: `/users`,
    method: "POST",
    body: data,
  })
}

export const deleteUser = (data: { id: number }) => {
  return requestUtil.request({
    path: `/users/${data?.id}`,
    method: "DELETE",
    body: data,
  })
}
