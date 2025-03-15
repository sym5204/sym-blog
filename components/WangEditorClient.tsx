'use client'

import '@wangeditor/editor/dist/css/style.css'
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

interface WangEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const WangEditorClient: React.FC<WangEditorProps> = ({ value, onChange }) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [],
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 自定义上传图片的配置
        customUpload(file: File, insertFn: any) {
          // 这里可以实现自定义上传逻辑
          // 例如：将图片转为base64直接插入
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            const url = reader.result as string
            insertFn(url)
          }
        }
      }
    }
  }

  // 当传入的value变化时更新编辑器内容
  useEffect(() => {
    if (editor && value !== editor.getHtml() && value !== '') {
      editor.setHtml(value)
    }
  }, [editor, value])

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={value}
          onCreated={setEditor}
          onChange={(editor) => {
            const html = editor.getHtml();
            console.log('编辑器内容更新:', html); // 调试用
            onChange(html);
          }}
          mode="default"
          style={{ height: '300px', overflowY: 'hidden' }}
        />
      </div>
    </>
  )
}

export default WangEditorClient 