// Created 2022 by Kristian Trenskow

export default (promises) => {

	if (!Array.isArray(promises)) promises = [promises];

	promises.forEach((promise) => {
		if (typeof (promise || {}).then !== 'function') throw new Error('Promise is not thenable.');
	});

	let results = Array(promises.length).fill({});

	return new Promise((resolve, reject) => {

		const evaluate = () => {

			if (!results) return;

			if (results.filter(({ status }) => status).length === promises.length) {
				
				try {
					resolve(results.map((result) => {
						if (result.status === 'rejected') throw result.reason;
						return result.value;
					}));
				} catch (error) {
					reject(error);
				}

				results = undefined;

			}

		};

		promises.forEach((promise, idx) => {
			promise
				.then((value) => {
					results[idx] = {
						status: 'resolved',
						value
					};
				}, (reason) => {
					results[idx] = {
						status: 'rejected',
						reason
					};
				})
				.then(evaluate);
		});

	});

};
