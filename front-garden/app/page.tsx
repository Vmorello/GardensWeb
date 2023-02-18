import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>

      <main className={styles.main}>
        <div className={styles.center}>
          <div className={styles.thirteen}>
            Welcome
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

        </div>
      </main>
    </>
  )
}
