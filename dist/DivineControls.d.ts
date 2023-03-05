import { ControlData, ControlGroupData, ControlInputData, InputModeTypes, MouseButtonTypes } from "Types/Control.types";
export declare const DivineControls: {
    controlGroups: Map<string, {
        data: ControlGroupData;
        controls: Map<string, ControlData>;
    }>;
    controls: Map<string, ControlData>;
    mouseInputs: Record<InputModeTypes, Map<string, ControlData>>;
    keyboardInputs: Record<InputModeTypes, Map<string, ControlData>>;
    _mapMoueButton(input: number): MouseButtonTypes;
    _mapKey(key: string): string;
    _capturing: boolean;
    _capturedData: ControlInputData;
    $INIT(): void;
    getControlGroup(id: string): {
        data: ControlGroupData;
        controls: Map<string, ControlData>;
    } | undefined;
    registerControlGroups(data: ControlGroupData[]): void;
    _addControlInput(control: ControlData): void;
    _removeontrolInput(control: ControlData): void;
    registerControls(data: ControlData[]): void;
    getControl(id: string): ControlData | undefined;
    captureControlForInput(controlId: string): Promise<unknown>;
    updateControlInputData(controlId: string, data: ControlInputData): void;
};
