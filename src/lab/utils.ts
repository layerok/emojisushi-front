import gensync from "gensync";
export const querySelector = gensync({
  sync: function selectSync(selectors) {
    return document.querySelector(selectors);
  },
  async: function selectAsync(selectors) {
    return new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        try {
          resolve(document.querySelector(selectors));
        } catch (error) {
          reject(error);
        }
      });
    });
  },
});

/**
 *     Example
 *
 *     useEffect(() => {
 *         let sync = true;
 *         console.log(querySelector.sync('body'), '. is sync:', sync);
 *
 *         querySelector.async('body').then((el) => {
 *             console.log(el, '. is async:', !sync);
 *         })
 *         sync = false;
 *     }, [])
 */
