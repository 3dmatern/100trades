import { UiContainer } from "@/components/uikit/uiContainer";

export const metadata = {
    title: "Профиль",
    description: "Страница профиля журнала сделок Homa-Trading",
};

export default function ProfileLayout({ children }) {
    return (
        <UiContainer
            className="
                pt-8 px-5 flex flex-col gap-8
            "
        >
            {children}
        </UiContainer>
    );
}
