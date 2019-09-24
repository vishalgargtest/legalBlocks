/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { PaperContractContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('PaperContractContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new PaperContractContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"paper contract 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"paper contract 1002 value"}'));
    });

    describe('#paperContractExists', () => {

        it('should return true for a paper contract', async () => {
            await contract.paperContractExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a paper contract that does not exist', async () => {
            await contract.paperContractExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createPaperContract', () => {

        it('should create a paper contract', async () => {
            await contract.createPaperContract(ctx, '1003', 'paper contract 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"paper contract 1003 value"}'));
        });

        it('should throw an error for a paper contract that already exists', async () => {
            await contract.createPaperContract(ctx, '1001', 'myvalue').should.be.rejectedWith(/The paper contract 1001 already exists/);
        });

    });

    describe('#readPaperContract', () => {

        it('should return a paper contract', async () => {
            await contract.readPaperContract(ctx, '1001').should.eventually.deep.equal({ value: 'paper contract 1001 value' });
        });

        it('should throw an error for a paper contract that does not exist', async () => {
            await contract.readPaperContract(ctx, '1003').should.be.rejectedWith(/The paper contract 1003 does not exist/);
        });

    });

    describe('#updatePaperContract', () => {

        it('should update a paper contract', async () => {
            await contract.updatePaperContract(ctx, '1001', 'paper contract 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"paper contract 1001 new value"}'));
        });

        it('should throw an error for a paper contract that does not exist', async () => {
            await contract.updatePaperContract(ctx, '1003', 'paper contract 1003 new value').should.be.rejectedWith(/The paper contract 1003 does not exist/);
        });

    });

    describe('#deletePaperContract', () => {

        it('should delete a paper contract', async () => {
            await contract.deletePaperContract(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a paper contract that does not exist', async () => {
            await contract.deletePaperContract(ctx, '1003').should.be.rejectedWith(/The paper contract 1003 does not exist/);
        });

    });

});