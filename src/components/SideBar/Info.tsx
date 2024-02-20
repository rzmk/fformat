"use client";

import { ArrowUpRightFromSquare, Info } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { open } from "@tauri-apps/plugin-shell";

const Settings = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <SettingsIcon strokeWidth={1.25} /> */}
                <Button variant="ghost" size="icon">
                    <Info strokeWidth={1.25} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>fformat</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Identify potential file content types on your local
                        device.
                    </p>
                    <Separator />
                    <ul className="list-disc text-sm text-muted-foreground ml-4 mt-2">
                        <li>
                            Not all content types are supported, and inferences
                            may be inaccurate.
                        </li>
                        <li>
                            Built with Magika, Tauri, shadcn/ui, Next.js, Rust,
                            & TypeScript.
                        </li>
                    </ul>
                    <DialogDescription className="pt-4 flex gap-2">
                        <Button
                            onClick={() =>
                                open("https://github.com/rzmk/fformat")
                            }
                        >
                            GitHub{" "}
                            <ArrowUpRightFromSquare className="w-4 ml-2" />
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => open("https://github.com/rzmk")}
                        >
                            rzmk <ArrowUpRightFromSquare className="w-4 ml-2" />
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default Settings;
