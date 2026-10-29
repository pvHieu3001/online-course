export const getImageUrl = (url: string): string => {
  if (/^https?:\/\//i.test(url)) return url

  const domain = import.meta.env.VITE_DOMAIN_IMAGE_URL
  const encodedUrl = url.split('/').map(encodeURIComponent).join('/')
  return `${domain}${encodedUrl}`
}
