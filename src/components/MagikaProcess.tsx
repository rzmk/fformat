"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

//@ts-ignore
import { Magika } from "magika";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { readFile } from "@tauri-apps/plugin-fs";
//@ts-ignore
import { open } from "@tauri-apps/plugin-dialog";
import { columns } from "@/components/DT/columns";
import { DataTable } from "@/components/DT/data-table";

const MagikaProcess = () => {
    const [loading, setLoading] = useState(false);
    const [predictions, setPredictions] = useState<any[]>([]);

    useEffect(() => {
        if (loading) return;
        listen("tauri://file-drop", async ({ payload }: any) => {
            setLoading(true);
            const filepaths: string[] = payload.paths;
            const filepredictions: any[] = [];

            for await (const filepath of filepaths) {
                const prediction = await getPrediction(filepath);
                filepredictions.push(prediction);
            }

            setPredictions(filepredictions);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPrediction = async (filepath: string) => {
        try {
            const fileBytes = await readFile(filepath);
            const magika = new Magika();
            await magika.load({});
            const prediction = await magika.identifyBytes(fileBytes);
            prediction.path = filepath;
            return prediction;
        } catch (e) {
            console.error(
                `Error while getting prediction for ${filepath}: ${e}`
            );
        }
    };

    const handleClick = async () => {
        // Open a selection dialog for files
        const selected = await open({
            multiple: true,
        });
        setLoading(true);
        if (Array.isArray(selected)) {
            // user selected multiple files
            const filePredictions: any[] = [];
            for await (const file of selected) {
                const prediction = await getPrediction(file.path);
                filePredictions.push(prediction);
            }
            setPredictions(filePredictions);
        } else if (selected === null) {
            console.log("User cancelled selection");
        } else {
            // user selected a single file
            const { label, score }: { label: string; score: number } = selected;
            setPredictions([{ label: label, score: score }]);
        }
        setLoading(false);
    };

    return (
        <div
            className={`flex h-full min-h-[100vh] w-full items-center justify-center text-center lg:m-8 ${
                predictions.length > 0 && "m-16"
            }`}
        >
            <div className="w-fit">
                <div className="flex flex-col items-center justify-center pb-4">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                        fformat
                    </h2>
                    <p className="text-md w-fit border-b text-muted-foreground">
                        Identify potential file content types
                    </p>
                </div>
                <div className="mb-4">
                    <div className="mx-auto grid w-fit items-center gap-1.5">
                        <Button
                            disabled={loading}
                            onClick={async () => await handleClick()}
                        >
                            Choose file(s){" "}
                            {loading && (
                                <Loader className="ml-2 w-4 animate-spin" />
                            )}
                        </Button>
                    </div>
                    <p className="text-md text-muted-foreground">
                        or drag and drop
                    </p>
                </div>
                {predictions.length > 0 && (
                    <DataTable
                        columns={columns}
                        data={predictions}
                        setData={setPredictions}
                    />
                )}
            </div>
        </div>
    );
};

export default MagikaProcess;
