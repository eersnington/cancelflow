export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-grow w-full mx-auto">
            {children}
        </section>
    );
}