import { Inter } from "next/font/google";
import { CurriculumProvider } from "@/contexts/CurriculumContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Curriculum Maker",
  description:
    "Monte seu currículo vencedor de forma gratuita e rápida, seguindo as melhores práticas do mercado.",
  icons: {
    icon: "/cvMakerLogo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans">
        <CurriculumProvider>{children}</CurriculumProvider>
      </body>
    </html>
  );
}
