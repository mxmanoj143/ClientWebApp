// No-op webpack plugin used to replace ForkTsCheckerWebpackPlugin in JS-only builds.
// react-scripts unconditionally `require()`s this plugin even when the project has no TypeScript,
// which on Node 22+ crashes due to its bundled ajv-keywords@3 / ajv@6 incompatibility.
// Since this project has no TypeScript files, we can safely no-op it.
class NoOpPlugin {
  constructor() {}
  apply() {}
}

module.exports = NoOpPlugin;
module.exports.default = NoOpPlugin;
