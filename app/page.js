import Link from "next/link";

import { UiContainer } from "@/components/uikit/uiContainer";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function Home() {
    return (
        <UiContainer
            className="
                container flex items-center justify-center flex-wrap
                md:flex-nowrap
            "
        >
            <div className="lg:w-3/5 w-max mx-auto mb-4 lg:mb-0">
                <iframe
                    src="https://www.youtube.com/embed/unYUlksBnEE?si=JMCtwQNzMRLPxijy"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="max-w-xl min-w-80 max-h-80 w-full h-screen"
                ></iframe>
            </div>
            <div className="lg:w-2/5 flex items-center justify-center flex-col gap-y-10">
                <Logo />
                <div className="flex items-center justify-center flex-col gap-y-4">
                    <Button size="lg" className="w-48" asChild>
                        <Link href="/auth/login">Войти</Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="w-48"
                        asChild
                    >
                        <Link href="/auth/register">Зарегистрироваться</Link>
                    </Button>
                </div>
            </div>
        </UiContainer>
    );
}
