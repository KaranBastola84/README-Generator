import Hero from "./components/Hero";
import SinceBadge from "./components/SinceBadge";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main className="w-full pt-20 bg-surface-container-lowest relative overflow-hidden">
        {/* Global background geometric matrix */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 grid-pattern-matrix opacity-70" />
          <div className="absolute inset-0 grid-subdots opacity-40" />
        </div>
        
        <div className="flex flex-col w-full relative z-10">
          <Hero />
          <SinceBadge />
        </div>
      </main>
      <Footer />
    </>
  );
}