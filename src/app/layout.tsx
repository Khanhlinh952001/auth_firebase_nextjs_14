"use client"
import { AuthProvider } from '@/contexts/AuthContext';
import localFont from 'next/font/local';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline,ThemeProvider } from '@mui/material';
import theme from '@/styles/theme';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <AuthProvider>
        <ThemeProvider theme={theme} >

        <CssBaseline />
         {children}
        <ToastContainer /> 
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
