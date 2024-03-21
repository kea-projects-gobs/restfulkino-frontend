import { Header } from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <main className="w-full min-h-screen bg-zinc-700">
      <div className="mx-auto container min-w-[350px] px-2 lg:px-0 lg:max-w-[1440px] py-10">
        <Header />
        <div className="pt-4">{children}</div>
      </div>
    </main>
  );
}
