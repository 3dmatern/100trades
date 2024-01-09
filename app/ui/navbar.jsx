import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between w-full">
            <Link href="/">
                <h1 className="text-2xl font-bold">Журнал сделок</h1>{" "}
            </Link>
            <Link href="/profile">Личный кабинет</Link>
        </nav>
    );
}
