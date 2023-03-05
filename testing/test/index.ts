import { DivineControls } from "./lib/index.js";

DivineControls.registerControlGroups([
  {
    id: "#dc_main",
    name: "Main",
  },
]);
DivineControls.registerControls([
  {
    id: "#dc_mouse_primary",
    groundId: "#dc_main",
    name: "Primary Mouse",
    input: {
      type: "mouse",
      button: "primary",
      mode: "down",
    },
    action: () => {
      console.log("primary");
    },
  },
  {
    id: "#dc_mouse_secondary",
    groundId: "#dc_main",
    name: "Secondary Mouse",
    input: {
      type: "mouse",
      button: "secondary",
      mode: "down",
    },

    action: () => {
      console.log("secondary");
    },
  },
  {
    id: "#dc_mouse_middle",
    groundId: "#dc_main",
    name: "Middle Mouse",
    input: {
      type: "mouse",
      button: "middle",
      mode: "down",
    },

    action: () => {
      console.log("middle");
    },
  },
  {
    id: "#dc_key1",
    groundId: "#dc_main",
    name: "Key 1",
    input: {
      type: "keybaord",
      key: "a",
      mode: "down",
    },

    action: () => {
      console.log("key");
    },
  },
  {
    id: "#dc_control_key",
    groundId: "#dc_main",
    name: "Key 1",
    input: {
      type: "keybaord",
      key: "Control",
      mode: "down",
    },
    action: () => {
      console.log("control key");
    },
  },
  {
    id: "#dc_catpure_change",
    groundId: "#dc_main",
    name: "Capture Change",
    input: {
      type: "keybaord",
      key: "t",
      mode: "down",
    },
    action: () => {
      console.log("caputre change");
    },
  },
]);
DivineControls.$INIT();

const button = document.createElement("button");
button.innerText = "Change Control";
document.body.append(button);
button.onclick = async () => {
  console.log("start capture");
  await DivineControls.captureControlForInput("#dc_catpure_change");
  console.log(DivineControls._capturedData);
  console.log("end capture");
};

//Control
