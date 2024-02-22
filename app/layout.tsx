import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";
import LocaleProvider from "@/providers/locale-provider";
import { getLocale, getMessages, getTimeZone } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "E-Commerce Dashboard",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const messages = await getMessages();
  const timeZone = await getTimeZone();
  const locale = await getLocale();

  return (
    <LocaleProvider locale={locale} messages={messages} timeZone={timeZone}>
      <ClerkProvider>
        <html lang={locale}>
          <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ToastProvider />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </LocaleProvider>
  );
}
