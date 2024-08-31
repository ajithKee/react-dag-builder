export interface FormSchemaDef {
    controlSchema: ControlSchema;
    uiSchema:      UISchema;
}

export interface ControlSchema {
    [key: string]: ControlSchemaDefinitions;
}

export interface ControlSchemaDefinitions {
    type:       string;
    properties: Properties;
    required: String[];
}

export interface Properties {
    [key: string]: Name;
}

export interface Name {
    type: string;
}

export interface UISchema {
    [key: string]: {
        elements:Element[],
        type: string,
    };
}

export interface Element {
    type:  string;
    scope: string;
}