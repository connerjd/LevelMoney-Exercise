import _ from 'lodash';
import moment from 'moment';

const token = 'D03ABBFA004747E07842145195EC7CFC';
const apiToken = 'AppTokenForInterview';
const uid = 1110590645;
const args = {token, uid, 'api-token': apiToken};
const conversionDenominator = 10000;

class LevelMoneyController {
    constructor($http, $q, $timeout) {
        _.assign(this, {$http, $q, $timeout, conversionDenominator, ignoreDonuts: false, ignoreCCPayments: false, isLoading: true});

        this.getAllTransactions()
            .then(res => {
                this.initialData = _.get(res, 'data.transactions');
                this.ccData = this.getCCTransactions(this.initialData);
                this.setDisplayData();
            });
    }

    getAllTransactions() {
        return this.$http.post('https://2016.api.levelmoney.com/api/v2/core/get-all-transactions', {args});
    }

    setDisplayData() {
        this.data = [];
        this.isLoading = true;

        // Timeout to force digest
        this.$timeout(() => {
            let filteredTransactions = this.applyFilters(this.initialData);
            this.formatTransactions(filteredTransactions)
                .then(result => {
                    this.isLoading = false;
                    this.data = result;
                });
        });
    }

    formatTransactions(transactions) {
        let deferred = this.$q.defer();
        let sortedTransactions = this.sortTransactions(transactions);

        const monthStrings = _.keys(sortedTransactions);
        let formattedTransactions = {};
        _.forEach(monthStrings, month => formattedTransactions[month] = this.getMonthTotals(sortedTransactions[month]));

        const monthValues = _.values(formattedTransactions);
        const rangeOfMonths = this.getRangeOfMonthsForTransactions(monthStrings);
        formattedTransactions.average = this.getUserAveragesPerMonth(monthValues, rangeOfMonths);

        deferred.resolve(formattedTransactions);

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

    applyFilters(transactions) {
        transactions = this.ignoreDonuts ? this.removeDonutTransactions(transactions) : transactions;
        transactions = this.ignoreCCPayments ? this.removeCCTransactions(transactions) : transactions;

        return transactions;
    }

    sortTransactions(transactions) {
        return _.groupBy(transactions, transaction => moment(transaction['transaction-time']).format('YYYY-MM'));
    }

    getCCTransactions(transactions) {
        return _.reduce(transactions, (result, transaction) => {
            if (this.isCCTransaction(transaction)) result.push(transaction);
            return result;
        }, []);
    }

    isCCTransaction(transaction) {
        let merchant= _.toLower(transaction.merchant);
        return _.includes(merchant, 'cc payment') || _.includes(merchant, 'credit card payment');
    }

    isDonutTransaction(transaction) {
        let merchant= _.toLower(transaction.merchant);
        let isPurchase = transaction.amount < 0;
        return isPurchase && (_.includes(merchant, 'donuts') || _.includes(merchant, 'dunkin #336784'));
    }

    removeDonutTransactions(transactions) {
        return _.omitBy(transactions, this.isDonutTransaction);
    }

    removeCCTransactions(transactions) {
        return _.omitBy(transactions, this.isCCTransaction);
    }

    getRangeOfMonthsForTransactions(monthStrings) {
        let start = _.head(monthStrings);
        let end = _.last(monthStrings);

        // Why +1? moment().diff calculates the start of a month to another.
        // We need it from the start of a month to the end of another
        return moment(end).diff(moment(start), 'month') + 1;
    }
}

export default ['$http', '$q', '$timeout', LevelMoneyController];
