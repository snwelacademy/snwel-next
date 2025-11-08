'use client'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';

type EditorProps = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const Editor = ({ value, onChange, placeholder }: EditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }, { size: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ align: [] }, { direction: 'rtl' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    clipboard: {
      matchVisual: false,
    },
  } as const;

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'script',
    'align', 'direction',
    'link', 'image', 'video',
    'color', 'background',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ backgroundColor: 'white' }}
      modules={modules}
      formats={formats}
    />
  )
}

export default Editor