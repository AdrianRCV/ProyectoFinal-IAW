import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
      <Footer/>
    </html>
  );
}
