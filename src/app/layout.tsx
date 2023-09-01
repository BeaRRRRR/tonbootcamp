'use client'

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Script from 'next/script'
import './globals.css'
import type { Metadata } from 'next'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-telegram-white p-3">
       <TonConnectUIProvider manifestUrl="https://gist.githubusercontent.com/BeaRRRRR/3ad8721a99d2a5a6bc357c08d4d50a28/raw/0cb25d783306350ff69ece093820a2d7db1ce884/tonconnect-manifest.json">
         {children}
        </TonConnectUIProvider>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
      </body>
    </html>
  )
}
