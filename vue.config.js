module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      sass: {
        // 导入全局引用变量
        prependData: `
          @import "@/assets/css/_variable.scss";
          @import "@/assets/css/_mixin.scss";
        `,
      },
      css: {
        modules: {
          // 文件名-局部样式名-8 位 hash
          localIdentName: "[name]-[local]-[hash:8]",
        },
        localsConvention: "camelCaseOnly",
      },
    },
    // css 模块文件名需要加 module
    requireModuleExtension: true,
  },
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".vue"],
    },
    devtool: "source-map",
  },
  // 兼容 ie
  transpileDependencies: ["vue-module-decorators"],
};
