import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy — Makuo Ifedike",
  description:
    "How inquiry details sent through the Makuo Ifedike portfolio are used.",
  alternates: {
    canonical: "https://makuo-ifedike.vercel.app/privacy",
  },
};

const headingClass = "mt-10 font-display text-2xl font-bold text-white";
const bodyClass = "mt-3 text-sm leading-7 text-foreground";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[760px] px-5 py-24">
        <Link
          href="/"
          className="text-sm font-semibold text-primary transition-colors hover:text-white"
        >
          &larr; Back to the portfolio
        </Link>

        <h1 className="mt-8 font-display text-4xl font-bold text-white sm:text-5xl">
          Privacy
        </h1>
        <p className={bodyClass}>
          This page explains what happens to the details you send through the
          inquiry form on this portfolio.
        </p>

        <h2 className={headingClass}>What I collect</h2>
        <p className={bodyClass}>
          Your name, email address, the type of work you need, budget range,
          timeline, your message, and an optional project link. The form also
          records that you agreed to this notice.
        </p>

        <h2 className={headingClass}>Why I collect it</h2>
        <p className={bodyClass}>
          Only to read your inquiry and reply to you. Nothing else.
        </p>

        <h2 className={headingClass}>Where it goes</h2>
        <p className={bodyClass}>
          Submissions are delivered to a private Google Sheet, an email inbox,
          and a WhatsApp alert to me. The email service also sends you an
          automatic reply confirming that the inquiry arrived. These services
          process the details only to deliver the message.
        </p>

        <h2 className={headingClass}>What I do not do</h2>
        <p className={bodyClass}>
          I do not sell your details, add you to a mailing list, or use them for
          advertising. This site does not use advertising cookies.
        </p>

        <h2 className={headingClass}>How long I keep it</h2>
        <p className={bodyClass}>
          Inquiry records are kept only as long as needed to reply and follow
          up. You can ask me to delete yours at any time.
        </p>

        <h2 className={headingClass}>Contact</h2>
        <p className={bodyClass}>
          Email{" "}
          <a
            href="mailto:mifedike@gmail.com"
            className="text-primary underline transition-colors hover:text-white"
          >
            mifedike@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
