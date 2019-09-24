/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class PaperContractContract extends Contract {

    async paperContractExists(ctx, paperContractId) {
        const buffer = await ctx.stub.getState(paperContractId);
        return (!!buffer && buffer.length > 0);
    }

    async createPaperContract(ctx, paperContractId, value) {
        const exists = await this.paperContractExists(ctx, paperContractId);
        if (exists) {
            throw new Error(`The paper contract ${paperContractId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(paperContractId, buffer);
    }

    async readPaperContract(ctx, paperContractId) {
        const exists = await this.paperContractExists(ctx, paperContractId);
        if (!exists) {
            throw new Error(`The paper contract ${paperContractId} does not exist`);
        }
        const buffer = await ctx.stub.getState(paperContractId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updatePaperContract(ctx, paperContractId, newValue) {
        const exists = await this.paperContractExists(ctx, paperContractId);
        if (!exists) {
            throw new Error(`The paper contract ${paperContractId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(paperContractId, buffer);
    }

    async deletePaperContract(ctx, paperContractId) {
        const exists = await this.paperContractExists(ctx, paperContractId);
        if (!exists) {
            throw new Error(`The paper contract ${paperContractId} does not exist`);
        }
        await ctx.stub.deleteState(paperContractId);
    }

}

module.exports = PaperContractContract;
