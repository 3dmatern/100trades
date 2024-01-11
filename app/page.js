import { LoginForm } from "@/components/auth/loginForm";

export default function Home() {
    return (
        <main className="container min-w-96 min-h-96 h-full mx-auto md:flex items-center justify-center">
            <div className="lg:w-3/5 w-max mx-auto mb-4 lg:mb-0">
                <iframe
                    src="https://www.youtube.com/embed/BWnPFsqGVwI?si=_OZ68ta_05qKJ6D7"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="max-w-xl min-w-80 max-h-80 w-full h-screen"
                ></iframe>
            </div>
            <div className="lg:w-2/5 flex items-center justify-center">
                <LoginForm />
            </div>
        </main>
    );
}
