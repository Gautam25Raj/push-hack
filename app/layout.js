import { Inter } from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";

import ReduxProvider from "@/providers/ReduxProvider";
import { WagmiProvider } from "@/providers/WagmiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Push Meets",
  description:
    "Meeting scheduling made easy. Push Meets is a simple and easy-to-use meeting scheduling tool that helps you schedule meetings with your team, clients, and anyone else.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <WagmiProvider>
            <Toaster />
            {children}
          </WagmiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
