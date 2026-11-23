import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "nodejs";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "monospace",
          fontWeight: 900,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 6,
        }}
      >
        M
      </div>
    ),
    {
      ...size,
    }
  );
}
