import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import StoreProvider from "@/store/store_provider";
import AuthProvider from "@/views/auth_provider/auth_provider";
import Header from "@/views/header/header";
import BlogProvider from "@/views/blog_provider/blog_provider";
import Footer from "@/views/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogskitter - Where readers and writers can leverage their knowledge",
  description:
    "Blogskitter is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <BlogProvider>
              <Header />
              {children}
              <Footer />
            </BlogProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
