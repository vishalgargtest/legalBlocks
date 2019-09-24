/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js');

const employee = require('./employee.js');

class EmployeeList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.hrnet.employeeBgInfolist');
        this.use(employee);
    }

    async addEmployee(employee) {
        return this.addState(employee);
    }

    async getEmployee(employeeKey) {
        return this.getState(employeeKey);
    }

    async updateEmployee(employee) {
        return this.updateState(employee);
    }
}


module.exports = EmployeeList;