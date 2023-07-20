"use client";

import React, { useState } from "react";

import MainMint from "../app/components/MainMint";
import Navbar from "../app/components/Navbar";

export default function Home() {
  const [accounts, setAccounts] = useState("");

  return (
    <main className="min-h-screen overflow-hidden bg-[url(../../public/parallax-bg.gif)] bg-cover bg-center bg-no-repeat">
      <Navbar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} />
    </main>
  );
}
