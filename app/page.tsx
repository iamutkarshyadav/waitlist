import Hero from "@/components/ui/Hero";
import AtsVision from "@/components/ui/AtsVision";
import FeatureCards from "@/components/ui/FeatureCards";
import VisualStory from "@/components/ui/VisualStory";
import WaitlistForm from "@/components/ui/WaitlistForm";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <AtsVision />
      <FeatureCards />
      <VisualStory />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
