import {CircleUserRound, LogOut, MoonStar, Sun} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/useTheme.ts";
import {useUser} from "@/hooks/useUser.ts";
import {useState} from "react";
import {LogoutDialog} from "@/components/ui/LogoutDialog.tsx";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const [logoutIsOpen, setLogoutIsOpen] = useState(false);
    const navigate = useNavigate();

    const {isDark, toggle} = useTheme();
    const {user, userLogout} = useUser();

    async function logout() {
        await userLogout();
        navigate("/");
    }

    if (user === undefined) {
        return (
            <div className="flex items-center justify-between px-10 h-1/14 w-screen bg-primary text-primary-foreground">
                <div className={"font-heading font-medium text-4xl"}>
                    TMT
                </div>
                <div
                    onClick={toggle}
                >
                    {isDark ? (
                        <MoonStar className={"h-8 w-8"}/>
                    ) : (
                        <Sun className={"h-8 w-8"}/>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-between px-5 h-1/14 w-screen bg-primary">
            <div className={"font-heading font-medium text-primary-foreground text-4xl"}>
                TMT
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger render={
                    <div className={"flex flex-row items-center gap-x-3 px-2 py-1 text-xl text-primary-foreground hover:bg-primary-hover"}>
                        {user.email}
                        <CircleUserRound className={"h-8 w-8 text-primary-foreground"}/>
                    </div>
                }>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"bg-card border shadow-none ring-0"}>
                    <DropdownMenuItem closeOnClick={false} onClick={toggle}>
                        <div>
                            {isDark ? (
                                <MoonStar className={"h-8 w-8"}/>
                            ) : (
                                <Sun className={"h-8 w-8"}/>
                            )}
                        </div>
                        Theme
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        variant={"destructive"}
                        onClick={() => setLogoutIsOpen(true)}
                    >
                        <LogOut className={"h-8 w-8"}/>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <LogoutDialog open={logoutIsOpen} onOpenChange={setLogoutIsOpen} onConfirm={logout} />
        </div>
    )
}