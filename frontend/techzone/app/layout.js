import "./globals.css";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}