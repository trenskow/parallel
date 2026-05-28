// Created 2022-2026 by Kristian Trenskow

export default (promises) => {

	if (typeof promises === 'undefined') throw new TypeError('No promises was provided.');
	if (!Array.isArray(promises)) promises = [promises];

	if (promises.length === 0) return Promise.resolve([]);

	let results = Array(promises.length);
	let rejection;
	let completed = 0;

	return new Promise((resolve, reject) => {

		const evaluate = () => {

			if (completed === promises.length) {

				if (typeof rejection !== 'undefined') {
					return reject(rejection);
				}

				resolve(results);

			}

		};

		promises
			.forEach((promise, idx) => {
				Promise.resolve(promise)
					.then((value) => {
						results[idx] = value;
					})
					.catch((reason) => {
						results[idx] = undefined;
						rejection = rejection || reason;
					})
					.finally(() => {
						completed++;
					})
					.then(evaluate);
			});

	});

};
