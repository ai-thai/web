const fs = require('fs');
const yaml = require("js-yaml");

const links = yaml.load(fs.readFileSync(`${process.cwd()}/src/_data/links.yaml`, 'utf-8'));

const tags = new Set();
for (const link of links) {
  for (const tag of link.tags) {
    tags.add(tag);
  }
}
module.exports = Array.from(tags);
