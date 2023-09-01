'use client'

import Card from "@/components/Card";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [card, setCard] = useState(null);

  async function fetchData() {
    const data = await fetch('https://api.jsonbin.io/v3/b/64f14f498d92e126ae658a93/latest')
    const json = await data.json()
    console.log(json)

    if(json.record.name) setCard(json.record)
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(card)

  return (
    <main>
      <Header/>
      {card && <Card name={card?.name} work={card?.work} about={card?.description} imgUrl={card?.imageUrl}/> }
    </main>
  )
}
