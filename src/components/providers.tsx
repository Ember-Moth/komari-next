"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { RPC2Provider } from "@/contexts/RPC2Context"
import { PublicInfoProvider } from "@/contexts/PublicInfoContext"
import { Toaster } from "@/components/ui/sonner"
import { OfflineIndicator } from "@/components/OfflineIndicator"
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt"
import { PWAUpdatePrompt } from "@/components/PWAUpdatePrompt"
import "@/i18n/config"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RPC2Provider>
         <PublicInfoProvider>
            {children}
            <Toaster />
            <OfflineIndicator />
            <PWAInstallPrompt />
            <PWAUpdatePrompt />
         </PublicInfoProvider>
      </RPC2Provider>
    </NextThemesProvider>
  )
}
