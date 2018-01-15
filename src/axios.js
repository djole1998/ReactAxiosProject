import Axios from 'axios';

const url = 'https://api.myjson.com/bins/8aoyp';

class LunchService {
    getAllData() {
        return Axios({
            method: 'get',
            url
        });
    }
}

export default new LunchService();