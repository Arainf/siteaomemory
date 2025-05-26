import Document, { Head, Html, Main, NextScript } from "next/document";
import Image from "next/image";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Share and relive your precious memories with Siteao Memory Lane."
          />
          <meta property="og:site_name" content="Siteao Memory Lane" />
          <meta
            property="og:description"
            content="Share and relive your precious memories with Siteao Memory Lane."
          />
          <meta property="og:title" content="Siteao Memory Lane" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Siteao Memory Lane" />
          <meta
            name="twitter:description"
            content="Share and relive your precious memories with Siteao Memory Lane."
          />
        </Head>
        <body className="bg-gradient-to-b from-orange-500 to-orange-400 h-auto antialiased overflow-x-hidden ">
        
        <nav className="fixed top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
            <Image src="/assets/img/logo.png" alt="Logo" width={100} height={100} />
          </div>
        </div>

        {/* Navigation Links - Centered with Glassmorphism Effect */}
        <div className="flex-grow flex  justify-end">
          <div >
            <ul className="flex items-center">
              <li>
                <a href="/" className="text-white border rounded-full px-5 py-2 font-century font-bold hover:text-black transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white border rounded-full px-5 py-2 font-century font-bold hover:text-black transition-colors duration-300">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>


      </nav>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
