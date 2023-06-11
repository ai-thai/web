const htmlmin = require("html-minifier");
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {

  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addFilter("only", function (arr, selection, attr) {
    return arr.filter((item) => item[attr].includes(selection));
  });

  if (process.env.ELEVENTY_PRODUCTION) {
    eleventyConfig.addTransform("htmlmin", htmlminTransform);
  }

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  // Watch targets
  eleventyConfig.addWatchTarget("./src/styles/");

  var pathPrefix = "";
  // if (process.env.GITHUB_REPOSITORY) {
  //   pathPrefix = process.env.GITHUB_REPOSITORY.split('/')[1];
  // }

  return {
    dir: {
      input: "src"
    },
    pathPrefix
  }
};

function htmlminTransform(content, outputPath) {
  if (outputPath.endsWith(".html")) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });
    return minified;
  }
  return content;
}
