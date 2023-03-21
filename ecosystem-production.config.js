const dev = require("./ecosystem.config.js");
const os = require("os");

//Production Server? : 운영 서버
// You can start a production server with:
//    ./node_modules/.bin/pm2 start ecosystem-production.config.js --update-env --env production
//데몬 설정을 통해 서버 동작시 자동 실행 설정 가능, 명령어는 아래와 같다. npx 사용 가능
// Or configure it to run automatically as a daemon (systemd, upstart, launchd, rcd) with:
//    ./node_modules/.bin/pm2 startup systemd

const devApp = dev.apps[0];

module.exports = {
  apps: [
    {
      ...devApp,
      name: devApp.name + "-production",
      args: "--config-file productionserverconfig.json",
      instances: Math.max(4, os.cpus().length)
    }
  ]
};
