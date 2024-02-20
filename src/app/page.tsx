import MagikaProcess from "@/components/MagikaProcess";
import SideBar from "@/components/SideBar/SideBar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <div className="flex">
            <div className="fixed flex h-[100vh]">
                <div className="w-fit">
                    <SideBar />
                </div>
                <Separator
                    className="h-full w-[0.1rem]"
                    orientation="vertical"
                />
            </div>
            <MagikaProcess />
        </div>
    );
}
