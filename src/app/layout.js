import { Poppins } from 'next/font/google'
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';;

const poppins = Poppins({   weight: ['400', '700'],
subsets: ['latin']});

export const metadata = {
  title: "BotFactory",
  description: "App made for Hr Bot Factory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        stacked
        />
      </body>
    </html>
  );
}

