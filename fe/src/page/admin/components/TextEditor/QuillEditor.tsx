import { useRef, useState, useEffect, useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import http from '../../../../app/http-common'
import { getImageUrl } from '@/utils/getImageUrl'

interface TextEditorProps {
  height?: number
  content: string
  onHandleChange: (value: string) => void
}

function dataURLtoFile(dataurl: string, filename: string): File | null {
  const arr = dataurl.split(',')
  if (arr.length < 2) return null

  const mimeMatch = arr[0].match(/:(.*?);/)
  if (!mimeMatch) return null

  const mime = mimeMatch[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export default function TextEditor({ content, onHandleChange, height }: TextEditorProps) {
  const [value, setValue] = useState(content)
  const childRef = useRef<ReactQuill>(null)

  useEffect(() => {
    setValue(content)
  }, [content])

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await http.post(`/api/v1/admin/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data.data.fileName
  }

  const uploadAndInsertImage = async (file: File) => {
    try {
      const editor = childRef.current?.getEditor()
      if (!editor) return

      const range = editor.getSelection(true)

      const imageUrl = await uploadFile(file)

      editor.insertEmbed(range.index, 'image', getImageUrl(imageUrl))
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error)
    }
  }

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (file) {
        await uploadAndInsertImage(file)
      }
    }
  }

  useEffect(() => {
    const editor = childRef.current?.getEditor()
    if (!editor) return

    editor.clipboard.addMatcher('img', (node, delta) => {
      const src = node.getAttribute('src')

      if (src && src.startsWith('data:image/')) {
        const file = dataURLtoFile(src, `pasted_image_${Date.now()}.png`)
        if (file) {
          setTimeout(async () => {
            await uploadAndInsertImage(file)
          }, 0)
        }
        return delta.slice(delta.length()) // Trả về delta rỗng để loại bỏ ảnh base64
      }
      return delta
    })
  }, [childRef])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          ['clean']
        ],
        handlers: {
          image: imageHandler
        }
      },
      clipboard: {
        matchVisual: false
      }
    }),
    []
  )

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
    <div className='react-quill-wrapper' style={height ? { height: height + 50 } : {}}>
      <ReactQuill
        ref={childRef}
        value={value}
        modules={modules}
        formats={formats}
        theme='snow'
        className='custom-quill'
        style={height ? { height } : {}}
        onChange={(val) => {
          setValue(val)
          onHandleChange(val)
        }}
      />
    </div>
  )
}
