import gensync from "gensync";
export const select = gensync({
	sync: function selectSync(selectors) {
		return document.querySelector(selectors)
	},
	async: function selectAsync(selectors, timeout = 1000) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					resolve(document.querySelector(selectors));
				} catch (error) {
					reject(error)
				}

			}, timeout)
		})
	}
})
