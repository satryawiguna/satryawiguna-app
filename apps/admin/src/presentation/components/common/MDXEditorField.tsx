'use client';

/**
 * MDXEditorField — dark-themed Formik-compatible markdown editor
 * using @mdxeditor/editor.
 *
 * Dynamically imported (no SSR) via:
 *   const MDXEditorField = dynamic(() => import('...'), { ssr: false });
 */

import '@mdxeditor/editor/style.css';
import { useRef, useEffect, useCallback, useState } from 'react';
import type { MDXEditorMethods } from '@mdxeditor/editor';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
  linkDialogPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  imagePlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  usePublisher,
  useCellValue,
  convertSelectionToNode$,
  currentBlockType$,
  activePlugins$,
  allowedHeadingLevels$,
} from '@mdxeditor/editor';

import { $createParagraphNode } from 'lexical';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';

/**
 * CustomBlockTypeSelect — native <select> replacement for the library's
 * BlockTypeSelect. Avoids the TooltipWrap + RadixSelect nested-button issue
 * that prevented the dropdown from opening on click.
 */
function CustomBlockTypeSelect() {
  const convertSelectionToNode = usePublisher(convertSelectionToNode$);
  const currentBlockType = useCellValue(currentBlockType$);
  const activePlugins = useCellValue(activePlugins$);
  const allowedLevels = useCellValue(allowedHeadingLevels$);

  const hasQuote = activePlugins.includes('quote');
  const hasHeadings = activePlugins.includes('headings');

  if (!hasQuote && !hasHeadings) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const blockType = e.target.value;
    switch (blockType) {
      case 'quote':
        convertSelectionToNode(() => $createQuoteNode());
        break;
      case 'paragraph':
        convertSelectionToNode(() => $createParagraphNode());
        break;
      default:
        if (blockType.startsWith('h')) {
          convertSelectionToNode(() => $createHeadingNode(blockType));
        }
        break;
    }
  };

  return (
    <select
      value={currentBlockType}
      onChange={handleChange}
      className="custom-block-type-select"
      aria-label="Select block type"
    >
      <option value="paragraph">Paragraph</option>
      {hasQuote && <option value="quote">Quote</option>}
      {hasHeadings &&
        allowedLevels.map((n) => (
          <option key={`h${n}`} value={`h${n}`}>
            Heading {n}
          </option>
        ))}
    </select>
  );
}

interface MDXEditorFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export function MDXEditorField({
  value,
  onChange,
  placeholder = 'Write your markdown here\u2026',
  minHeight = 320,
}: MDXEditorFieldProps) {
  const editorRef = useRef<MDXEditorMethods>(null);
  const latestRef = useRef(value);
  const [isCodeMode, setIsCodeMode] = useState(false);
  const codeTextareaRef = useRef<HTMLTextAreaElement>(null);
  const codeValueRef = useRef(value);

  // The markdown prop on <MDXEditor> is read-only after mount.
  // When the external value changes (e.g. async edit data loads),
  // push it into the editor via setMarkdown().
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setMarkdown(value);
    }
    latestRef.current = value;
  }, [value]);

  const handleChange = useCallback((md: string) => {
    latestRef.current = md;
  }, []);

  const handleBlur = useCallback(() => {
    onChange(latestRef.current);
  }, [onChange]);

  const handleToggleCodeMode = useCallback(() => {
    if (isCodeMode) {
      // Switching from code → visual: push textarea value back to MDXEditor
      const md = codeValueRef.current;
      if (editorRef.current) {
        editorRef.current.setMarkdown(md);
      }
      latestRef.current = md;
      onChange(md);
    } else {
      // Switching from visual → code: capture current markdown for textarea
      codeValueRef.current = latestRef.current;
    }
    setIsCodeMode((prev) => !prev);
  }, [isCodeMode, onChange]);

  return (
    <div className="mdxeditor-field-wrapper" style={{ minHeight }}>
      <style>{`
        /* ── Dark theme for @mdxeditor/editor ──────────────── */

        /* CSS variable overrides — the primary theming mechanism */
        .mdxeditor-field-wrapper ._editorRoot_f3hmk_53 {
          --basePageBg: #0d1526;
          --baseBase: #0d1526;
          --baseBgSubtle: #111927;
          --baseBg: #1e293b;
          --baseBgHover: rgba(255,255,255,0.1);
          --baseBgActive: rgba(34,211,238,0.15);
          --baseLine: rgba(255,255,255,0.1);
          --baseBorder: rgba(255,255,255,0.1);
          --baseBorderHover: rgba(255,255,255,0.2);
          --baseSolid: #475569;
          --baseSolidHover: #64748b;
          --baseText: #94a3b8;
          --baseTextContrast: #dae2fd;

          --accentBase: #0d2847;
          --accentBgSubtle: #003362;
          --accentBg: #004074;
          --accentBgHover: #104d87;
          --accentBgActive: #205d9e;
          --accentLine: #2870bd;
          --accentBorder: #0090ff;
          --accentBorderHover: #3b9eff;
          --accentSolid: #0090ff;
          --accentSolidHover: #3b9eff;
          --accentText: #70b8ff;
          --accentTextContrast: #c2e6ff;

          --error-color: #ef4444;
          --font-mono: 'Space Grotesk', monospace;

          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
        }

        /* CodeMirror editors (code blocks) */
        .mdxeditor-field-wrapper .cm-editor {
          background: #0d1526;
        }

        .mdxeditor-field-wrapper .cm-gutters {
          background: #0d1526;
          border-right: 1px solid rgba(255,255,255,0.06);
        }

        .mdxeditor-field-wrapper .cm-activeLine {
          background: rgba(255,255,255,0.02);
        }

        .mdxeditor-field-wrapper .cm-focused {
          outline: none;
        }

        .mdxeditor-field-wrapper .cm-scroller {
          font-family: 'Space Grotesk', monospace;
        }

        /* Toolbar — wrap to next line when overflow */
        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 {
          background: #1e293b;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px 4px 0 0;
          flex-wrap: wrap;
          overflow: visible;
        }

        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 button {
          color: #cbd5e1;
          background: transparent;
          border-radius: 4px;
          transition: background 0.15s, color 0.15s;
        }

        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 button:hover {
          background: rgba(255,255,255,0.1);
          color: #f1f5f9;
        }

        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 button[data-state="on"],
        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 button[aria-checked="true"] {
          background: rgba(34,211,238,0.15);
          color: #22d3ee;
        }

        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 div[role='separator'] {
          background: rgba(255,255,255,0.1);
        }

        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 svg {
          fill: #cbd5e1;
        }

        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 button:hover svg {
          fill: #f1f5f9;
        }

        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 button[data-state="on"] svg,
        .mdxeditor-field-wrapper ._toolbarRoot_f3hmk_162 button[aria-checked="true"] svg {
          fill: #22d3ee;
        }

        /* Custom BlockTypeSelect — native <select> styled to match dark theme */
        .mdxeditor-field-wrapper .custom-block-type-select {
          border: 0;
          background: #0d1526;
          color: #dae2fd;
          font-size: 0.875rem;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          margin: 0 4px;
          width: 100px;
          appearance: auto;
          -webkit-appearance: auto;
        }

        .mdxeditor-field-wrapper .custom-block-type-select:hover {
          background: rgba(255,255,255,0.08);
        }

        .mdxeditor-field-wrapper .custom-block-type-select:focus-visible {
          outline: 1px solid rgba(34,211,238,0.5);
        }

        /* Content editable area */
        .mdxeditor-field-wrapper ._contentEditable_f3hmk_379 {
          color: #dae2fd;
          font-family: 'Space Grotesk', monospace;
          font-size: 14px;
          line-height: 1.7;
          padding: 16px;
          min-height: ${Math.max(minHeight, 320)}px;
        }

        .mdxeditor-field-wrapper ._contentEditable_f3hmk_379:focus {
          outline: none;
        }

        /* Nested list items */
        .mdxeditor-field-wrapper ._nestedListItem_f3hmk_158 {
          list-style: none;
        }

        /* Markdown content styles (headings, code, blockquotes, etc.) */
        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 h1,
        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 h2,
        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 h3,
        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 h4,
        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 h5,
        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 h6 {
          color: #f1f5f9;
        }

        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 code {
          background: rgba(34,211,238,0.08);
          color: #22d3ee;
          border-radius: 3px;
          padding: 1px 5px;
          font-size: 0.9em;
        }

        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 pre {
          background: #060e20;
          border-radius: 4px;
          padding: 12px 16px;
        }

        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 blockquote {
          border-left: 3px solid #22d3ee;
          color: #94a3b8;
          padding-left: 12px;
          margin-left: 0;
        }

        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 a {
          color: #22d3ee;
        }

        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 hr {
          border-color: rgba(255,255,255,0.1);
        }

        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 th,
        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 td {
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 12px;
        }

        .mdxeditor-field-wrapper ._editorWrapper_f3hmk_155 th {
          background: rgba(255,255,255,0.04);
          color: #f1f5f9;
        }

        /* ── Code mode textarea ──────────────────────── */
        .mdxeditor-field-wrapper .mdxeditor-code-textarea {
          width: 100%;
          box-sizing: border-box;
          background: #0d1526;
          color: #dae2fd;
          font-family: 'Space Grotesk', monospace;
          font-size: 14px;
          line-height: 1.7;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0 0 4px 4px;
          resize: vertical;
          outline: none;
        }

        .mdxeditor-field-wrapper .mdxeditor-code-textarea:focus {
          border-color: rgba(34,211,238,0.5);
        }

        /* ── Code mode toggle button (match toolbar buttons) ─ */
        .mdxeditor-field-wrapper .mdxeditor-code-toggle {
          color: #cbd5e1;
          background: transparent;
          border: 0;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          transition: background 0.15s, color 0.15s;
        }

        .mdxeditor-field-wrapper .mdxeditor-code-toggle:hover {
          background: rgba(255,255,255,0.1);
          color: #f1f5f9;
        }

        .mdxeditor-field-wrapper .mdxeditor-code-toggle[data-active="true"] {
          background: rgba(34,211,238,0.15);
          color: #22d3ee;
        }

        .mdxeditor-field-wrapper .mdxeditor-code-toggle[data-active="true"]:hover {
          background: rgba(34,211,238,0.15);
          color: #22d3ee;
        }

        /* ── Code mode minimal toolbar ───────────────── */
        .mdxeditor-field-wrapper .mdxeditor-code-toolbar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1e293b;
          border: 1px solid rgba(255,255,255,0.1);
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          padding: 6px 12px;
        }

        .mdxeditor-field-wrapper .mdxeditor-code-label {
          color: #94a3b8;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>

      {isCodeMode ? (
        <>
          <div className="mdxeditor-code-toolbar">
            <button
              onClick={handleToggleCodeMode}
              title="Switch to visual mode"
              className="mdxeditor-code-toggle"
              data-active={true}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </button>
            <span className="mdxeditor-code-label">Code</span>
          </div>
          <textarea
            ref={codeTextareaRef}
            defaultValue={codeValueRef.current}
            onChange={(e) => {
              codeValueRef.current = e.target.value;
            }}
            onBlur={(e) => {
              codeValueRef.current = e.target.value;
              onChange(e.target.value);
            }}
            className="mdxeditor-code-textarea"
            style={{ minHeight: Math.max(minHeight, 320) }}
          />
        </>
      ) : (
        <MDXEditor
          ref={editorRef}
          markdown={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          contentEditableClassName="mdxeditor-content-editable"
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <CustomBlockTypeSelect />
                  <Separator />
                  <ListsToggle />
                  <Separator />
                  <CreateLink />
                  <InsertCodeBlock />
                  <InsertImage />
                  <InsertThematicBreak />
                  <Separator />
                  <button
                    onClick={handleToggleCodeMode}
                    title="Switch to code mode"
                    className="mdxeditor-code-toggle"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </button>
                </>
              ),
            }),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            codeBlockPlugin(),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: 'JavaScript',
                ts: 'TypeScript',
                jsx: 'JSX',
                tsx: 'TSX',
                css: 'CSS',
                html: 'HTML',
                json: 'JSON',
                bash: 'Bash',
                sql: 'SQL',
                python: 'Python',
              },
            }),
            imagePlugin(),
          ]}
        />
      )}
    </div>
  );
}
