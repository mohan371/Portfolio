"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { playTactileClick } from "@/lib/sound";
import { Database, Key, Link2, Search, Table, Code2, CheckCircle2 } from "lucide-react";

interface ColumnDef {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  references?: { table: string; column: string };
  isNullable?: boolean;
  isUnique?: boolean;
}

interface TableDef {
  id: string;
  name: string;
  category: "Fleet Telemetry" | "Enterprise Accounting";
  description: string;
  columns: ColumnDef[];
  indexes: string[];
}

const TABLES: TableDef[] = [
  {
    id: "vehicles",
    name: "vehicles",
    category: "Fleet Telemetry",
    description: "Core fleet registry storing vehicle hardware identifiers and operational status.",
    columns: [
      { name: "id", type: "UUID", isPk: true },
      { name: "vin", type: "VARCHAR(17)", isUnique: true },
      { name: "model", type: "VARCHAR(64)" },
      { name: "max_speed_kmh", type: "INT" },
      { name: "status", type: "VARCHAR(32)" },
      { name: "created_at", type: "TIMESTAMPTZ" },
    ],
    indexes: ["PRIMARY KEY (id)", "UNIQUE INDEX idx_vehicles_vin ON (vin)"],
  },
  {
    id: "geofence_zones",
    name: "geofence_zones",
    category: "Fleet Telemetry",
    description: "Spatial boundaries, polygon vertices, and speed restriction parameters.",
    columns: [
      { name: "id", type: "UUID", isPk: true },
      { name: "zone_code", type: "VARCHAR(32)", isUnique: true },
      { name: "zone_name", type: "VARCHAR(128)" },
      { name: "polygon_geom", type: "GEOMETRY(POLYGON, 4326)" },
      { name: "speed_limit_kmh", type: "INT" },
      { name: "is_active", type: "BOOLEAN" },
    ],
    indexes: [
      "PRIMARY KEY (id)",
      "INDEX idx_geofence_polygon ON USING GIST (polygon_geom)",
    ],
  },
  {
    id: "telemetry_events",
    name: "telemetry_events",
    category: "Fleet Telemetry",
    description: "High-frequency immutable log of vehicle ingress, egress, and telemetry pings.",
    columns: [
      { name: "id", type: "BIGSERIAL", isPk: true },
      {
        name: "vehicle_id",
        type: "UUID",
        isFk: true,
        references: { table: "vehicles", column: "id" },
      },
      {
        name: "zone_id",
        type: "UUID",
        isFk: true,
        references: { table: "geofence_zones", column: "id" },
        isNullable: true,
      },
      { name: "event_type", type: "VARCHAR(32)" },
      { name: "latitude", type: "DECIMAL(9,6)" },
      { name: "longitude", type: "DECIMAL(9,6)" },
      { name: "speed_kmh", type: "FLOAT" },
      { name: "recorded_at", type: "TIMESTAMPTZ" },
    ],
    indexes: [
      "PRIMARY KEY (id)",
      "INDEX idx_telemetry_veh_time ON (vehicle_id, recorded_at DESC)",
      "INDEX idx_telemetry_zone ON (zone_id) WHERE zone_id IS NOT NULL",
    ],
  },
  {
    id: "billing_invoices",
    name: "billing_invoices",
    category: "Enterprise Accounting",
    description: "Enterprise purchase orders and supplier invoices (Gabriel India domain model).",
    columns: [
      { name: "id", type: "UUID", isPk: true },
      { name: "invoice_number", type: "VARCHAR(32)", isUnique: true },
      { name: "vendor_code", type: "VARCHAR(16)" },
      { name: "subtotal_inr", type: "DECIMAL(12,2)" },
      { name: "tax_inr", type: "DECIMAL(12,2)" },
      { name: "status", type: "VARCHAR(32)" },
      { name: "booking_date", type: "DATE" },
    ],
    indexes: [
      "PRIMARY KEY (id)",
      "UNIQUE INDEX idx_invoices_num ON (invoice_number)",
      "INDEX idx_invoices_vendor_date ON (vendor_code, booking_date DESC)",
    ],
  },
  {
    id: "general_ledger_entries",
    name: "general_ledger_entries",
    category: "Enterprise Accounting",
    description: "Double-entry accounting journal lines for verified financial reconciliation.",
    columns: [
      { name: "id", type: "UUID", isPk: true },
      {
        name: "invoice_id",
        type: "UUID",
        isFk: true,
        references: { table: "billing_invoices", column: "id" },
      },
      { name: "account_code", type: "VARCHAR(20)" },
      { name: "debit_amount", type: "DECIMAL(12,2)" },
      { name: "credit_amount", type: "DECIMAL(12,2)" },
      { name: "posted_at", type: "TIMESTAMPTZ" },
    ],
    indexes: [
      "PRIMARY KEY (id)",
      "INDEX idx_ledger_invoice ON (invoice_id)",
      "INDEX idx_ledger_account_posted ON (account_code, posted_at)",
    ],
  },
];

export function DatabaseSchemaVisualizer() {
  const [selectedTableId, setSelectedTableId] = useState<string>("telemetry_events");
  const [highlightedFk, setHighlightedFk] = useState<{ table: string; column: string } | null>(null);

  const selectedTable = TABLES.find((t) => t.id === selectedTableId) || TABLES[0];

  const handleSelectTable = (tableId: string) => {
    playTactileClick();
    setSelectedTableId(tableId);
    setHighlightedFk(null);
  };

  return (
    <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-hairline gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-accent" />
            <h3 className="font-display font-bold text-xl text-white">
              Relational Schema &amp; Entity-Relationship (ER) Architecture
            </h3>
          </div>
          <p className="text-xs text-silver-mid font-light mt-1">
            Production PostgreSQL schemas modeled for MapUp fleet telemetry and Gabriel India enterprise invoice reconciliation.
          </p>
        </div>
        <Badge variant="cyan" dot>Interactive Schema</Badge>
      </div>

      {/* Table Selector Tabs */}
      <div className="flex flex-wrap gap-2 my-6">
        {TABLES.map((table) => {
          const isSelected = selectedTableId === table.id;
          const isReferenced = highlightedFk?.table === table.name;

          return (
            <button
              key={table.id}
              onClick={() => handleSelectTable(table.id)}
              className={`px-4 py-2 rounded-lg font-mono text-xs transition-all flex items-center gap-2 ${
                isSelected
                  ? "bg-cyan-950/60 border border-cyan-500/60 text-white font-bold"
                  : isReferenced
                  ? "bg-amber-950/60 border border-amber-500/50 text-amber-300 font-bold animate-pulse"
                  : "bg-surface-1 border border-hairline text-silver-mid hover:text-white"
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{table.name}</span>
              <span className="text-[10px] text-silver-dark">({table.columns.length})</span>
            </button>
          );
        })}
      </div>

      {/* Main Table Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Schema Columns & Foreign Keys */}
        <div className="lg:col-span-8 rounded-xl border border-hairline bg-surface-1 overflow-hidden">
          <div className="p-4 bg-surface-2 border-b border-hairline flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-cyan-accent font-bold text-sm">
                TABLE: public.{selectedTable.name}
              </span>
              <span className="text-xs text-silver-dark font-mono">
                // {selectedTable.category}
              </span>
            </div>
            <span className="text-[11px] font-mono text-silver-dark">PostgreSQL 16</span>
          </div>

          {/* Columns Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-hairline text-silver-dark text-[11px] bg-carbon/50">
                  <th className="py-2.5 px-4 font-normal">Key</th>
                  <th className="py-2.5 px-4 font-normal">Column Name</th>
                  <th className="py-2.5 px-4 font-normal">Data Type</th>
                  <th className="py-2.5 px-4 font-normal">Constraints &amp; FK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {selectedTable.columns.map((col) => {
                  const isFkHovered =
                    highlightedFk?.table === col.references?.table &&
                    highlightedFk?.column === col.references?.column;

                  return (
                    <tr
                      key={col.name}
                      onMouseEnter={() => {
                        if (col.references) {
                          setHighlightedFk(col.references);
                        }
                      }}
                      onMouseLeave={() => setHighlightedFk(null)}
                      className={`transition-colors ${
                        isFkHovered
                          ? "bg-amber-950/30"
                          : "hover:bg-surface-2/60"
                      }`}
                    >
                      <td className="py-2.5 px-4">
                        {col.isPk && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-amber-500/20 text-amber-accent px-1.5 py-0.5 rounded font-bold">
                            <Key className="w-3 h-3" /> PK
                          </span>
                        )}
                        {col.isFk && (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-cyan-500/20 text-cyan-accent px-1.5 py-0.5 rounded font-bold">
                            <Link2 className="w-3 h-3" /> FK
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-white font-bold">{col.name}</td>
                      <td className="py-2.5 px-4 text-silver-mid text-[11px]">{col.type}</td>
                      <td className="py-2.5 px-4 text-silver-dark text-[11px]">
                        {col.references ? (
                          <button
                            onClick={() => {
                              playTactileClick();
                              const targetTbl = TABLES.find((t) => t.name === col.references?.table);
                              if (targetTbl) setSelectedTableId(targetTbl.id);
                            }}
                            className="text-cyan-accent hover:underline flex items-center gap-1"
                          >
                            <span>➔ {col.references.table}.{col.references.column}</span>
                          </button>
                        ) : col.isUnique ? (
                          <span className="text-emerald-400">UNIQUE</span>
                        ) : col.isNullable ? (
                          <span>NULLABLE</span>
                        ) : (
                          <span>NOT NULL</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Indexing Strategy & SQL Execution Sample */}
        <div className="lg:col-span-4 flex flex-col justify-between p-4 rounded-xl border border-hairline bg-surface-1">
          <div>
            <div className="pb-3 border-b border-hairline mb-4">
              <span className="text-[10px] font-mono text-silver-dark uppercase block">
                INDEXING STRATEGY
              </span>
              <h4 className="font-display font-bold text-white text-sm mt-0.5">
                B-Tree &amp; GiST Composite Indexes
              </h4>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <p className="text-silver-mid text-[11px] leading-relaxed">
                {selectedTable.description}
              </p>

              <div>
                <span className="text-[10px] text-silver-dark uppercase block mb-1.5">
                  DEFINED INDEXES:
                </span>
                <div className="space-y-1.5">
                  {selectedTable.indexes.map((idx, i) => (
                    <div
                      key={i}
                      className="p-2 rounded bg-carbon border border-hairline text-[10px] text-silver-light"
                    >
                      {idx}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Query Explain */}
          <div className="mt-4 pt-3 border-t border-hairline font-mono text-[11px]">
            <span className="text-[10px] text-silver-dark uppercase block mb-1">
              OPTIMIZED QUERY PLAN:
            </span>
            <div className="p-2.5 rounded bg-obsidian border border-hairline text-emerald-accent text-[10px] leading-snug">
              Index Scan using idx_telemetry_veh_time on {selectedTable.name} (cost=0.42..8.44 rows=1)
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
