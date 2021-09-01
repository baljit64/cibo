import API from "./Api"

export const getMethod = async (path, headers) => {
  try {
    let result = await API.get(path, { headers: headers })
    if (result.status === 200) {
      return result
    }
  }
  catch (e) {
    if (e.response) {
      return e.response.data.message;
    }
  }
}
export const postMethod = async (path, data, headers) => {
  try {
    let result = await API.post(path, data, { headers: headers })
    if (result.status === 200) {
      return result
    }
  }
  catch (e) {
    if (e.response) {
      return e.response.data.message;
    }
  }
}