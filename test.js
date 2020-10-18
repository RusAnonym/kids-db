const KidsDB = require(`./lib/cjs/main.js`);
console.log(`Script start`);

(async function () {
	let db = new KidsDB.DB(`test`);
	console.log(db.init);
})();
