import z from "zod";
export declare const createTaskInput: z.ZodObject<{
    options: z.ZodArray<z.ZodObject<{
        imageUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        imageUrl: string;
    }, {
        imageUrl: string;
    }>, "many">;
    title: z.ZodOptional<z.ZodString>;
    signature: z.ZodString;
}, "strip", z.ZodTypeAny, {
    options: {
        imageUrl: string;
    }[];
    signature: string;
    title?: string | undefined;
}, {
    options: {
        imageUrl: string;
    }[];
    signature: string;
    title?: string | undefined;
}>;
export declare const createSubmissionInput: z.ZodObject<{
    taskId: z.ZodString;
    selection: z.ZodString;
}, "strip", z.ZodTypeAny, {
    taskId: string;
    selection: string;
}, {
    taskId: string;
    selection: string;
}>;
