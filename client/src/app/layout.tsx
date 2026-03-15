import type { Metadata } from 'next';
import { Epilogue, Red_Hat_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/modules/home/sections/Navbar';

const epilogue = Epilogue({
  variable: '--font-epilogue',
  subsets: ['latin'],
});

const redHatDisplay = Red_Hat_Display({
  variable: '--font-red-hat',
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: 'QuickHire | Job Board',
  description: 'Find your dream job easily on QuickHire.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${epilogue.variable} ${redHatDisplay.variable} antialiased bg-white mx-auto w-full overflow-x-hidden`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
