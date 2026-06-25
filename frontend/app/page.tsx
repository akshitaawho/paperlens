"use client";

import { useEffect, useState } from "react";

export default function Home() {

    const [message, setMessage] = useState("Loading...");

    useEffect(() => {

        fetch("http://127.0.0.1:8000/")
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
            });

    }, []);

    return (

        <main
            style={{
                padding: "40px",
                fontFamily: "Arial"
            }}
        >

            <h1>PaperLens</h1>

            <h2>Backend says:</h2>

            <p>{message}</p>

        </main>

    );

}