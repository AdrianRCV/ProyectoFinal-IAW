import "./globals.css";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

