"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Prediction = {
    path: string;
    label: string;
    score: number;
};

export const columns: ColumnDef<Prediction>[] = [
    {
        accessorKey: "path",
        header: "Path",
    },
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "score",
        header: "Score",
    },
];
