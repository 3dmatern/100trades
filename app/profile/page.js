import Navbar from "../ui/navbar";
import FormPassword from "../ui/profile/FormPassword";
import FormName from "../ui/profile/formName";
import UserCard from "../ui/profile/userCard";

export const metadata = {
    title: "Профиль",
    description: "Страница профиля журнала сделок Homa-Trading",
};

const currentUser = {
    id: "first",
    image: null,
    firstname: "Test",
    lastname: "Testovskiy",
    email: "test@mail.ru",
};

export default function Home() {
    return (
        <div className="container mx-auto min-w-96 md:p-5 p-4 relative w-screen h-screen ">
            <Navbar />
            <main className="block md:flex items-start justify-between gap-5 mt-10">
                <div className="md:w-4/12 w-full md:mb-0 mb-10">
                    <h1 className="mb-8 md:text-2xl text-xl md:text-start text-center font-bold underline underline-offset-8">
                        Профиль
                    </h1>
                    <UserCard currentUser={currentUser} />
                </div>
                <div className="md:w-1/2 w-full">
                    <h1 className="mb-8 md:text-2xl text-xl md:text-start text-center font-bold underline underline-offset-8">
                        Редактировать профиль
                    </h1>
                    <div className="block lg:flex items-center justify-between gap-5">
                        <FormName currentUser={currentUser} />
                        <FormPassword currentUser={currentUser} />
                    </div>
                </div>
            </main>
        </div>
    );
}