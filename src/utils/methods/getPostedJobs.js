import { getToken } from './login';
import axios from '../axios';
import { API } from '../../config/apiurl';

const getPostedJobs = async () => {
  const token = getToken();
  if (token) {
    let response = {};
    await axios
      .get(`/${API.RECRUITERS_JOBS}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        response = res.data;
      });
    return response;
  }
};

export default getPostedJobs;
