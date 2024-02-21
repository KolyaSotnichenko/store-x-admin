"use client";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

export default function LocaleProvider({
  children,
  locale,
  messages,
  timeZone,
}: {
  locale: string;
  children: ReactNode;
  messages: AbstractIntlMessages;
  timeZone: string;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
      {children}
    </NextIntlClientProvider>
  );
}
