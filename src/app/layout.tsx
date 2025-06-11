"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import theme from "../theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { usePathname } from 'next/navigation';
import CustomBottomNavigation from "./presentation/components/BottomNavigation/BottomNavigation";
import GenericSidebar from "./presentation/components/Sidebar/GenericSidebar";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname(); 

  const showBottomNavigation = pathname === '/diario' || pathname === '/informacoes';
  const showSideBar = pathname !== '/dashboard/login' && pathname.startsWith('/dashboard');
  return (
    <html lang="en">
      <head>
        <title>{`${metadata.title as string} | ${metadata.description as string}`}</title>
      </head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className}>
          <div style={showSideBar ? { display: 'flex', width: '100%', height:'100%' } : undefined}>
            {showSideBar && (
              <div style={{ flex: '0 0 25%' }}>
                <GenericSidebar />
              </div>
            )}
            <div style={{ flex: showSideBar ? '0 0 65%' : '100%', maxWidth: showSideBar ? '100%' : '450px', margin: pathname.startsWith('/dashboard') ? 'none' : 'auto' }}>
              {children}
            </div>
          </div>
          {showBottomNavigation && <CustomBottomNavigation />} 
        </body>
      </ThemeProvider>
    </html>
  );
}