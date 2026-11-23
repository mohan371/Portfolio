"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/ToastContext";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { playTactileClick } from "@/lib/sound";
import {
  UploadCloud,
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  Eye,
  FileCheck,
  AlertCircle,
  X,
} from "lucide-react";

interface MediaAsset {
  id: string;
  name: string;
  path: string;
  size: string;
  type: string;
  dimensions?: string;
  uploadedAt: string;
}

const INITIAL_ASSETS: MediaAsset[] = [
  {
    id: "asset-1",
    name: "mapup-telematics-hud.png",
    path: "/images/projects/mapup-thumb.jpg",
    size: "340 KB",
    type: "image/jpeg",
    dimensions: "1920 × 1080",
    uploadedAt: "2026-11-20",
  },
  {
    id: "asset-2",
    name: "veda-scholars-dashboard.png",
    path: "/images/projects/veda-thumb.jpg",
    size: "280 KB",
    type: "image/jpeg",
    dimensions: "1920 × 1080",
    uploadedAt: "2026-11-18",
  },
  {
    id: "asset-3",
    name: "ledgerflow-reconciliation.png",
    path: "/images/projects/ledgerflow-thumb.jpg",
    size: "410 KB",
    type: "image/jpeg",
    dimensions: "1920 × 1080",
    uploadedAt: "2026-11-15",
  },
  {
    id: "asset-4",
    name: "Mohan_NV_Resume.pdf",
    path: "/resume/Mohan_NV_Resume.pdf",
    size: "142 KB",
    type: "application/pdf",
    uploadedAt: "2026-11-23",
  },
];

export default function AdminMediaPage() {
  const { toast } = useToast();
  const [assets, setAssets] = useState<MediaAsset[]>(INITIAL_ASSETS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaAsset | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // File upload handler with strict client-side validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    playTactileClick();
    const file = files[0];

    // 1. Validate File Size (< 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error("File Too Large", "Maximum permitted asset size is 10 MB.");
      return;
    }

    // 2. Validate MIME Type
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Unsupported File Type", "Permitted formats: PNG, JPEG, WebP, SVG, PDF.");
      return;
    }

    setIsUploading(true);

    // Simulated instant asset registration
    setTimeout(() => {
      const newAsset: MediaAsset = {
        id: `asset-${Date.now()}`,
        name: file.name,
        path: `/images/uploads/${file.name}`,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type,
        dimensions: "Optimized",
        uploadedAt: new Date().toISOString().split("T")[0],
      };

      setAssets([newAsset, ...assets]);
      setIsUploading(false);
      toast.success("Asset Uploaded", `${file.name} saved to Supabase storage bucket.`);
    }, 600);
  };

  const copyPath = (asset: MediaAsset) => {
    playTactileClick();
    navigator.clipboard.writeText(asset.path);
    setCopiedId(asset.id);
    toast.info("Copied to Clipboard", asset.path);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    playTactileClick();
    setAssets(assets.filter((a) => a.id !== deleteTarget.id));
    toast.success("Asset Deleted", deleteTarget.name);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest block mb-1">
            CMS // ASSET STORAGE
          </span>
          <h1 className="font-display font-bold text-3xl text-white">
            Media &amp; File Storage
          </h1>
          <p className="text-xs text-silver-mid font-light mt-1">
            Upload, preview, validate, and manage project screenshots, diagrams, and downloadable resume assets.
          </p>
        </div>

        <Badge variant="cyan" dot className="font-mono text-xs">
          BUCKET: portfolio-assets
        </Badge>
      </div>

      {/* Upload Dropzone */}
      <Card hasDatumCorners className="p-8 bg-obsidian border-hairline border-dashed hover:border-cyan-500/50 transition-colors text-center">
        <UploadCloud className="w-10 h-10 text-cyan-accent mx-auto mb-3 animate-pulse" />
        <h4 className="font-display font-bold text-white text-base">
          Upload New Image or Document
        </h4>
        <p className="text-xs text-silver-mid font-light mt-1 mb-4">
          PNG, JPEG, WebP, SVG, and PDF files supported up to 10 MB.
        </p>

        <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-obsidian font-mono text-xs font-bold hover:bg-cyan-300 transition-colors">
          <UploadCloud className="w-4 h-4" />
          <span>{isUploading ? "UPLOADING ASSET..." : "SELECT FILE TO UPLOAD"}</span>
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={isUploading}
            accept="image/png,image/jpeg,image/webp,image/svg+xml,application/pdf"
            className="hidden"
          />
        </label>
      </Card>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} hasDatumCorners className="p-4 bg-surface-1 border-hairline flex flex-col justify-between">
            <div>
              {/* Thumbnail Thumbnail Box */}
              <div className="h-32 rounded-lg bg-carbon border border-hairline flex items-center justify-center overflow-hidden mb-3 relative group">
                {asset.type.startsWith("image/") ? (
                  <div className="w-full h-full flex items-center justify-center text-cyan-accent">
                    <ImageIcon className="w-8 h-8 opacity-60" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-silver-dark font-mono text-xs">
                    <FileCheck className="w-8 h-8 text-emerald-accent mb-1" />
                    <span>PDF Document</span>
                  </div>
                )}

                <button
                  onClick={() => setPreviewAsset(asset)}
                  className="absolute inset-0 bg-obsidian/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 font-mono text-xs text-white transition-opacity"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
              </div>

              <div className="font-mono text-xs font-bold text-white truncate" title={asset.name}>
                {asset.name}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-silver-dark mt-1">
                <span>{asset.size}</span>
                <span>{asset.uploadedAt}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between">
              <button
                onClick={() => copyPath(asset)}
                className="text-[10px] font-mono text-cyan-accent hover:underline flex items-center gap-1"
              >
                {copiedId === asset.id ? <Check className="w-3 h-3 text-emerald-accent" /> : <Copy className="w-3 h-3" />}
                {copiedId === asset.id ? "Copied" : "Copy Path"}
              </button>

              <button
                onClick={() => setDeleteTarget(asset)}
                className="text-silver-dark hover:text-red-400 transition-colors"
                title="Delete Asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Asset Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md">
          <div className="max-w-xl w-full rounded-2xl border border-hairline bg-surface-1 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <h3 className="font-mono font-bold text-sm text-white truncate max-w-sm">
                {previewAsset.name}
              </h3>
              <button onClick={() => setPreviewAsset(null)} className="text-silver-dark hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-carbon border border-hairline font-mono text-xs space-y-1">
              <div>Path: <span className="text-cyan-accent">{previewAsset.path}</span></div>
              <div>MIME: <span className="text-white">{previewAsset.type}</span></div>
              <div>Size: <span className="text-white">{previewAsset.size}</span></div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-hairline">
              <Button variant="outline" size="sm" onClick={() => copyPath(previewAsset)} className="text-xs font-mono">
                Copy Link
              </Button>
              <Button variant="primary" size="sm" onClick={() => setPreviewAsset(null)} className="text-xs font-mono">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Media Asset?"
        description={`Are you sure you want to delete '${deleteTarget?.name}'?`}
        confirmLabel="Delete Asset"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
