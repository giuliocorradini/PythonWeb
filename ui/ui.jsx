import React from "react";
import ReactDOM from "react-dom";

const button_container_dom = document.querySelector("#react_buttons");
ReactDOM.render([
    <Button onClick={refresh} label="Refresh"></Button>,
    <Button onClick={collpase} label="Toggle/Collapse"></Button>,
], button_container_dom);