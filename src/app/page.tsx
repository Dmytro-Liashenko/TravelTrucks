import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Find a camper for your next trip with TravelTrucks.",
};

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero__overlay" />
        <div className="shell hero__content">
          <div className="hero__text">
            <h1>Campers of your dreams</h1>
            <p>You can find everything you want in our catalog</p>
          </div>
          <Link href="/catalog" className="button hero__button">
            View Now
          </Link>
        </div>
      </section>
    </main>
  );
}
