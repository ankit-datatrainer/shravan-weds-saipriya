import Hero from "@/components/Hero";
import SaveTheDate from "@/components/SaveTheDate";
import Events from "@/components/Events";
import Venue from "@/components/Venue";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";
import InviteReveal from "@/components/InviteReveal";

export default function Home() {
  return (
    <InviteReveal>
      <main>
        <Hero />
        <SaveTheDate />
        <Events />
        <Venue />
        <Rsvp />
        <Footer />
      </main>
    </InviteReveal>
  );
}
