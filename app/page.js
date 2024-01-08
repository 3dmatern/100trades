import FormSignIn from "./ui/deals/formSignIn";

export default function Home() {
    return (
        <main className="container min-w-96 min-h-96 mx-auto relative h-screen">
            <div className="w-full px-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="lg:flex items-center justify-between">
                    <div className="lg:w-3/5 lg:block hidden">
                        <img
                            src="./screenshot.png"
                            alt="screenshot table"
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <div className="lg:w-2/5 flex items-center justify-center flex-wrap">
                        <FormSignIn />
                    </div>
                </div>
            </div>
        </main>
    );
}
