"use client";

import { useEffect, useState } from "react";
import { Card, Text, Stack, Loader, Button } from "@mantine/core";

interface NoteSummary {
  summary_data: string;
}

export default function NotesPage() {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
  const fetchSummary = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/read/note"); 
      if (!res.ok) throw new Error("Failed to fetch summary");
      const data = await res.json();
      setSummary(data.summary?.response || "No summary available.");
    } catch (err) {
      console.error("Error fetching summary:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchSummary();
}, []);

const handleSummarize = async () => {
  setSummarizing(true);
  try {
    const res = await fetch("http://127.0.0.1:8000/read/note"); 
    if (!res.ok) throw new Error("Failed to summarize");
    const data = await res.json();
    setSummary(data.summary?.response || "No summary available.");
  } catch (err) {
    console.error("Error summarizing note:", err);
  } finally {
    setSummarizing(false);
  }
};

  if (loading) return <Loader />;

  return (
    <Stack align="center" mt="xl" style={{ paddingTop: "100px" }}>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{ width: "60%", backgroundColor: "#f9f9f9" }}
      >
        <Text size="xl" fw={700} c="dark">
          Note Summary
        </Text>
        <div
          style={{
            marginTop: "10px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            minHeight: "150px",
            whiteSpace: "pre-wrap",
          }}
        >
          {summary || "No summary available."}
        </div>
        <Button
          mt="md"
          onClick={handleSummarize}
          loading={summarizing}
          variant="filled"
          color="purple"
        >
          Summarize Again
        </Button>
      </Card>
    </Stack>
  );
}
