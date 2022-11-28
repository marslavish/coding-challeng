import React, { useState, useEffect } from "react";

import Pools from "../components/pools-list";
import rootStore from "../store";

export default function Index() {
  return (
    <>
      <Pools store={rootStore} />
    </>
  );
}
