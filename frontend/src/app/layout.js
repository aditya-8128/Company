import "./globals.css";

export const metadata = {
  title: "Armatrix — Meet the Team",
  description:
    "Meet the talented people behind Armatrix, an AI-first enterprise automation platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
