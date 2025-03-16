import Navbar from "@/components/shared/Navbar";
import { Footer } from "@/components/ui/footer";
import { Hexagon, Github, Twitter } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <Navbar />
      <main>
        {children}
      </main>
      <Footer
        logo={<Hexagon className="h-10 w-10" />}
        brandName="Awesome Corp"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com",
            label: "Twitter",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com",
            label: "GitHub",
          },
        ]}
        mainLinks={[
          { href: "/products", label: "Products" },
          { href: "/about", label: "About" },
          { href: "/blog", label: "Blog" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{
          text: "© 2024 Awesome Corp",
          license: "All rights reserved",
        }}
      />
    </>
  );
}
