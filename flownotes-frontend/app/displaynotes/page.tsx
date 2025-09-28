"use client";
import { useEffect, useState } from "react";
import { Card, Text, Stack } from "@mantine/core";

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);

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
    <Stack align="center" mt="xl" style={{ paddingTop: "300px" }}>
      {notes.map((note) => (
        <Card
          key={note.id} // ✅ unique key
          shadow="sm"
          radius="md"
          withBorder
          style={{ width: "60%", backgroundColor: "#f9f9f9", marginBottom: "20px" }}
        >
          <Text size="xl" fw={700} c="dark">
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
  );
}