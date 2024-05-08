import { Inter } from 'next/font/google'
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BotFactory",
  description: "App made for Hr Bot Factory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <ToastContainer stacked/>
      </body>
    </html>
  );
}