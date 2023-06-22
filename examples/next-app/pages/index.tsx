import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const signup = async () => {
    await fetch(`http://localhost:3000/api/signup`);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "45%",
        transform: "translate(0px, -50%)",
      }}
    >
      <button onClick={signup}>Signup to Lawg</button>
    </div>
  );
}
