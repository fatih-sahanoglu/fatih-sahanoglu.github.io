const path = require("path");
const pify = require("pify");
const globby = require("globby");
const sharp = require('sharp');
const mkdirp = pify(require("mkdirp"));

const ROOT = path.resolve(__dirname, "..");
const patterns = [path.resolve(ROOT, "src/pages/**/*.jpg")];

globby(patterns).then(items => {
	items.map(async item => {
		const {dir, name} = path.parse(item);
		const {dir: prefix, name: folder} = path.parse(dir);
		const {name: pageName} = path.parse(prefix);
		const outDir = path.resolve(ROOT, "src/pages", pageName, "images/.tmp");
		const outFile = path.resolve(outDir, `${name}.webp`);

		await mkdirp(outDir);
		sharp(item)
			.resize(2000, 1600)
			.crop(sharp.strategy.entropy)
			.toFile(outFile, (err, info) => {
				if (err) {
					throw err;
				}
			});
	});
});
