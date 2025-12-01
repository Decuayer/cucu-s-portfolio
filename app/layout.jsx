import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

import AuthProvider from "@/components/AuthProvider";

// Components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Cucu's Portfolio",
  description: "Demir Cucu's portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />

          <Header />
          <StairTransition />
          <PageTransition>{children}</PageTransition>
        </AuthProvider>
      </body>
    </html>
  );
}
