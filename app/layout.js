import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="">
          <Provider>
            <Toaster />
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
