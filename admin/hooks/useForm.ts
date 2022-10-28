import { useMemo, useState } from 'react';

export const useForm = (fields: Field[]): Res => {
    const parsedFields = fields.map((field) => {
        const [value, setValue] = useState(field.initialValue);
        const status = useMemo<{message: string, color: 'success'|'error'|'default'}>(
            () => {
                if (!value || value.length === 0) 
                return {
                    message: "",
                    color: "default",
                };
                const isValid = field.validate(value);
                return {
                    message: isValid ? field.validMessage : field.errorMessage,
                    color: isValid ? "success" : "error",
                }
            },
        [value])
        return {
            ...field,
            ...status,
            value,
            setValue,
        };
    });
    const allowSubmit = useMemo(() => {
        return parsedFields.every((field) => field.validate(field.value));
    }, [parsedFields]);
    return {
        parsedFields,
        allowSubmit
    }
}

interface Field {
    name: string;
    initialValue: string;
    validate: (value: string) => boolean|RegExpMatchArray|null;
    validMessage: string;
    errorMessage: string;
}

interface ParsedField {
    value: string;
    setValue: (value: string) => void;
    message: string;
    color: 'success'|'error'|'default';
}

interface Res {
    parsedFields: ParsedField[];
    allowSubmit: boolean;
}