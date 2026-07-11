import CinematicIntro from "@/components/CinematicIntro";
import InvitationCard from "@/components/InvitationCard";
import Footer from "@/components/Footer";
import InviteReveal from "@/components/InviteReveal";
import FallingPetals from "@/components/decor/FallingPetals";

export const metadata = {
  title: "You're Invited | Shravan Kumar weds Sai Priya",
  description:
    "Join us to celebrate the wedding of Shravan Kumar and Sai Priya — schedule, venue and directions.",
};

export default function InvitePage() {
  return (
    <InviteReveal>
      <main>
        <CinematicIntro />
        <div className="relative">
          <FallingPetals />
          <InvitationCard />
          <Footer />
        </div>
      </main>
    </InviteReveal>
  );
}
