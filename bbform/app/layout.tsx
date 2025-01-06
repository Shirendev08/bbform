import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mobile Legends Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  {/* <title>Compass</title> */}

  <meta property="og:type" content="website" />
  {/* <meta property="og:title" content="Compass community card" /> */}
  {/* <meta property="og:description"
    content="Залуус өөрсдийн тодорхойлсон зорилгынхоо төлөө хөдөлмөрлөж байгаа энэ үед өдөр тутмын амьдралд нь, боловсролд нь, хүрээлэлд нь хөтөч болох Compass Community Card" />
   <meta property="og:image" content="/images/compass.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" /> */}


  <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>

  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&family=Work+Sans:wght@600&display=swap"
    rel="stylesheet" />

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  <link href="assets/lightbox/css/lightbox.min.css" rel="stylesheet" />
</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
