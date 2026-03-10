import { TriptychHero } from "@/components/TriptychHero";
import { HomePageClient } from "@/components/HomePageClient";

export default function HomePage() {
  return (
    <HomePageClient>
      <main className="relative h-[var(--app-vh,100dvh)] w-full overflow-hidden">
        <TriptychHero />
      </main>
    </HomePageClient>
  );
}
