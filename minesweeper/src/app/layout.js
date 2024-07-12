export const metadata = {
  title: "Minesweeper",
  description: "Retro version of the classic minesweeper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
