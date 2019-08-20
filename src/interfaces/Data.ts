export type DataValue = string;

export interface DataField {
    name: string;
    type: 'string' | 'number';
    isDateTime: boolean;
    hasNegative: boolean;
    display: string;
}

export interface Data {
    [key: string]: DataValue;
}

export interface DataRow {
    data: Data;
    rows?: DataRow[] | null;
}

export interface Result {
    rows: DataRow[];
    fields: DataField[];
}
