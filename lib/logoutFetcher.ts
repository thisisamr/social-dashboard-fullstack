import fetcher from "../utils/fetcher";
export const logout = (url: string, data = {}) => {
  return fetcher(url, data);
};
