"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/ToastContext";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { playTactileClick } from "@/lib/sound";
import { updateEnquiryAction, deleteEnquiryAction } from "@/app/admin/actions";
import {
  Mail,
  Search,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  Eye,
  X,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

interface MockEnquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  budgetRange?: string;
  status: "unread" | "in_review" | "responded" | "archived";
  createdAt: string;
  adminNotes?: string;
}

const INITIAL_ENQUIRIES: MockEnquiry[] = [
  {
    id: "enq-101",
    name: "Arun Krishnan",
    email: "arun.k@logisticsventures.in",
    subject: "MapUp Fleet Geofencing Architecture Inquiry",
    message: "Hello Mohan, we reviewed your MapUp geofencing project and your implementation of the Jordan Curve Theorem for real-time fleet perimeter monitoring. We are scaling a commercial logistics hub in Bangalore and would like to consult with you on high-frequency telemetry ingestion using Go and WebSockets.",
    serviceInterest: "Real-Time Telemetry & Spatial Systems",
    budgetRange: "₹2,00,000 — ₹5,00,000",
    status: "unread",
    createdAt: "2026-11-23 10:14:00",
  },
  {
    id: "enq-102",
    name: "Dr. K. Senthil",
    email: "senthil.research@adhiyamaan.ac.in",
    subject: "Distributed Systems Capstone Collaboration",
    message: "Mohan, impressive research and benchmarks on PostgreSQL indexing and Go concurrency channels. We would like you to present your findings on B-Tree query cost models at the upcoming engineering colloquium.",
    serviceInterest: "Academic Colloquium",
    status: "unread",
    createdAt: "2026-11-22 16:40:00",
  },
  {
    id: "enq-103",
    name: "Vikram Malhotra",
    email: "vikram@fintechsystems.co",
    subject: "Full-Stack Software Engineering Opportunity",
    message: "Hi Mohan, your combination of corporate accounting experience at Gabriel India Ltd alongside advanced distributed systems and Next.js engineering is unique. We have a Senior Backend / Full-Stack opening for our financial ledger reconciliation platform in Bangalore.",
    serviceInterest: "Full-Time Engineering Role",
    status: "responded",
    createdAt: "2026-11-20 11:20:00",
    adminNotes: "Replied via email on Nov 21 with updated resume and calendar link.",
  },
];

export default function AdminEnquiriesPage() {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<MockEnquiry[]>(INITIAL_ENQUIRIES);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<MockEnquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<MockEnquiry | null>(null);

  const filtered = enquiries.filter((e) => {
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenReader = (enquiry: MockEnquiry) => {
    playTactileClick();
    setSelectedEnquiry(enquiry);
    setAdminNotes(enquiry.adminNotes || "");

    // Automatically mark unread as in_review
    if (enquiry.status === "unread") {
      setEnquiries((prev) =>
        prev.map((item) => (item.id === enquiry.id ? { ...item, status: "in_review" } : item))
      );
      updateEnquiryAction(enquiry.id, { status: "in_review" });
    }
  };

  const handleUpdateStatus = async (status: MockEnquiry["status"]) => {
    if (!selectedEnquiry) return;
    playTactileClick();

    const res = await updateEnquiryAction(selectedEnquiry.id, {
      status,
      admin_notes: adminNotes,
    });

    if (res.success) {
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === selectedEnquiry.id ? { ...e, status, adminNotes } : e
        )
      );
      setSelectedEnquiry({ ...selectedEnquiry, status, adminNotes });
      toast.success("Enquiry Updated", `Status marked as '${status}'.`);
    } else {
      toast.error("Update Failed", res.error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    playTactileClick();

    const res = await deleteEnquiryAction(deleteTarget.id);
    if (res.success) {
      setEnquiries((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      toast.success("Enquiry Deleted", deleteTarget.subject);
      if (selectedEnquiry?.id === deleteTarget.id) setSelectedEnquiry(null);
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="text-xs font-mono text-amber-accent uppercase tracking-widest block mb-1">
            CMS // CLIENT INBOX
          </span>
          <h1 className="font-display font-bold text-3xl text-white">
            Inbound Contact Enquiries
          </h1>
          <p className="text-xs text-silver-mid font-light mt-1">
            Private and confidential client project inquiries, technical collaboration proposals, and career communications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="cyan" dot className="font-mono text-xs">
            RLS STRICTLY ENFORCED
          </Badge>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-silver-dark absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enquiries by sender, email, or subject..."
            className="w-full bg-surface-1 border border-hairline rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex gap-1.5 p-1 rounded-xl bg-surface-1 border border-hairline font-mono text-xs">
          {["all", "unread", "in_review", "responded", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => {
                playTactileClick();
                setStatusFilter(st);
              }}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                statusFilter === st
                  ? "bg-amber-950/60 border border-amber-500/50 text-amber-accent font-bold"
                  : "text-silver-dark hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <Card hasDatumCorners className="bg-obsidian border-hairline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-hairline bg-surface-1 text-silver-dark text-[11px]">
                <th className="py-3 px-4">Sender</th>
                <th className="py-3 px-4">Subject &amp; Service</th>
                <th className="py-3 px-4">Received At</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-surface-1/50">
                  <td className="py-3.5 px-4">
                    <div className="font-sans font-bold text-white text-sm">{enq.name}</div>
                    <div className="text-[11px] text-silver-dark">{enq.email}</div>
                  </td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="text-white font-medium truncate">{enq.subject}</div>
                    {enq.serviceInterest && (
                      <div className="text-[10px] text-cyan-accent mt-0.5 truncate">
                        Service: {enq.serviceInterest}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-silver-dark text-[11px]">{enq.createdAt}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        enq.status === "unread"
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : enq.status === "responded"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : enq.status === "in_review"
                          ? "bg-cyan-950 text-cyan-accent border border-cyan-800"
                          : "bg-carbon text-silver-dark border border-hairline"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenReader(enq)}
                        className="p-1.5 h-8 w-8 text-cyan-accent hover:border-cyan-500"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteTarget(enq)}
                        className="p-1.5 h-8 w-8 text-red-400 hover:border-red-500 hover:bg-red-950/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Message Reader Drawer Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md overflow-y-auto">
          <div className="max-w-2xl w-full rounded-2xl border border-hairline bg-surface-1 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-[10px] font-mono text-silver-dark uppercase">
                  MESSAGE INSPECTION // {selectedEnquiry.createdAt}
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  {selectedEnquiry.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-silver-dark hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Metadata */}
            <div className="p-4 rounded-xl bg-carbon border border-hairline font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-silver-dark">FROM:</span>
                <span className="text-white font-bold">{selectedEnquiry.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-silver-dark">EMAIL:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-cyan-accent hover:underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              {selectedEnquiry.budgetRange && (
                <div className="flex justify-between">
                  <span className="text-silver-dark">BUDGET ESTIMATE:</span>
                  <span className="text-emerald-400">{selectedEnquiry.budgetRange}</span>
                </div>
              )}
            </div>

            {/* Message Body */}
            <div>
              <span className="text-[10px] font-mono text-silver-dark uppercase block mb-1.5">
                TRANSMITTED MESSAGE:
              </span>
              <p className="text-xs text-silver-light leading-relaxed font-light p-4 rounded-xl bg-obsidian border border-hairline whitespace-pre-wrap">
                {selectedEnquiry.message}
              </p>
            </div>

            {/* Internal Admin Notes */}
            <div>
              <label className="block text-[10px] font-mono text-silver-dark uppercase mb-1.5">
                Internal Administrative Notes (Private)
              </label>
              <textarea
                rows={2}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Log follow-up details, calendar dates, or meeting notes..."
                className="w-full bg-carbon border border-hairline rounded-xl p-3 text-xs font-mono text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-hairline font-mono text-xs">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus("responded")}
                  className="text-emerald-400 hover:border-emerald-500 text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Mark Responded
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus("archived")}
                  className="text-silver-dark hover:text-white text-xs"
                >
                  <Archive className="w-3.5 h-3.5 mr-1" /> Archive
                </Button>
              </div>

              <a
                href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(selectedEnquiry.subject)}`}
                className="px-4 py-2 rounded-xl bg-cyan-400 text-obsidian font-bold hover:bg-cyan-300 transition-colors inline-flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Direct Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Enquiry?"
        description={`Are you sure you want to delete the message from '${deleteTarget?.name}'?`}
        confirmLabel="Delete Permanently"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
