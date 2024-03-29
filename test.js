// Created 2022 by Kristian Trenskow

import { use as chaiUse, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wait from '@trenskow/wait';

chaiUse(chaiAsPromised);

import parallel from './index.js';

describe('parallel', () => {

	it ('should throw an error if promises are not provided.', () => {
		expect(() => parallel(123)).to.throw('Promise is not thenable.');
	});

	it ('should throw an error if no promises are provided.', () => {
		expect(() => parallel()).to.throw('No promises was provided.');
	});

	it ('should come back with empty array if an empty array was provided.', async () => {
		return expect(parallel([])).to.eventually.be.eql([]);
	});

	it ('should eventually come back with [1, 2, 3]', async () => {
		const called = [false, false, false];
		return (async () => {
			await expect(parallel([0, 1, 2].map(async (item) => {
				await wait(`${item * 100}ms`);
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
				await wait(`${item * 100}ms`);
				called[item] = true;
				return item + 1;
			}))).to.eventually.be.rejectedWith('Some error');
			expect(called).to.eql([true, false, true]);
		})();
	});

});
