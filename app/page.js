import FormSignIn from "./ui/deals/formSignIn";

export default function Home() {
    return (
        <main className="container min-w-96 min-h-96 mx-auto relative h-screen">
            <div className="w-full px-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="lg:flex items-center justify-between">
                    <div className="lg:w-3/5 w-max mx-auto mb-4 lg:mb-0">
                        <iframe
                            src="https://www.youtube.com/embed/BWnPFsqGVwI?si=_OZ68ta_05qKJ6D7"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                            className="max-w-xl min-w-80 max-h-80 w-full h-screen"
                        ></iframe>
                    </div>
                    <div className="lg:w-2/5 flex items-center justify-center flex-wrap">
                        <FormSignIn />
                    </div>
                </div>
            </div>
        </main>
    );
}
