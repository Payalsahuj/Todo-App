"use client";
import { useState } from "react";
import { Header } from "./Component/Header";

export default function Home() {
  const [userList, setUserList] = useState([]);
  return (
    <div className=" app-container ">
      <Header />
      <main className="app-main">hb</main>
    </div>
  );
}
