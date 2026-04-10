"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const btnBase =
    "inline-flex items-center justify-center h-8 w-8 rounded border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition";
  const activeBase = (active: boolean) =>
    active ? "bg-[#0D1F3C] text-white border-[#0D1F3C]" : "";

  return (
    <div className="rounded-lg border border-gray-300">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btnBase} ${activeBase(editor.isActive("heading", { level: 2 }))}`}
          title="Título"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${btnBase} ${activeBase(editor.isActive("heading", { level: 3 }))}`}
          title="Subtítulo"
        >
          H3
        </button>
        <div className="mx-1 h-6 w-px bg-gray-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btnBase} ${activeBase(editor.isActive("bold"))}`}
          title="Negrito"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 16" stroke="currentColor" strokeWidth={3}>
            <path d="M4 4h7a4 4 0 010 8H4V4zm0 0v8m0 0h8a4 4 0 010 8H4v-8z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btnBase} ${activeBase(editor.isActive("italic"))}`}
          title="Itálico"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${btnBase} ${activeBase(editor.isActive("underline"))}`}
          title="Sublinhado"
        >
          U
        </button>
        <div className="mx-1 h-6 w-px bg-gray-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btnBase} ${activeBase(editor.isActive("bulletList"))}`}
          title="Lista com marcadores"
        >
          •≡
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btnBase} ${activeBase(editor.isActive("orderedList"))}`}
          title="Lista numerada"
        >
          1.
        </button>
        <div className="mx-1 h-6 w-px bg-gray-300" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL da imagem:");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={`${btnBase} w-auto px-2 text-xs`}
          title="Inserir imagem"
        >
          🖼 Imagem
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL do link:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`${btnBase} w-auto px-2 text-xs`}
          title="Inserir link"
        >
          🔗 Link
        </button>
        <div className="mx-1 h-6 w-px bg-gray-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${btnBase} ${activeBase(editor.isActive({ textAlign: "left" }))}`}
          title="Alinhar à esquerda"
        >
          ≡←
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${btnBase} ${activeBase(editor.isActive({ textAlign: "center" }))}`}
          title="Centralizar"
        >
          ≡↔
        </button>
      </div>
      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
