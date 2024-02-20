import { Settings } from "lucide-react";
import ThemeSwitch from "@/components/ThemeSwitch";
import Info from "@/components/SideBar/Info";
import { Button } from "@/components/ui/button";

const SideBar = () => {
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <ThemeSwitch />
            <Info />
            {/* <Button variant="ghost" size="icon">
                <Settings />
            </Button> */}
        </div>
    );
};

export default SideBar;
