const path = require("path");
const pify = require("pify");
const globby = require("globby");
const {readFile, writeFile} = pify(require("fs"));
const mkdirp = pify(require("mkdirp"));
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, "..");
const patterns = [path.resolve(ROOT, "src/assets/gallery/**/*.jpg")];

const itemMap = {};
const dataFile = data => {
	const result = JSON.stringify(data, null, 4).replace(/"(require(.*))"/g, (o, $1) =>
	$1.replace(/\\"/g, "\""))
	return `export default ${result}`;
}
const indexFile = data => `import React from "react";
import {Slideshow, StageImage} from "../../../src/components/stage";
import data from "./data";

export default () => (
	<Slideshow noContent>
		{data.stage.slides.sort((a,b) => a.id - b.id).map((slide, i) => {
			return <StageImage key={i} src={slide.image} alt={slide.text} style={slide.style} />;
		})}
	</Slideshow>
);
`
globby(patterns).then(async items => {
	await Promise.all(items.map(async item => {
		const {dir, name, base} = path.parse(item);
		const {name: galleryName} = path.parse(dir);
		const [rawName, objectPosition] = name.split("|");
		const [,id] = rawName.split("_");
		const directory = path.resolve(ROOT, `.tmp/gallery/${galleryName}/images`);
		const distFile = path.resolve(directory, `${name}.webp`);
		const outFile = `./images/${name}.webp`;
		await mkdirp(directory);
		sharp(item)
			.resize(2000, 1600)
			.crop(sharp.strategy.entropy)
			.toFile(distFile, (err, info) => {
			});

		itemMap[galleryName] = itemMap[galleryName] || [];
		itemMap[galleryName].push({
			id,
			image: `require("${outFile}")`,
			style: {
				objectPosition: objectPosition && objectPosition
					.split(":")
					.map(x => x ? `${x.replace(/%/g, "")}%` : "")
					.join(" ")
			}
		});
		return Promise.resolve();
	}));
	const galleries = Object.entries(itemMap).map(([directory, data]) => {
		return {
			directory,
			stage: {
				slides: data.map(entry => {
					return {
						text: directory.replace(/-/g, " "),
						...entry,
					}
				})
			}
		}
	});
	galleries.forEach(async gallery => {
		const directory = path.resolve(ROOT, ".tmp/gallery", gallery.directory);
		const data = path.resolve(directory, "data.js");
		const index = path.resolve(directory, "index.js");
		await mkdirp(directory);
		await writeFile(data, dataFile(gallery), "UTF-8");
		await writeFile(index, indexFile(), "UTF-8");
	})
});
