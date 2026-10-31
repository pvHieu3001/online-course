import React, { useMemo } from 'react'

export interface HtmlContentProps extends React.HTMLAttributes<HTMLElement> {
  content?: string | null
  className?: string
  enableQuoteHighlight?: boolean
  as?: 'div' | 'article' | 'section'
}

export const highlightQuotes = (html?: string | null): string => {
  if (!html) return ''
  return html.replace(/(<[^>]*>)|("[^"\n]+"|“[^”\n]+”)/g, (match, htmlTag, quotedText) => {
    if (htmlTag) return htmlTag
    return `<span data-quote>${quotedText}</span>`
  })
}

export const BASE_HTML_CONTENT_CLASSES =
  'prose prose-lg max-w-none font-arial text-[17px] text-gray-800 leading-[1.8] tracking-[0.01em] break-words ' +
  '[&_p]:mt-0 [&_p]:mb-4 [&_p]:text-[17px] [&_p]:text-justify ' +
  '[&_p:has(strong)]:mb-1 ' +
  '[&_span[data-quote]]:italic [&_span[data-quote]]:text-slate-900 [&_span[data-quote]]:font-medium [&_span[data-quote]]:bg-amber-50/70 [&_span[data-quote]]:px-1 [&_span[data-quote]]:rounded ' +
  '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:leading-tight ' +
  '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:leading-snug ' +
  '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 ' +
  '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1.5 ' +
  '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 ' +
  '[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 ' +
  '[&_img]:mx-auto [&_img]:block [&_img]:my-6 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-auto ' +
  '[&_video]:mx-auto [&_video]:block [&_video]:my-6 [&_video]:rounded-lg [&_video]:max-w-full ' +
  '[&_iframe]:mx-auto [&_iframe]:block [&_iframe]:my-6 [&_iframe]:max-w-full ' +
  '[&_a]:text-blue-600 [&_a:hover]:underline'

export const HtmlContent: React.FC<HtmlContentProps> = ({
  content,
  className = '',
  enableQuoteHighlight = true,
  as: Component = 'div',
  ...rest
}) => {
  const processedHtml = useMemo(() => {
    if (!content) return ''
    return enableQuoteHighlight ? highlightQuotes(content) : content
  }, [content, enableQuoteHighlight])

  if (!content) return null

  return (
    <Component
      className={`${BASE_HTML_CONTENT_CLASSES} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
      {...rest}
    />
  )
}

export default HtmlContent
