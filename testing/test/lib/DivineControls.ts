import {
  ControlData,
  ControlGroupData,
  ControlInputData,
  InputModeTypes,
  MouseButtonTypes,
} from "Types/Control.types";

export const DivineControls = {
  controlGroups: <
    Map<
      string,
      {
        data: ControlGroupData;
        controls: Map<string, ControlData>;
      }
    >
  >new Map(),
  controls: <Map<string, ControlData>>new Map(),

  mouseInputs: <Record<InputModeTypes, Map<string, ControlData>>>{
    down: new Map(),
    hold: new Map(),
    up: new Map(),
  },

  keyboardInputs: <Record<InputModeTypes, Map<string, ControlData>>>{
    down: new Map(),
    hold: new Map(),
    up: new Map(),
  },
  _mapMoueButton(input: number): MouseButtonTypes {
    if (input == 0) return "primary";
    if (input == 2) return "secondary";
    return "middle";
  },
  _mapKey(key: string) {
    return key.length == 1 ? key.toLocaleLowerCase() : key;
  },

  _capturing: false,
  _capturedData: <ControlInputData>{},

  $INIT() {
    window.addEventListener("mousedown", (event) => {
      if (this._capturing) {
        this._capturedData = {
          type: "mouse",
          mode: "down",
          button: this._mapMoueButton(event.button),
        };
        this._capturing = false;
        return;
      }
      const control = this.mouseInputs["down"].get(
        this._mapMoueButton(event.button)
      );
      if (!control) return;
      control.action();
    });

    window.addEventListener("mouseup", (event) => {
      if (this._capturing) {
        this._capturedData = {
          type: "mouse",
          mode: "up",
          button: this._mapMoueButton(event.button),
        };
        this._capturing = false;
        return;
      }
      const control = this.mouseInputs["up"].get(
        this._mapMoueButton(event.button)
      );
      if (!control) return;
      control.action();
    });

    window.addEventListener("keydown", (event) => {
      if (this._capturing) {
        this._capturedData = {
          type: "keybaord",
          mode: "down",
          key: this._mapKey(event.key),
        };
        this._capturing = false;
        return;
      }
      const control = this.keyboardInputs["down"].get(this._mapKey(event.key));
      if (!control) return;
      control.action();
    });

    window.addEventListener("keyup", (event) => {
      if (this._capturing) {
        this._capturedData = {
          type: "keybaord",
          mode: "up",
          key: this._mapKey(event.key),
        };
        this._capturing = false;
        return;
      }
      const control = this.keyboardInputs["up"].get(this._mapKey(event.key));
      if (!control) return;
      control.action();
    });
  },

  getControlGroup(id: string) {
    return this.controlGroups.get(id);
  },

  registerControlGroups(data: ControlGroupData[]) {
    for (const group of data) {
      this.controlGroups.set(group.id, {
        data: group,
        controls: new Map(),
      });
    }
  },

  _addControlInput(control: ControlData) {
    if (control.input.type == "keybaord") {
      const inputMap = this.keyboardInputs[control.input.mode];
      inputMap.set(control.input.key, control);
    }
    if (control.input.type == "mouse") {
      const inputMap = this.mouseInputs[control.input.mode];
      inputMap.set(control.input.button, control);
    }
  },

  _removeontrolInput(control: ControlData) {
    if (control.input.type == "keybaord") {
      const map = this.keyboardInputs[control.input.mode];
      map.delete(control.input.key);
    }
    if (control.input.type == "mouse") {
      const map = this.mouseInputs[control.input.mode];
      map.delete(control.input.button);
    }
  },

  registerControls(data: ControlData[]) {
    for (const control of data) {
      const group = this.controlGroups.get(control.groundId);
      if (!group) {
        throw new Error(
          `Group with id: ${control.groundId} does not exists on control ${control.id}`
        );
      }
      this.controls.set(control.id, control);
      this._addControlInput(control);
    }
  },

  getControl(id: string) {
    return this.controls.get(id);
  },

  captureControlForInput(controlId: string) {
    return new Promise((resolve) => {
      this._capturing = true;
      const inte = setInterval(() => {
        if (!this._capturing) {
          resolve(true);
          clearInterval(inte);
          this.updateControlInputData(controlId, this._capturedData);
        }
      }, 100);
    });
  },

  updateControlInputData(controlId: string, data: ControlInputData) {
    const control = this.getControl(controlId);
    if (!control) {
      throw new Error(`Control with id: ${controlId} does not exists`);
    }
    this._removeontrolInput(control);
    control.input = data;
    this._addControlInput(control);
  },
};
