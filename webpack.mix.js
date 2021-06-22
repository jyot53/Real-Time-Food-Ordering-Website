// const { assertSupportedNodeVersion } = require('../src/Engine');

// module.exports = async () => {
//     assertSupportedNodeVersion();

//     const mix = require('../src/Mix').primary;

//     require(mix.paths.mix());

//     await mix.installDependencies();
//     await mix.init();

//     return mix.build();
// };

let mix = require('laravel-mix');
mix.js('resources/js/app.js','public/js/app.js').sass('resources/scss/style.scss','public/css/style.css');

