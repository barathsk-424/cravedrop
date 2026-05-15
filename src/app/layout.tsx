import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "CraveDrop — Premium Restaurant & Ordering",
    template: "%s | CraveDrop",
  },
  description:
    "Experience premium dining with online ordering, live tracking, QR table ordering, and more. Fresh ingredients, authentic flavors, delivered to your doorstep.",
  keywords: [
    "restaurant",
    "food ordering",
    "online delivery",
    "dine-in",
    "premium food",
    "QR ordering",
  ],
  authors: [{ name: "CraveDrop" }],
  openGraph: {
    title: "CraveDrop — Premium Restaurant & Ordering",
    description: "Fresh ingredients, authentic flavors, delivered to your doorstep.",
    type: "website",
    locale: "en_IN",
    siteName: "CraveDrop",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF5722" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1E1E" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <QueryProvider>
          <ThemeProvider>
            {children}
            <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-lg)",
                fontSize: "14px",
                fontFamily: "var(--font-inter)",
              },
            }}
          />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
