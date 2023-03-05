export type ControlInputTypes = "mouse" | "keyboard";
export type InputModeTypes = "down" | "up" | "hold";
export type MouseButtonTypes = "primary" | "secondary" | "middle";
export type ControlInputData =
  | {
    mode: InputModeTypes;
      type: "mouse";
      button: MouseButtonTypes;
    }
  | {
      type: "keybaord";
      key: string;
      mode: InputModeTypes;
      shift?: boolean;
      ctrl?: boolean;
      alt?: boolean;
    };
export type ControlData = {
  id: string;
  groundId : string;
  name: string;
  input: ControlInputData;

  action: Function;
};

export type ControlGroupData = {
  id: string;
  name: string;
};
