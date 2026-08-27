import type { Metadata } from "next";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { DiagramViewerProvider } from "@/components/DiagramViewer";
import ContentGuard from "@/components/ContentGuard";

export const metadata: Metadata = {
  title: "OneTrust — AI Platform Proposal",
  description: "A proposal for OneTrust's AI Platform & Emerging Products function.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ContentGuard />
        <DiagramViewerProvider>{children}</DiagramViewerProvider>
      </body>
    </html>
  );
}
