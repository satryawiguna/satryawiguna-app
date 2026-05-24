'use client';

/**
 * MDXEditorField — dark-themed Formik-compatible markdown editor
 * using @uiw/react-md-editor.
 *
 * Dynamically imported (no SSR) via:
 *   const MDXEditorField = dynamic(() => import('...'), { ssr: false });
 */

import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';

interface MDXEditorFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export function MDXEditorField({
  value,
  onChange,
  minHeight = 320,
}: MDXEditorFieldProps) {
  // Local state avoids Formik re-render on every keystroke.
  // Sync to Formik only on blur for smooth typing.
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div data-color-mode="dark" data-md-editor-wrapper="">
      <style>{`
        /* ── Dark theme for @uiw/react-md-editor ───────────────── */
        [data-md-editor-wrapper] .w-md-editor {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          background: #0d1526;
          box-shadow: none;
        }

        /* Toolbar */
        [data-md-editor-wrapper] .w-md-editor-toolbar {
          background: #1e293b;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px 4px 0 0;
          padding: 4px 6px;
        }

        [data-md-editor-wrapper] .w-md-editor-toolbar ul li button {
          color: #cbd5e1;
          background: transparent;
          border-radius: 4px;
          transition: background 0.15s, color 0.15s;
        }

        [data-md-editor-wrapper] .w-md-editor-toolbar ul li button:hover {
          background: rgba(255,255,255,0.1);
          color: #f1f5f9;
        }

        [data-md-editor-wrapper] .w-md-editor-toolbar ul li button.active {
          background: rgba(34,211,238,0.15);
          color: #22d3ee;
        }

        [data-md-editor-wrapper] .w-md-editor-toolbar ul li button svg {
          fill: #cbd5e1;
        }

        [data-md-editor-wrapper] .w-md-editor-toolbar ul li button:hover svg {
          fill: #f1f5f9;
        }

        [data-md-editor-wrapper] .w-md-editor-toolbar ul li button.active svg {
          fill: #22d3ee;
        }

        [data-md-editor-wrapper] .w-md-editor-toolbar-divider {
          background: rgba(255,255,255,0.1);
        }

        /* Text area */
        [data-md-editor-wrapper] .w-md-editor-text {
          background: #0d1526;
        }

        [data-md-editor-wrapper] .w-md-editor-text-pre > code,
        [data-md-editor-wrapper] .w-md-editor-text-input {
          color: #dae2fd;
          font-family: 'Space Grotesk', monospace;
          font-size: 14px;
          line-height: 1.7;
        }

        [data-md-editor-wrapper] .w-md-editor-text-pre .title,
        [data-md-editor-wrapper] .w-md-editor-text-pre .bold {
          color: #dae2fd;
        }

        [data-md-editor-wrapper] .w-md-editor-preview {
          background: #0d1526;
          box-shadow: inset 1px 0 0 0 rgba(255,255,255,0.06);
        }

        [data-md-editor-wrapper] .wmde-markdown {
          background: #0d1526;
          color: #dae2fd;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
        }

        [data-md-editor-wrapper] .wmde-markdown h1,
        [data-md-editor-wrapper] .wmde-markdown h2,
        [data-md-editor-wrapper] .wmde-markdown h3,
        [data-md-editor-wrapper] .wmde-markdown h4,
        [data-md-editor-wrapper] .wmde-markdown h5,
        [data-md-editor-wrapper] .wmde-markdown h6 {
          color: #f1f5f9;
          border-bottom-color: rgba(255,255,255,0.08);
        }

        [data-md-editor-wrapper] .wmde-markdown code {
          background: rgba(34,211,238,0.08);
          color: #22d3ee;
          border-radius: 3px;
          padding: 1px 5px;
        }

        [data-md-editor-wrapper] .wmde-markdown pre {
          background: #060e20;
          border-radius: 4px;
        }

        [data-md-editor-wrapper] .wmde-markdown blockquote {
          border-left: 3px solid #22d3ee;
          color: #94a3b8;
        }

        [data-md-editor-wrapper] .wmde-markdown table {
          border-color: rgba(255,255,255,0.1);
        }

        [data-md-editor-wrapper] .wmde-markdown th,
        [data-md-editor-wrapper] .wmde-markdown td {
          border-color: rgba(255,255,255,0.1);
        }

        [data-md-editor-wrapper] .wmde-markdown th {
          background: rgba(255,255,255,0.04);
        }

        [data-md-editor-wrapper] .wmde-markdown hr {
          background: rgba(255,255,255,0.1);
        }

        [data-md-editor-wrapper] .wmde-markdown a {
          color: #22d3ee;
        }

        [data-md-editor-wrapper] .w-md-editor-bar {
          background: rgba(255,255,255,0.04);
        }

        [data-md-editor-wrapper] .w-md-editor-bar svg {
          fill: #475569;
        }
      `}</style>

      <MDEditor
        value={localValue}
        onChange={(val) => setLocalValue(val ?? '')}
        onBlur={() => onChange(localValue)}
        height={Math.max(minHeight, 320)}
        visibleDragbar={false}
        preview="live"
      />
    </div>
  );
}
