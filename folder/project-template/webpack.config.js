import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __dirname = resolve();

const plugins = () => {
  const list = [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img',
          to: 'img',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'index.html'),
    }),
  ];
  return list;
};

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        // modules: true,
        // importLoaders: 1,
      },
    },
  ];

  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const config = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: cssLoaders({
          loader: 'css-modules-typescript-loader',
        }),
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  externals: {
    'typescript-flatrent-sdk': 'typescript-flatrent-sdk',
  },
  devServer: {
    static: './',
    open: {
      app: {
        name: 'Google Chrome',
      },
    },
    compress: true,
    port: 3000,
  },
};

export default config;