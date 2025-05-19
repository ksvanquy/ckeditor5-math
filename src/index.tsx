import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MathPlugin } from './math-plugin';

interface CKEditorMathProps {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const CKEditorMath: React.FC<CKEditorMathProps> = ({
  value = '',
  onChange,
  placeholder = 'Type your content here...',
  readOnly = false,
}) => {
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    // Initialize the editor with math plugin
    const initEditor = async () => {
      try {
        const editor = await ClassicEditor.create(document.createElement('div'), {
          plugins: [MathPlugin],
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'math',
            'blockQuote',
            'insertTable',
            'undo',
            'redo'
          ],
          placeholder: placeholder,
          readOnly: readOnly,
        });

        setEditor(editor);
      } catch (error) {
        console.error('Failed to initialize editor:', error);
      }
    };

    initEditor();

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [placeholder, readOnly]);

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    onChange?.(data);
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="ckeditor-math-container">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={handleEditorChange}
        config={{
          plugins: [MathPlugin],
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'math',
            'blockQuote',
            'insertTable',
            'undo',
            'redo'
          ],
          placeholder: placeholder,
          readOnly: readOnly,
        }}
      />
      <style>
        {`
          .math-container {
            margin: 1em 0;
            padding: 1em;
            background: #f8f9fa;
            border-radius: 4px;
          }
          .math-display {
            overflow-x: auto;
            padding: 0.5em;
          }
        `}
      </style>
    </div>
  );
};

export default CKEditorMath; 