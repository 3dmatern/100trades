import FormSignUp from "../ui/deals/formSignUp";

export const metadata = {
    title: "Регистрация | Журнал сделок",
    description: "Страница регистрации журнала сделок Homa-Trading",
};

export default function Page() {
    return (
        <main className="container min-w-96 min-h-96 mx-auto relative h-screen flex items-center justify-center">
            <FormSignUp />
        </main>
    );
}
