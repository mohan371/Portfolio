import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // 1. Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds 10 MB limit." },
        { status: 400 }
      );
    }

    // 2. Validate MIME type
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only PDF documents are allowed." },
        { status: 400 }
      );
    }

    // 3. Read buffer and validate PDF magic bytes (%PDF-)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const header = buffer.slice(0, 5).toString("utf8");
    if (!header.startsWith("%PDF-")) {
      return NextResponse.json(
        { success: false, error: "Security check failed: File does not have a valid PDF header." },
        { status: 400 }
      );
    }

    // 4. Ensure target directory exists
    const resumeDir = path.join(process.cwd(), "public", "resume");
    if (!fs.existsSync(resumeDir)) {
      fs.mkdirSync(resumeDir, { recursive: true });
    }

    // 5. Overwrite public resume files safely
    const targetPath1 = path.join(resumeDir, "Mohan_N_V_Resume.pdf");
    const targetPath2 = path.join(resumeDir, "Mohan_NV_Resume.pdf");

    fs.writeFileSync(targetPath1, buffer);
    fs.writeFileSync(targetPath2, buffer);

    return NextResponse.json({
      success: true,
      message: "Resume PDF successfully replaced in production public directory.",
      path: "/resume/Mohan_N_V_Resume.pdf",
      fileName: "Mohan_N_V_Resume.pdf",
      size: `${Math.round(buffer.length / 1024)} KB`,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[ResumeUploadAPI] Error saving file:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process resume upload." },
      { status: 500 }
    );
  }
}
