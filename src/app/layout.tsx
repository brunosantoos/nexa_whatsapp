import "./globals.css";

export const metadata = {
  title: "Nexa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
