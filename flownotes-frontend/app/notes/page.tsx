"use client";

import { useEffect, useState } from "react";
import { Card, Text, Stack, Button, Anchor } from "@mantine/core";
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  text: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/read/note"); // adjust to your backend
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [])

  return (
    <Stack align="center" mt="xl" style={{ paddingTop: "300px" }}>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{ width: "60%", backgroundColor: "#f9f9f9" }}
      >
        <Text size="xl" fw={700} c="dark" className="typed-out">
          Untitled
        </Text>
        <div
          style={{
            marginTop: "10px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            minHeight: "150px",
            position: "relative"
          }}
        >
          {notes ? notes.text : "Loading..."}
          <Anchor href="/displaynotes">
            <Button
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                padding: "10px 20px",
                backgroundColor: "#73006b",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = "#a6008c")}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = "#73006b")}
            >
              Read All Notes
            </Button>
          </Anchor>
        </div>
      </Card>
    </Stack>
  );
}