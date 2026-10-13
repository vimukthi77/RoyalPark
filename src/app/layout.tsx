import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Preloader } from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Royal Park Condominium | Management System",
  description:
    "Enterprise-grade, high-end residence and apartment management platform for Royal Park Condominium twin towers.",
  keywords: [
    "Royal Park Condominium",
    "Apartment Management System",
    "Colombo Luxury Condos",
    "Twin Towers Facilities",
    "Condo ERP",
  ],
  authors: [{ name: "Royal Park Management" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        <Providers>
          <Preloader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
