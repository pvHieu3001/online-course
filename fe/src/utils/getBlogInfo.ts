export const getBlogInfoByType = (type: string): { path: string; title: string } => {
  let title = 'Tech Culture'
  let path = 'game'
  switch (type) {
    case 'game':
      path = 'game'
      title = 'Hot Games'
      break
    case 'technology':
      path = 'san-pham-cong-nghe'
      title = 'Tech Products'
      break
    case 'crypto':
      path = 'crypto'
      title = 'Crypto'
      break
    case 'stock':
      path = 'chung-khoan'
      title = 'Stock'
      break
    case 'tips':
      path = 'thu-thuat-huu-ich'
      title = 'Useful Tips'
      break
    case 'archive':
      path = 'suu-tam'
      title = 'Collections'
      break
  }
  return { path, title }
}
