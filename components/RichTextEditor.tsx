 'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// 动态导入编辑器组件，禁用SSR
const WangEditorClient = dynamic(
  () => import('./WangEditorClient'),
  { ssr: false }
)

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  return (
    <div className="rich-text-editor">
      <WangEditorClient value={value} onChange={onChange} />
    </div>
  )
}

export default RichTextEditor