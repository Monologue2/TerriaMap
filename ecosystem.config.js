/*global __dirname*/
const path = require("path");

//npm run 시 pm2 를 통해 전달되는 js 실행 파일
//pm2 start 명령을 통해 ecosystem.config.js 파일에 정의된 모든 애플리케이션이 실행된다.

// Pass through additional arguments that might ultimately have come from
// something like `yarn start -- --port 3009`
const argpos = process.argv.indexOf("--");
const args = argpos > -1 ? process.argv.slice(argpos + 1) : [];

module.exports = {
  apps: [
    {
      name: path.basename(__dirname),
      //require.resolve('string'), 모듈 내부의 파일 경로를 입력받아 해당 파일을 가져오는 함수
      //terriajs-server 모듈 전체를 가져왔다.
      //terriajs-server를 실행한다.
      script: require.resolve("terriajs-server"),

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      // 위 링크는 고장남, 다음 링크 참고할 것 : https://pm2.keymetrics.io/docs/usage/application-declaration/
      // passed to app, so any valid arguments in options.js are allowed.
      //"pm2 start ecosystem.config.js --update-env -- --config-file devserverconfig.json"
      //"/root/TerriaMap/devserverconfig.json"

      //지워도 상관없는 코드, args 는 옵션을 전달하는 속성이다.
      args: args.join(" "),

      //앱 실행시 생성될 인스턴스 갯수
      instances: 1,

      //pm2 에서 오류로 인해 종료되었을 때 자동 재시작 여부
      autorestart: true,

      //앱 파일이 변경될 경우 서버 자동 재시작 여부(boolean)
      watch: false,

      //재시작시 메인 메모리 제공량
      max_memory_restart: "1G",

      //{“NODE_ENV”: “development”, “ID”: “42”}, 앱에 나타낼 환경 리스트.
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
