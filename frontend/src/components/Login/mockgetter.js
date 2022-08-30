import axios from "../../api/axios";
const LOGIN_URL = "/login";


const mockGetter = (id) => {
    axios.post('LOGIN_URL')
    .then((res) => res.data.email)
    .catch((err) => console.error(err));
}

export default mockGetter;