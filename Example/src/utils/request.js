/**
 * Copyright (c) 2016-2020, NorthLan All rights reserved. Apache License!!!
 *
 * @author: NorthLan (lan6995@gmail.com)
 * @website: https://noahlan.com
 * @date: 2018-08-02 16:33:43
 */

import axios from 'axios'
import CFG from '../const'
// create an axios instance
const service = axios.create({
  baseURL: CFG.BASE_API, // api的base_url
  timeout: 500000, // request timeout
  withCredentials: true,
  maxRedirects: 0
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
);

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    return new Promise((resolve, reject) => {
      // 此处catch到的是非2xx范围的返回值
      // console.log(error.status)
      let response = error.response;
      console.log(response);
      if (!response) {
        let error = {code: 0, message: '网络异常。'};
        reject(error)
      } else {
        let data = response.data;
        if (!data) data = {code: -100, message: '请求无响应。'};
        switch (response.status) {
          case 500: // 只处理500错误
            reject(data);
            break;
          case 403:
            reject(data);
            break;
          default:{
            reject(data);
            break
          }
        }
      }
    })
  }
);

export default service
