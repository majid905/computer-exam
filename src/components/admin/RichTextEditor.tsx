"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const FORMATS = [
  "header",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "list",
  "align",
  "blockquote", "code-block",
  "link", "image",
];

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  return (
    <div className="rich-editor-wrapper">
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={MODULES}
        formats={FORMATS}
      />
      <style jsx global>{`
        .rich-editor-wrapper .ql-toolbar {
          border-color: var(--color-border) !important;
          background: var(--color-surface-2) !important;
          border-radius: 0.375rem 0.375rem 0 0;
        }
        .rich-editor-wrapper .ql-container {
          border-color: var(--color-border) !important;
          border-radius: 0 0 0.375rem 0.375rem;
          min-height: 180px;
          font-size: 0.875rem;
          background: var(--color-surface);
        }
        .rich-editor-wrapper .ql-editor {
          min-height: 180px;
          color: var(--color-ink);
        }
        .rich-editor-wrapper .ql-editor.ql-blank::before {
          color: var(--color-muted);
          font-style: normal;
        }
        .rich-editor-wrapper .ql-stroke {
          stroke: var(--color-muted) !important;
        }
        .rich-editor-wrapper .ql-fill {
          fill: var(--color-muted) !important;
        }
        .rich-editor-wrapper .ql-picker-label {
          color: var(--color-muted) !important;
        }
        .rich-editor-wrapper .ql-picker-options {
          background: var(--color-surface) !important;
          border-color: var(--color-border) !important;
        }
        .rich-editor-wrapper .ql-picker-item {
          color: var(--color-ink) !important;
        }
        .rich-editor-wrapper button:hover .ql-stroke,
        .rich-editor-wrapper .ql-active .ql-stroke {
          stroke: var(--color-brand) !important;
        }
        .rich-editor-wrapper button:hover .ql-fill,
        .rich-editor-wrapper .ql-active .ql-fill {
          fill: var(--color-brand) !important;
        }
        .rich-editor-wrapper button:hover,
        .rich-editor-wrapper .ql-active {
          color: var(--color-brand) !important;
        }
        .rich-editor-wrapper .ql-picker-label:hover,
        .rich-editor-wrapper .ql-picker-label.ql-active {
          color: var(--color-brand) !important;
        }
        .rich-editor-wrapper .ql-picker-label:hover .ql-stroke,
        .rich-editor-wrapper .ql-picker-label.ql-active .ql-stroke {
          stroke: var(--color-brand) !important;
        }
      `}</style>
    </div>
  );
}
