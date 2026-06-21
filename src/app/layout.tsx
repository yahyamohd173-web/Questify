'use client';

import type { ReactNode } from 'react';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Questify - Level Up Your Life</title>
        <meta name="description" content="Track personal growth through RPG-style gamification" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
