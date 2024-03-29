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
        id: "path",
        header: "Path",
    },
    {
        accessorKey: "label",
        id: "label",
        header: "Label",
    },
    {
        accessorKey: "score",
        id: "score",
        header: "Score",
    },
];
