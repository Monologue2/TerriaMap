import React from "react";

import MenuButton from "terriajs/lib/ReactViews/Map/MenuButton";

//이 캡션을 수정하더라도 변화하지 않는다.
export default function AboutButton() {
  return <MenuButton caption="about" href="about.html" />;
}
