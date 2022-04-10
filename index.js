// Created 2022-04-10 by Kristian Trenskow

const parallel = async (promises) => {
	if (!Array.isArray(promises)) return await parallel([promises]);
	return (await Promise.allSettled(promises.map((promise) => Promise.resolve(promise))))
		.map((result) => {
			if (result.status === 'rejected') throw result.reason;
			return result.value;
		});
};

export default parallel;
