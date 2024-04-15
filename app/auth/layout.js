import { UiContainer } from "@/components/uikit/uiContainer";

export default function AuthLayout({ children }) {
    return (
        <UiContainer className="flex items-center justify-center">
            {children}
        </UiContainer>
    );
}
