import React, { useEffect, useMemo, useRef, useState } from 'react'

export interface HtmlContentProps extends React.HTMLAttributes<HTMLElement> {
  content?: string | null
  className?: string
  enableQuoteHighlight?: boolean
  enableReadMore?: boolean
  as?: 'div' | 'article' | 'section'
}

export const highlightQuotes = (html?: string | null): string => {
  if (!html) return ''
  return html.replace(/(<[^>]*>)|("[^"\n]+"|“[^”\n]+”)/g, (match, htmlTag, quotedText) => {
    if (htmlTag) return htmlTag
    return `<span data-quote>${quotedText}</span>`
  })
}

const IMAGE_URL_PATTERN = /\.(?:avif|bmp|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i
const URL_PATTERN = /https?:\/\/[^\s<>"']+/gi

const getImageUrlFromText = (text: string) => {
  const url = text.replace(/[),.;!?]+$/, '')
  return IMAGE_URL_PATTERN.test(url) ? { url, trailingText: text.slice(url.length) } : null
}

const createImageFigure = (image: HTMLImageElement, captionContent: Node) => {
  const figure = image.ownerDocument!.createElement('figure')
  figure.className = 'image-caption'
  figure.style.textAlign = 'center'
  const caption = image.ownerDocument!.createElement('figcaption')
  caption.style.textAlign = 'center'
  caption.append(captionContent)
  figure.append(image, caption)
  return figure
}

export const renderImageLinks = (html: string): string => {
  const document = new DOMParser().parseFromString(html, 'text/html')

  document.querySelectorAll('a[href]').forEach((anchor) => {
    const imageUrl = getImageUrlFromText(anchor.getAttribute('href') ?? '')
    if (!imageUrl) return

    const image = document.createElement('img')
    image.src = imageUrl.url
    image.alt = anchor.textContent?.trim() || ''
    image.loading = 'lazy'
    anchor.replaceChildren(image)
  })

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.parentElement?.closest('a, code, pre, script, style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
  })
  const textNodes: Text[] = []
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text)
  }

  textNodes.forEach((textNode) => {
    const originalText = textNode.textContent ?? ''
    const text = originalText
      .replace(/\[Photo:\s*([^\]\r\n]+)\]/gi, 'Photo: $1')
      .replace(
        /\[(https?:\/\/[^\]\s]+\.(?:avif|bmp|gif|jpe?g|png|svg|webp)(?:[?#][^\]\s]*)?)\s*[-–—]\s*([^\]\r\n]+)\]/gi,
        '$1 - *$2*'
      )
    URL_PATTERN.lastIndex = 0
    const matches = [...text.matchAll(URL_PATTERN)]
    if (!matches.length) {
      if (text !== originalText) textNode.textContent = text
      return
    }

    const fragment = document.createDocumentFragment()
    let lastIndex = 0

    matches.forEach((match) => {
      const start = match.index ?? 0
      const imageUrl = getImageUrlFromText(match[0])
      if (!imageUrl) return

      fragment.append(text.slice(lastIndex, start))
      const image = document.createElement('img')
      image.src = imageUrl.url
      image.alt = ''
      image.loading = 'lazy'

      const captionMatch = text
        .slice(start + imageUrl.url.length)
        .match(/^\s*[-–—]\s*(?:\*([^*\r\n]+)\*|([^\r\n]*?))(?:\s*\]|$)/)
      const textAfterUrl = text.slice(start + imageUrl.url.length)
      const adjacentEm = textNode.nextSibling
      const emCaption =
        adjacentEm instanceof HTMLElement &&
        adjacentEm.tagName === 'EM' &&
        /^\s*[-–—]\s*$/.test(textAfterUrl)
          ? adjacentEm
          : null
      if (captionMatch || emCaption) {
        const captionContent = emCaption ?? document.createTextNode((captionMatch![1] ?? captionMatch![2]).trim())
        fragment.append(createImageFigure(image, captionContent))
        if (emCaption) lastIndex = text.length
        else lastIndex = start + imageUrl.url.length + captionMatch![0].length
      } else {
        fragment.append(image, imageUrl.trailingText)
        lastIndex = start + match[0].length
      }
    })

    if (lastIndex > 0) {
      fragment.append(text.slice(lastIndex))
      textNode.replaceWith(fragment)
    }
  })

  document.querySelectorAll('p').forEach((captionParagraph) => {
    const meaningfulChildren = Array.from(captionParagraph.childNodes).filter(
      (node) => node.nodeType !== Node.TEXT_NODE || node.textContent?.trim()
    )
    const captionEm = meaningfulChildren[0]
    const imageParagraph = captionParagraph.previousElementSibling
    const image = imageParagraph?.querySelector(':scope > img')
    if (
      meaningfulChildren.length !== 1 ||
      !(captionEm instanceof HTMLElement) ||
      captionEm.tagName !== 'EM' ||
      !image ||
      imageParagraph?.tagName !== 'P'
    ) {
      return
    }

    imageParagraph.replaceWith(createImageFigure(image, captionEm))
    captionParagraph.remove()
  })

  return document.body.innerHTML
}

export const BASE_HTML_CONTENT_CLASSES =
  'prose prose-lg max-w-none font-arial text-[17px] text-gray-800 leading-[1.8] tracking-[0.01em] break-words ' +
  '[&_p]:mt-0 [&_p]:mb-4 [&_p]:text-[17px] [&_p]:text-left [&_p]:indent-0 ' +
  '[&_p:has(strong)]:mb-1 ' +
  '[&_span[data-quote]]:italic [&_span[data-quote]]:text-slate-900 [&_span[data-quote]]:font-medium [&_span[data-quote]]:bg-amber-50/70 [&_span[data-quote]]:px-1 [&_span[data-quote]]:rounded ' +
  '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:leading-tight ' +
  '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:leading-snug ' +
  '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 ' +
  '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 ' +
  '[&_li]:mb-1 [&_li]:text-[17px] [&_li]:text-left [&_li]:leading-[1.6] [&_li]:indent-0 [&_li>p]:my-0 [&_li>p]:text-left [&_li>p]:indent-0 ' +
  '[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 ' +
  '[&_figure.image-caption]:my-8 [&_figure.image-caption]:text-center [&_figure.image-caption_img]:my-0 ' +
  '[&_figure.image-caption_figcaption]:mt-3 [&_figure.image-caption_figcaption]:text-sm [&_figure.image-caption_figcaption]:italic [&_figure.image-caption_figcaption]:text-gray-500 [&_figure.image-caption_figcaption]:leading-relaxed ' +
  '[&_img]:mx-auto [&_img]:block [&_img]:my-6 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:max-h-[70vh] [&_img]:h-auto [&_img]:object-contain [&_img]:shadow-md [&_img]:ring-1 [&_img]:ring-black/5 ' +
  '[&_video]:mx-auto [&_video]:block [&_video]:my-6 [&_video]:rounded-lg [&_video]:max-w-full ' +
  '[&_iframe]:mx-auto [&_iframe]:block [&_iframe]:my-6 [&_iframe]:max-w-full ' +
  '[&_a]:text-blue-600 [&_a:hover]:underline'

const COLLAPSED_CONTENT_HEIGHT = 320

export const HtmlContent: React.FC<HtmlContentProps> = ({
  content,
  className = '',
  enableQuoteHighlight = true,
  enableReadMore = false,
  as: Component = 'div',
  ...rest
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const processedHtml = useMemo(() => {
    if (!content) return ''
    const html = renderImageLinks(content)
    return enableQuoteHighlight ? highlightQuotes(html) : html
  }, [content, enableQuoteHighlight])

  useEffect(() => {
    setIsExpanded(false)
    const contentElement = contentRef.current
    if (!enableReadMore || !contentElement) {
      setHasOverflow(false)
      return
    }

    const updateOverflow = () => setHasOverflow(contentElement.scrollHeight > COLLAPSED_CONTENT_HEIGHT)
    updateOverflow()

    const resizeObserver = new ResizeObserver(updateOverflow)
    resizeObserver.observe(contentElement)
    return () => resizeObserver.disconnect()
  }, [enableReadMore, processedHtml])

  if (!content) return null

  const htmlContent = (
    <Component
      className={`${BASE_HTML_CONTENT_CLASSES} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
      {...rest}
    />
  )

  if (!enableReadMore) return htmlContent

  return (
    <div>
      <div
        className='relative overflow-hidden'
        style={{
          maxHeight: hasOverflow && !isExpanded ? COLLAPSED_CONTENT_HEIGHT : undefined
        }}
      >
        <div ref={contentRef}>{htmlContent}</div>
        {hasOverflow && !isExpanded && (
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent'
          />
        )}
      </div>
      {hasOverflow && (
        <button
          type='button'
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((expanded) => !expanded)}
          className='mt-2 font-semibold text-blue-600 hover:text-blue-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

export default HtmlContent
