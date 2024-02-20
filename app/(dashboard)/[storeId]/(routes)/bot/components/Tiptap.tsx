"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading";

const TipTap = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (text: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: { class: "text-xl font-bold" },
        levels: [2],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML().replace(/<p>/g, "").replace(/<\/p>/g, ""));
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
