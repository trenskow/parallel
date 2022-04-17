// Created 2022 by Kristian Trenskow

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wait from '@trenskow/wait';

chai.use(chaiAsPromised);

const { expect } = chai;

import parallel from './index.js';

describe('parallel', () => {
	
	it ('should throw an error if promises are not provided.', () => {
		expect(() => parallel(123)).to.throw('Promise is not thenable.');
	});

	it ('should eventually come back with [1, 2, 3]', async () => {
		const called = [false, false, false];
		return (async () => {
			await expect(parallel([0, 1, 2].map(async (item) => {
				await wait(`${item}s`);
				called[item] = true;
				return item + 1;
			}))).to.eventually.be.eql([1, 2, 3]);
			expect(called).to.eql([true, true, true]);
		})();
	});

	it ('should eventually be rejected', async () => {
		const called = [false, false, false];
		return (async () => {
			await expect(parallel([0, 1, 2].map(async (item) => {
				if (item === 1) throw new Error('Some error');
				await wait(`${item}s`);
				called[item] = true;
				return item + 1;
			}))).to.eventually.be.rejectedWith('Some error');
			expect(called).to.eql([true, false, true]);
		})();
	});

});
