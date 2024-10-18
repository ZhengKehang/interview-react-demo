import requestUtil, {ContentType} from "../utils/request.ts";

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
