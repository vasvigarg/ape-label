export declare const getNextTask: (userId: number) => Promise<{
    id: number;
    title: string | null;
    amount: number;
    options: {
        id: number;
        task_id: number;
        image_url: string;
    }[];
} | null>;
