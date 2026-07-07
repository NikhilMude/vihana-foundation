import Container from "../ui/Container";
import Logo from "../ui/Logo";

const menu = [
  "Home",
  "Mission",
  "Programs",
  "Gallery",
  "Volunteer",
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">

        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {menu.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-slate-700 transition hover:text-teal-700"
            >
              {item}
            </a>
          ))}
        </nav>

        <button className="rounded-full bg-teal-700 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-teal-800">
          Donate
        </button>

      </Container>
    </header>
  );
}