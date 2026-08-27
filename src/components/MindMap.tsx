"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Handle,
  Position,
  NodeProps,
  BackgroundVariant,
} from "@xyflow/react";
import { useRouter } from "next/navigation";
import { Compass, Layers, Network, Award, Flag, Sparkles } from "lucide-react";

type MapNodeData = {
  label: string;
  sublabel: string;
  href?: string;
  icon?: keyof typeof ICONS;
  variant: "root" | "section" | "leaf";
};

const ICONS = {
  Compass,
  Layers,
  Network,
  Award,
  Flag,
  Sparkles,
};

function MapNode({ data }: NodeProps) {
  const d = data as unknown as MapNodeData;
  const Icon = d.icon ? ICONS[d.icon] : undefined;

  const base =
    d.variant === "root"
      ? "bg-primary text-white border-none shadow-md"
      : d.variant === "section"
        ? "card card-hover border-primary-soft"
        : "card border-base";

  return (
    <div
      className={`${base} rounded-xl px-4 py-3 transition-all w-full h-full`}
      style={{ cursor: d.href ? "pointer" : "default" }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <div className="flex items-start gap-2">
        {Icon && <Icon size={15} className={`shrink-0 mt-0.5 ${d.variant === "root" ? "text-white" : "c-primary"}`} />}
        <div className={`font-semibold leading-snug ${d.variant === "root" ? "text-sm" : "text-xs"}`}>
          {d.label}
        </div>
      </div>
      {d.sublabel && (
        <div className={`text-xs mt-1 ${d.variant === "root" ? "text-white/80" : "c-muted"}`}>
          {d.sublabel}
        </div>
      )}
    </div>
  );
}

const nodeTypes = { mapNode: MapNode };

const nodes: Node[] = [
  {
    id: "root",
    type: "mapNode",
    position: { x: 0, y: 320 },
    width: 240,
    height: 72,
    data: {
      label: "AI Platform Proposal",
      sublabel: "OneTrust — HP",
      variant: "root",
      icon: "Sparkles",
    },
  },
  {
    id: "context",
    type: "mapNode",
    position: { x: 340, y: 0 },
    width: 200,
    height: 64,
    data: {
      label: "Context & Experience",
      sublabel: "What Sriram and DV asked",
      href: "/",
      variant: "section",
      icon: "Compass",
    },
  },
  {
    id: "architecture",
    type: "mapNode",
    position: { x: 340, y: 160 },
    width: 200,
    height: 64,
    data: {
      label: "Architecture",
      sublabel: "Functional + technical links",
      href: "/architecture",
      variant: "section",
      icon: "Network",
    },
  },
  {
    id: "references",
    type: "mapNode",
    position: { x: 340, y: 320 },
    width: 200,
    height: 64,
    data: {
      label: "References & POV",
      sublabel: "Testimonials, operating model, close",
      href: "/references",
      variant: "section",
      icon: "Award",
    },
  },
  {
    id: "operating-model",
    type: "mapNode",
    position: { x: 340, y: 480 },
    width: 200,
    height: 64,
    data: {
      label: "Operating Model",
      sublabel: "Two options, one path",
      href: "/references",
      variant: "section",
      icon: "Layers",
    },
  },
  // Context leaves
  { id: "ctx-1", type: "mapNode", position: { x: 680, y: -60 }, width: 190, height: 56, data: { label: "No new market without a parallel structure", sublabel: "", variant: "leaf" } },
  { id: "ctx-2", type: "mapNode", position: { x: 680, y: 60 }, width: 190, height: 56, data: { label: "$400M ambition, AEP + CPS", sublabel: "", variant: "leaf" } },
  // Architecture leaves
  { id: "arch-1", type: "mapNode", position: { x: 680, y: 130 }, width: 190, height: 56, data: { label: "Context Layer — HP's ownership area", sublabel: "", variant: "leaf" } },
  { id: "arch-2", type: "mapNode", position: { x: 680, y: 220 }, width: 190, height: 56, data: { label: "Marketecture ↔ engineering crosswalk", sublabel: "", variant: "leaf" } },
  // References leaves
  { id: "ref-1", type: "mapNode", position: { x: 680, y: 290 }, width: 190, height: 56, data: { label: "Adobe: $4B → $19B+ platform", sublabel: "", variant: "leaf" } },
  { id: "ref-2", type: "mapNode", position: { x: 680, y: 380 }, width: 190, height: 56, data: { label: "Silver Labs: 12x production speed", sublabel: "", variant: "leaf" } },
  // Operating model leaves
  { id: "om-1", type: "mapNode", position: { x: 680, y: 450 }, width: 190, height: 56, data: { label: "Field CTO in Sriram's team", sublabel: "Recommended", variant: "leaf" } },
  { id: "om-2", type: "mapNode", position: { x: 680, y: 540 }, width: 190, height: 56, data: { label: "Distinguished Architect, core eng", sublabel: "", variant: "leaf" } },
];

const edgeStyle = { stroke: "var(--border-bright)", strokeWidth: 1.5 };
const dashedEdgeStyle = { stroke: "var(--border-bright)", strokeWidth: 1, strokeDasharray: "3 3" };

const edges: Edge[] = [
  { id: "e-root-ctx", source: "root", target: "context", style: edgeStyle },
  { id: "e-root-arch", source: "root", target: "architecture", style: edgeStyle },
  { id: "e-root-ref", source: "root", target: "references", style: edgeStyle },
  { id: "e-root-om", source: "root", target: "operating-model", style: edgeStyle },
  { id: "e-ctx-1", source: "context", target: "ctx-1", style: dashedEdgeStyle },
  { id: "e-ctx-2", source: "context", target: "ctx-2", style: dashedEdgeStyle },
  { id: "e-arch-1", source: "architecture", target: "arch-1", style: dashedEdgeStyle },
  { id: "e-arch-2", source: "architecture", target: "arch-2", style: dashedEdgeStyle },
  { id: "e-ref-1", source: "references", target: "ref-1", style: dashedEdgeStyle },
  { id: "e-ref-2", source: "references", target: "ref-2", style: dashedEdgeStyle },
  { id: "e-om-1", source: "operating-model", target: "om-1", style: dashedEdgeStyle },
  { id: "e-om-2", source: "operating-model", target: "om-2", style: dashedEdgeStyle },
];

export default function MindMap() {
  const router = useRouter();

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const data = node.data as unknown as MapNodeData;
      if (data.href) router.push(data.href);
    },
    [router]
  );

  return (
    <div style={{ height: "620px" }} className="rounded-xl border border-base bg-surface-2 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--border)" />
        <Controls showInteractive={false} />
        <MiniMap
          pannable
          zoomable
          maskColor="rgba(15,23,42,0.06)"
          nodeColor="var(--border-bright)"
          style={{ background: "var(--surface)", width: 120, height: 90 }}
        />
      </ReactFlow>
    </div>
  );
}
