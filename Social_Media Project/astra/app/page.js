'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useRef, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";

export default function Home() {
  useEffect(() => {
    window.location.href = '/Astra/home.html';
  }, []);
  const clicksRef = useRef(0);
  const handleClick = () => {
    clicksRef.current += 1;
    console.log(clicksRef == clicksRef.current);
  }

  return (
    <div className={styles.container}>
      <p>Cllicks:{clicksRef.current}</p>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
