import { redirect } from "next/navigation";

export default function Home() {
  // The adapted Andle portfolio is a static HTML file in /public.
  // Redirect to it so the engagement layer + Andle CSS/JS all load
  // exactly as they do in the original template.
  redirect("/andle-portfolio.html");
}