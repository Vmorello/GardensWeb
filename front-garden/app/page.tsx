import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>

      <main className={styles.main}>
        {/* <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div> */}

        <div className={styles.center}>
          {/* <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          /> */}
          <div className={styles.thirteen}>
            Welcome 
            {/* <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            /> */}
          </div>
        </div>

        <div className={styles.grid}>
          <Link
            href="/tentowns"
            className={styles.card}
            // target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Ten Towns<span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              A map making tool with a journal & inner maps
            </p>
          </Link>

          <Link
            href="/plot"
            className={styles.card}
            //target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              GotPlant <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Plan a garden
            </p>
          </Link>
{/* 
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a> */}
        </div>
      </main>
    </>
  )
}
