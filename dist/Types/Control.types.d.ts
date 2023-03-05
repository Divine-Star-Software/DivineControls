export declare type ControlInputTypes = "mouse" | "keyboard";
export declare type InputModeTypes = "down" | "up" | "hold";
export declare type MouseButtonTypes = "primary" | "secondary" | "middle";
export declare type ControlInputData = {
    mode: InputModeTypes;
    type: "mouse";
    button: MouseButtonTypes;
} | {
    type: "keybaord";
    key: string;
    mode: InputModeTypes;
    shift?: boolean;
    ctrl?: boolean;
    alt?: boolean;
};
export declare type ControlData = {
    id: string;
    groundId: string;
    name: string;
    input: ControlInputData;
    action: Function;
};
export declare type ControlGroupData = {
    id: string;
    name: string;
};
