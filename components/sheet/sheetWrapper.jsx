export default function SheetWrapper({ children }) {
    return (
        <main
            style={{ height: `calc(100vh - 104px)` }}
            className="flex flex-col mx-auto p-4 pb-0 relative overflow-x-hidden"
        >
            {children}
        </main>
    );
}
