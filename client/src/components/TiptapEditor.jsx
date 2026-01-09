import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 dark:border-neutral-700 p-2 flex gap-2 flex-wrap mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${
          editor.isActive("bold") ? "bg-gray-200 dark:bg-neutral-600" : ""
        }`}
        type="button"
      >
        <Bold className="w-4 h-4 text-black dark:text-white" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${
          editor.isActive("italic") ? "bg-gray-200 dark:bg-neutral-600" : ""
        }`}
        type="button"
      >
        <Italic className="w-4 h-4 text-black dark:text-white" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${
          editor.isActive("strike") ? "bg-gray-200 dark:bg-neutral-600" : ""
        }`}
        type="button"
      >
        <Strikethrough className="w-4 h-4 text-black dark:text-white" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${
          editor.isActive("code") ? "bg-gray-200 dark:bg-neutral-600" : ""
        }`}
        type="button"
      >
        <Code className="w-4 h-4 text-black dark:text-white" />
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-neutral-600 mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${
          editor.isActive("heading", { level: 1 })
            ? "bg-gray-200 dark:bg-neutral-600"
            : ""
        }`}
        type="button"
      >
        <Heading1 className="w-4 h-4 text-black dark:text-white" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${
          editor.isActive("heading", { level: 2 })
            ? "bg-gray-200 dark:bg-neutral-600"
            : ""
        }`}
        type="button"
      >
        <Heading2 className="w-4 h-4 text-black dark:text-white" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${
          editor.isActive("bulletList") ? "bg-gray-200 dark:bg-neutral-600" : ""
        }`}
        type="button"
      >
        <List className="w-4 h-4 text-black dark:text-white" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${
          editor.isActive("orderedList")
            ? "bg-gray-200 dark:bg-neutral-600"
            : ""
        }`}
        type="button"
      >
        <ListOrdered className="w-4 h-4 text-black dark:text-white" />
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-neutral-600 mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${
          editor.isActive("blockquote") ? "bg-gray-200 dark:bg-neutral-600" : ""
        }`}
        type="button"
      >
        <Quote className="w-4 h-4 text-black dark:text-white" />
      </button>
      <div className="w-px h-6 bg-gray-300 dark:bg-neutral-600 mx-1 self-center" />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition disabled:opacity-50"
        type="button"
      >
        <Undo className="w-4 h-4 text-black dark:text-white" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition disabled:opacity-50"
        type="button"
      >
        <Redo className="w-4 h-4 text-black dark:text-white" />
      </button>
    </div>
  );
};

const TiptapEditor = ({ content, onChange, className }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg dark:prose-invert focus:outline-none max-w-none min-h-[200px] px-4 py-2",
      },
    },
  });

  // Handle external content updates (e.g., loading data)
  // Note: Only update if content is significantly different to avoid cursor jumps
  // Ideally, this should only happen on initial load.
  // For simplicity, we'll assume the parent handles `content` prop correctly (initial load).

  return (
    <div
      className={`border border-gray-300 dark:border-neutral-600 rounded-lg overflow-hidden bg-white dark:bg-neutral-800 ${className}`}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
