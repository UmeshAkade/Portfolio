"use client";
import "./globals.css";
import { Poppins } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head>
        {/* Add any metadata or link tags here */}
        <title>My App</title>
        <meta name='description' content='An awesome app' />
      </Head>
      <body
        className={`${poppins.className} font-poppins bg-gray-100/50 dark:bg-grey-900 text-black dark:text-white overflow-x-hidden`}
      >
        <ThemeProvider attribute='class' defaultTheme='light'>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

// "use client";
// import "./globals.css";
// import { Poppins } from "@next/font/google";
// import { ThemeProvider } from "next-themes";
// import { Analytics } from "@vercel/analytics/react";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800"],
//   variable: "--font-poppins",
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang='en'>
//       <head />
//       <ThemeProvider attribute='class' defaultTheme='light'>
//         <body
//           className={`${poppins.className} font-poppins bg-gray-100/50 dark:bg-grey-900 text-black dark:text-white overflow-x-hidden`}
//         >
//           {/* <body className='bg-gray-100/50 dark:bg-grey-900 text-black dark:text-white overflow-x-hidden'> */}
//           {children}
//           <Analytics />
//         </body>
//       </ThemeProvider>
//     </html>
//   );
// }
