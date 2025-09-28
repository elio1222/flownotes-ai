"use client";

import { useEffect, useState } from "react";
import { Card, Text, Stack, Loader } from "@mantine/core";
import Link from "next/link";

interface NoteSummary {
  assemblyai_response: string;
  summary: string;
}

export default function NotesPage() {
  const [note, setNote] = useState<NoteSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/read/note"); // your backend endpoint
        if (!res.ok) throw new Error("Failed to fetch note");
        const data: NoteSummary[] = await res.json(); // expect an array
        setNote(data.length ? data[data.length - 1] : null); // pick last note
      } catch (err) {
        console.error("Error fetching note:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, []);

  if (loading) return <Loader />;

  return (
    <Stack align="center" mt="xl" style={{ paddingTop: "300px" }}>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{ width: "60%", backgroundColor: "#f9f9f9" }}
      >
        <Text size="xl" fw={700} c="dark">
          Summary
        </Text>
        <div
          style={{
            marginTop: "10px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            minHeight: "150px",
            position: "relative",
            whiteSpace: "pre-wrap",
          }}
        >
          {note?.summary || "No summary available."}

          <Link href="/displaynotes">
            <button
              style={{
                position: "absolute",
                bottom: "0px",
                right: "3px",
                backgroundColor: "#73006b",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#a6008c")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#73006b")}
            >
              Read All Notes
            </button>
          </Link>

          <Link href="/summarize">
            <button
              style={{
                position: "absolute",
                bottom: "0px",
                left: "3px",
                backgroundColor: "#73006b",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#a6008c")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#73006b")}
            >
              Summarize
            </button>
          </Link>
        </div>
      </Card>
    </Stack>
  );
}
