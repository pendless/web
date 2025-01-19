import Head from "next/head";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sponsors from "../components/Sponsors";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import ChangingText from "../components/ChangingText";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <NextSeo
        title="pendless"
        description="pendless – don't stay waiting"
        canonical="https://pendless.fun/"
        openGraph={{
          url: "https://pendless.fun/",
          title: "pendless",
          description: "pendless – don't stay waiting",
          images: [
            {
              url: "",
            },
          ],
          site_name: "pendless",
        }}
        twitter={{
          handle: "@pendless",
          site: "https://pendless.fun/",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <div className="w-full pb-5 mx-auto text-center md:w-11/12 relative">
            {/* <h1
              className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-black text-gray-200 dark:text-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 opacity-50"
              style={{ fontFamily: "Archivo Black, sans-serif" }}
            >
              ...less
            </h1> */}
            <h1 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 relative z-10">
              Why should you wait for
              <div className="h-[2vh]"></div>
              <div className="text-4xl sm:text-6xl md:text-8xl whitespace-nowrap">
                <ChangingText />
              </div>
            </h1>
            <p className="max-w-xl pt-5 mx-auto text-lg text-gray-600 dark:text-gray-400 md:text-lg">
              don&apos;t stay waiting, get the best computers for your needs
            </p>
            <div className="mt-6 text-center md:ml-6 relative z-50">
              <a
                className="inline-flex items-center px-5 py-3 text-sm font-medium text-gray-300 transition duration-300 bg-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 dark:text-gray-700 dark:bg-white relative z-50"
                aria-label="learn more"
                rel="noreferrer"
                href="https://github.com/pendless/"
              >
                <span className="flex justify-center">GitHub Link</span>
              </a>
              <br className="sm:hidden" />
              <Link href="404">
                <a
                  className="inline-flex items-center px-5 py-3 mt-2 ml-0 text-sm font-medium text-gray-700 transition duration-300 border rounded shadow dark:hover:border-gray-500 hover:shadow-md md:ml-2 dark:text-gray-300 relative z-50"
                  aria-label="learn more"
                >
                  <span className="flex justify-center">See a Demo</span>
                </a>
              </Link>
            </div>
            <div className="terminal-loader">
              <div className="terminal-header">
                <div className="terminal-title">PENDLESS</div>
                <div className="terminal-controls">
                  <div className="control close"></div>
                  <div className="control minimize"></div>
                  <div className="control maximize"></div>
                </div>
              </div>
              <div className="text">pending...</div>
            </div>
            <style>{`
  @keyframes blinkCursor {
  50% {
    border-right-color: transparent;
  }
}

@keyframes typeAndDelete {
  0%,
  10% {
    width: 0;
  }
  45%,
  80% {
    width: 6.2em;
  } /* adjust width based on content */
  100% {
    width: 6.2;
  }
}

  .terminal-loader {
    display: block;
    margin: 0 auto; /* Center horizontally */
    background-color: #1a1a1a;
    color: #0f0;
    font-family: "Courier New", Courier, monospace;
    font-size: 1em;
    padding: 1.5em 1em;
    width: 12em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    /* Center vertically if parent has height */
    position: relative;
    transform: translateY(50%);
  }

.terminal-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1.5em;
  background-color: #333;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 0 0.4em;
  box-sizing: border-box;
}

.terminal-controls {
  float: right;
}

.control {
  display: inline-block;
  width: 0.6em;
  height: 0.6em;
  margin-left: 0.4em;
  border-radius: 50%;
  background-color: #777;
}

.control.close {
  background-color: #e33;
}

.control.minimize {
  background-color: #ee0;
}

.control.maximize {
  background-color: #0b0;
}

.terminal-title {
  float: left;
  line-height: 1.5em;
  color: #eee;
}

.text {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.2em solid green; /* Cursor */
  animation:
    typeAndDelete 4s steps(11) infinite,
    blinkCursor 0.5s step-end infinite alternate;
  margin-top: 1.5em;
}
`}</style>
          </div>
          <div className="relative w-full py-10 mx-auto text-center md:py-32 md:my-12 md:w-10/12">
            <div className="relative z-10">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://unsplash.com/photos/e9TrFZZ72DQ"
              >
                <img
                  className="transition duration-700 shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105"
                  src="/images/placeholder.webp"
                  alt="Placeholder Image"
                />
              </a>
            </div>
            <p className="z-10 my-8 text-sm font-medium text-gray-500">
              Maybe we&apos;re bringing brightness too?
            </p>
          </div>
        </div>
        {/* <div
          style={{ backgroundImage: "url(/images/blur.png)" }}
          className="absolute inset-0 w-full h-full bg-bottom bg-no-repeat bg-cover -z-1"
        /> */}
      </section>
      <Sponsors />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
