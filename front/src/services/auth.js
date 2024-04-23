import api from "./config";

const signUp = async (body) => {
  try {
    const { data } = await api.post('/auth/signup', body)
    return data
  } catch (error) {
    console.log(error)
  }
}


export {
  signUp
}
