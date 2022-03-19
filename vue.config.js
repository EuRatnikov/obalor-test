const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: config => {
    config.entry.app = ['./src/main.ts'];
    const defaultRules = config.module.rules
        .filter(({ test }) => !test.toString().includes('scss'))
        .filter(({ test }) => !test.toString().includes('ts'));

    config.module.rules = [
      ...defaultRules,
      {
        test: /\.ts$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2019'
        }
      }
    ];
  }
})
