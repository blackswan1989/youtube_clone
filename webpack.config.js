const path = require("path");
const autoprefixer = require("Autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");
// __dirname은 현재의 프로젝트 디렉토리 이름으로 어디에서든 접근 가능한 Node.js의 전역변수이다.
//static이라는 폴더로 export(보내다)해준다.

const config = {
  devtool: "cheap-module-source-map",
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          //4)순수한css가 불러와지면 그 부분만 추출해서 보내준다.
          {
            loader: "css-loader", //3)webpack이 css를 이해할 수 있게 해준다.
          },
          {
            loader: "postcss-loader", //2)css를 받아서 plugin을 가지고 css를 호환성있게 변환.
            options: {
              postcssOptions: {
                plugins() {
                  return [autoprefixer({ browsers: "cover 99.5%" })];
                },
              },
            },
          },
          {
            loader: "sass-loader", //1)sass또는 scss를 받아서 일반 css로 바꿔준다.
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;

// module { rules:[ ] } 코드 설명
// webpack은 아무것도 모르는 상태이므로 scss파일도 이해하지 못한다. 따라서 loader를 추가해준다.
// SCSS를 CSS파일로 이해하고 그 CSS에 해당하는 텍스트 전체를 추출해서 CSS파일로 바꿔서 저장해야하기 때문이다.
// webpack은 아래(config)에서 위로 실행되기 때문에 extract먼저 쓰고 그 다음에 CSS파일을 이해시키는 부분을 적어주고 그 다음에 SASS파일을 다루는 부분을 적어주어야 한다.
// test: /\.(scss)$/는 먼저 어떤 조건을 확인하는 test로 SCSS로 끝나는 어떤 module (이 경우엔 styles.scss파일)을 만나게 되면, 이 plugin을(use: ExtractCSS.extract) 사용하도록 한 것.
// 진행순서 1)->4)use: ExtractCSS.extract

// options: {}는 Autoprefixer 설치 후 작성.
