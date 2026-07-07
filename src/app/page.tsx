import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen items-center bg-gradient-to-br from-slate-50 via-cyan-50 to-white pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <span className="font-semibold uppercase tracking-[4px] text-orange-500">
            Founded in Honor of Vihana
          </span>

          <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-playfair)] text-6xl font-bold leading-tight text-slate-900 lg:text-8xl">
            Every Birthday.
            <br />
            <span className="bg-gradient-to-r from-teal-700 to-orange-500 bg-clip-text text-transparent">
              A Thousand Smiles.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-600">
            Transforming birthdays into opportunities for education,
            nutrition, healthcare and hope for children.
          </p>

          <div className="mt-12 flex gap-5">
            <button className="rounded-full bg-teal-700 px-8 py-4 text-lg font-semibold text-white transition hover:scale-105">
              Join the Kindness Movement
            </button>

            <button className="rounded-full border-2 border-teal-700 px-8 py-4 text-lg font-semibold text-teal-700 transition hover:bg-teal-700 hover:text-white">
              Our Story
            </button>
          </div>

        </div>
      </main>
    </>
  );
}