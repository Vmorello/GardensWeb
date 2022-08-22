import { Link } from "@nextui-org/react";
import Head from "next/head";

export default function aboutPage(props){
    return (
        <>
        <Head>
            <title>About GotPlant</title>
        </Head>
        <div>
            <h1>About Us</h1>
            <p>What do you want to know huh?!</p>
            <Link href="/">jk jk, not done yet, lets go back </Link>
        </div>
        </>
    )
}