import { getToken } from './login';
import axios from '../axios';
import { API } from '../../config/apiurl';

const getJobApplicants = async (jobId) => {
  const token = getToken();
  let response = {};
  await axios
    .get(`/${API.RECRUITERS_JOBS}/${jobId}/${API.CANDIDIATES}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      response = res.data;
    });
  return response;
};
export default getJobApplicants;
