export const metadata = {
    title: "Профиль",
    description: "Страница профиля журнала сделок Homa-Trading",
};

export default function ProfileLayout({ children }) {
    return (
        <main className="w-full h-full mt-8 px-5 pb-5 flex flex-col items-center justify-center gap-8 md:flex-row md:items-start">
            {children}
        </main>
    );
}
