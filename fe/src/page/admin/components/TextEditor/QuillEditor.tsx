import { useRef, useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface TextEditorProps {
  content: string
  onHandleChange: (value: string) => void
}

export default function TextEditor({ content, onHandleChange }: TextEditorProps) {
  const [value, setValue] = useState(content)
  const childRef = useRef(null)

  useEffect(() => {
    setValue(content)
  }, [content])

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ]
  return (
    <ReactQuill
      ref={childRef}
      value={value}
      modules={modules}
      formats={formats}
      theme='snow'
      className='h-[200px]'
      onChange={(val) => {
        setValue(val)
        onHandleChange(val)
      }}
    />
  )
}
