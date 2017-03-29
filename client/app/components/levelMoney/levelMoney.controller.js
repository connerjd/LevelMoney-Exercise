import _ from 'lodash';
import moment from 'moment';

const token = 'D03ABBFA004747E07842145195EC7CFC';
const apiToken = 'AppTokenForInterview';
const uid = 1110590645;
const args = {token, uid, 'api-token': apiToken};
const conversionDenominator = 10000;

class LevelMoneyController {
    constructor($http, $q, $timeout) {
        _.assign(this, {$http, $q, $timeout, conversionDenominator, ignoreDonuts: false, isLoading: true});

        this.getAllTransactions()
            .then(res => {
                this.initialData = _.get(res, 'data.transactions');
                this.setDisplayData();
            });
    }

    setDisplayData() {
        this.data = [];
        this.isLoading = true;

        // Timeout to force digest
        this.$timeout(() => {
            this.formatTransactions(this.initialData)
                .then(result => {
                    this.isLoading = false;
                    this.data = result;
                });
        });
    }

    sortTransactions(transactions) {
        let result = {};

        _.forEach(transactions, transaction => {
            let month = moment(transaction['transaction-time']).format('YYYY-MM');
            if (!this.ignoreTransaction(transaction)) {
                result[month] = result[month] || [];
                result[month].push(transaction);
            }
        });

        return result;
    }

    formatTransactions(transactions) {
        let deferred = this.$q.defer();
        let result = this.sortTransactions(transactions);

        const monthStrings = _.keys(result);
        _.forEach(monthStrings, month => result[month] = this.getMonthTotals(result[month]));

        const monthValues = _.values(result);
        const rangeOfMonths = this.getRangeOfMonths(monthStrings);
        result.average = this.getUserAveragesPerMonth(monthValues, rangeOfMonths);

        deferred.resolve(result);

        return deferred.promise;
    }

    getMonthTotals(transactions) {
        let result = {totalSpent: 0, totalIncome: 0};

        _.forEach(transactions, transaction => {
            const {amount} = transaction;
            if (amount > 0) {
                result.totalIncome += amount;
            } else {
                result.totalSpent += amount;
            }
        });

        return result;
    }

    getUserAveragesPerMonth(months, rangeOfMonths) {
        let result = {totalSpent: 0, totalIncome: 0};

        _.forEach(months, monthData => {
            const {totalIncome, totalSpent} = monthData;
            result.totalIncome += totalIncome;
            result.totalSpent += totalSpent;
        });

        result.totalIncome = result.totalIncome / rangeOfMonths;
        result.totalSpent = result.totalSpent / rangeOfMonths;

        return result;
    }



    /////// Throw these into a service ///////
    /**
     * Gets all transactions for a specific user
     * @returns {*} Promise of all transactions
     */
    getAllTransactions() {
        return this.$http.post('https://2016.api.levelmoney.com/api/v2/core/get-all-transactions', {args});
    }

    /**
     * Returns true if a transaction is a transaction from Dunkin Donuts
     * @param transaction Basic transaction from levelmoney endpoint
     * @returns {boolean} Returns if transaction is from Dunkin Donuts
     */
    isDonutTransaction(transaction) {
        let merchant= _.toLower(transaction.merchant);
        let isPurchase = transaction.amount < 0;
        return isPurchase && (_.includes(merchant, 'donuts') || _.includes(merchant, 'dunkin #336784'));
    }

    /**
     * Filter for when to ignore a transaction
     * @param transaction Basic transaction from levelmoney endpoint
     * @returns {*|boolean} Returns true if the transaction should be ignored
     */
    ignoreTransaction(transaction) {
        return this.ignoreDonuts && this.isDonutTransaction(transaction);
    }

    /**
     * Returns the number of months between the first and last transaction dates
     * @param monthStrings Sorted list of string representations of month (should include year)
     * @returns {number} Inclusive number of months between the first and last transaction dates
     */
    getRangeOfMonths(monthStrings) {
        let start = _.head(monthStrings);
        let end = _.last(monthStrings);

        // Why +1? moment().diff calculates the start of a month to another.
        // We need it from the start of a month to the end of another
        return moment(end).diff(moment(start), 'month') + 1;
    }
}

export default ['$http', '$q', '$timeout', LevelMoneyController];
