import _ from 'lodash';

const token = 'D03ABBFA004747E07842145195EC7CFC';
const apiToken = 'AppTokenForInterview';
const uid = 1110590645;
const args = {token, uid, 'api-token': apiToken};

class LevelMoneyController {
    constructor($http) {
        _.assign(this, {$http});
        this.GetAllTransactions();
    }

    GetAllTransactions() {
        this.$http
            .post('https://2016.api.levelmoney.com/api/v2/core/get-all-transactions', {args})
            .then(res => this.data = _.get(res, 'data.transactions'));
    }
}



export default ['$http', LevelMoneyController];
