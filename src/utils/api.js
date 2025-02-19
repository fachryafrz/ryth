import axios from "axios";

export const fetchAPI = async (url, options) => {
  const { data } = await axios.request({
    method: options?.method || 'GET',
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
    url: '/api/spotify',
    params: {
      url,
      options: JSON.stringify(options),
      access_token: options?.access_token,
    },
  })

  return { data };
};