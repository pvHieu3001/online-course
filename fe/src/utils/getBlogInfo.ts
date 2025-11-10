export const getBlogInfoByType = (type: string): { path: string; title: string } => {
  let title = 'Văn Hóa Công Nghệ'
  let path = 'game'
  switch (type) {
    case 'game':
      path = 'game'
      title = 'Game Hot'
      break
    case 'technology':
      path = 'san-pham-cong-nghe'
      title = 'Sản Phẩm Công Nghệ'
      break
    case 'crypto':
      path = 'crypto'
      title = 'Tiền Mã Hóa'
      break
    case 'stock':
      path = 'chung-khoan'
      title = 'Chứng Khoán'
      break
    case 'tips':
      path = 'thu-thuat-huu-ich'
      title = 'Thủ Thuật Hữu Ích'
      break
    case 'archive':
      path = 'suu-tam'
      title = 'Sưu Tầm'
      break
  }
  return { path, title }
}
