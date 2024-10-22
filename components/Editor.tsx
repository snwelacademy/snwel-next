'use client'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';


const Editor = ({ value, onChange }: { value?: string, onChange?: (value: string) => void }) => {
  const quillRef = useRef<ReactQuill>(null);
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'video'],
        ['clean']
      ],
      // handlers: {
      //   video: () => {
      //     CustomVideoHandler(quillRef.current?.getEditor());
      //   }
      // }
    }
  };
  return (
    <ReactQuill ref={quillRef} theme="snow" value={value} onChange={onChange} style={{ backgroundColor: 'white' }} modules={modules} />
  )
}

export default Editor