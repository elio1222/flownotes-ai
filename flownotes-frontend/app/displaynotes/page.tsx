"use client";
import { useEffect, useState } from "react";
import { Card, Text, Stack } from "@mantine/core";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);//this is not good practice but we are speeding through

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/read/notes");
        if (res.ok) {
          const data = await res.json();
          setNotes(data);
        } else {
          console.error("Failed to fetch notes");
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div id="display-notes-page-display">
      <Stack align="center" gap="md" style={{ padding: '100px 0' }}>
        {notes.map((note) => (
        <Card
          key={note.id} 
          shadow="sm"
          radius="md"
          withBorder
          style={{ width: "60%", backgroundColor: "#f9f9f9", marginBottom: "20px" }}
        >
          <Text size="xl" fw={700} c="dark" className="typed-out">
            {note.title}
          </Text>
          <div
            style={{
              marginTop: "10px",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              minHeight: "150px",
            }}
          >
            {note.text}
          </div>
        </Card>
        ))}
      </Stack>
    </div>
  );
}