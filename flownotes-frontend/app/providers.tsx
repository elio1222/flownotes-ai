import React from "react";
import { MantineProvider } from '@mantine/core';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  );
}
