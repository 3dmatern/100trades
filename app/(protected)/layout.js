import Navbar from "@/app/(protected)/_components/navbar";

export default function ProtectedLayout({ children }) {
    return (
        <>
            <Navbar />

            {children}
        </>
    );
}
