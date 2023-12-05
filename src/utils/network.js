export const apiClient = (url, method = "GET", params) => {
  return fetch(url, {
    method,
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
    },
  });
};
