import axios from 'axios'
import queryString from 'query-string'


const instance = axios.create({
    baseURL: `https://involve.software/test_front/api/`,
    // baseURL: `https://involve-it.com/test_front/api/`,
})

export const exAPI =  {
  getPayMethods: () => {
    return instance.get(`payMethods`)
      .then(response => response.data)
  },

  calculate: (params = {}) => {
    const queryStringParams = {
          ...params
    }
    return instance.get(`payMethods/calculate?${queryString.stringify(queryStringParams)}`)
      .then(response => response)

  },

  createReq: (options = {}) => {
    return instance.post(`/bids`, options)
      .then(response => response.data)
  },

}