import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import StoreProvider from "@/store/store_provider";
import AuthProvider from "@/views/auth_provider/auth_provider";
import Header from "@/views/header/header";
import BlogProvider from "@/views/blog_provider/blog_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogskitter - The Only Coding Blog You need",
  description: "This is your one stop solution as a developer",
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
            </BlogProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
