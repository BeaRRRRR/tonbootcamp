'use client'

import { TonConnectButton } from "@tonconnect/ui-react";
import Link from "next/dist/client/link";

export default function Header() {
  return (
    <div className="flex items-center">
      <div className="mt-4 flex left-auto">
        <Link href="/create">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-telegram-primary px-3 py-2 text-sm font-semibold text-telegram-primary-text shadow-sm"
        >
          New Personal Card
        </button>
        </Link>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-telegram-primary px-3 py-2 text-sm font-semibold text-telegram-primary-text shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          New Business Card
        </button>
        <TonConnectButton />
      </div>
    </div>
  )
}
