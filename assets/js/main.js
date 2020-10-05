import "../scss/styles.scss";
import "./videoPlayer"

// const something = async () => {
//   console.log("something");
// };

//! 아래의 ERROR 발생시 설치
//main.js:97 Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self'".
// npm install @babel/polyfill 설치
// webpack.config.js의 entry에 코드 추가 입력 : "@babel/polyfill"