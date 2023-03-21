const globeGif = require("./lib/Styles/globe.gif");
const polyfill = require("terriajs/lib/Core/polyfill");

require("./lib/Styles/loader.css");

function loadMainScript() {
  // load the main chunk
  // Promise 객체 생성, 성공할경우 resolve, 실패할경우 reject 실행
  return new Promise((resolve, reject) => {
    //
    require.ensure(
      ["terriajs/lib/Core/prerequisites"],
      function (require) {
        require("terriajs/lib/Core/prerequisites");
        require.ensure(
          ["./index"],
          function (require) {
            resolve(require("./index"));
          },
          reject,
          "index"
        );
      },
      reject,
      "index"
    );
  });
}

function createLoader() {
  //맨 초기 로딩창에 표시되는 loader-ui 태그
  const loaderDiv = document.createElement("div");
  loaderDiv.classList.add("loader-ui");
  //로딩시 나타나는 구체 이미지
  const loaderGif = document.createElement("img");
  loaderGif.src = globeGif;

  //loader-ui-left, loader-ui-graber, loader-ui-right
  //로딩시 왼편 블록
  const loaderLeft = document.createElement("div");
  loaderLeft.classList.add("loader-ui-left");

  //
  const loaderGrabber = document.createElement("div");
  loaderGrabber.classList.add("loader-ui-grabber");

  //로딩시 오른쪽 큰 블록
  const loaderRight = document.createElement("div");
  loaderRight.classList.add("loader-ui-right");

  //loader-ui-right 에 로딩 이미지 출력
  loaderRight.appendChild(loaderGif);

  //Left, Right, Grabber가 loader-ui 내부에 추가된다
  loaderDiv.appendChild(loaderLeft);
  loaderDiv.appendChild(loaderRight);
  loaderDiv.appendChild(loaderGrabber);
  loaderDiv.style.backgroundColor = "#383F4D";

  //body 에 loader-ui
  // document.body.appendChild(loaderDiv);

  polyfill(function () {
    loadMainScript()
      .catch(() => {
        // Ignore errors and try to show the map anyway
      })
      .then(() => {
        //loader-ui 의 class 명이 loader-ui-hide로 변경됨
        loaderDiv.classList.add("loader-ui-hide");
        //2초 후 loader-ui를 body에서 삭제함.
        setTimeout(() => {
          document.body.removeChild(loaderDiv);
        }, 2000);
      });
  });
}

createLoader();
