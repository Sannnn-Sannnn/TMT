import Header from "@/components/ui/Header.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen w-screen">
            <Header/>
            <main className={"flex flex-col items-center h-full w-full p-5 py-20"}>
                <Card className={"flex justify-center px-10 py-10 gap-y-10 border"}>
                    <div className={"flex justify-center text-4xl font-heading font-medium"}>404 - Not Found</div>
                    <div className={"flex justify-center text-xl"}>The page you are looking for doesn't seem to exist</div>
                    <Button
                        className={"h-15 px-25 py-8 text-2xl font-medium font-heading"}
                        onClick={() => navigate("/")}
                    >
                        Return to landing page
                    </Button>
                </Card>
            </main>
        </div>
    )
}