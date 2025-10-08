#!/bin/bash
set -e

cd /var/www/html/online-course || { echo "Lỗi: Không tìm thấy thư mục repository."; exit 1; }

echo "====================Bắt đầu backup online-course lúc $(date)=========================="

# Xóa các image Docker không còn tag nào để giải phóng không gian
docker images | grep '<none>' | awk '{print $3}' | xargs -r docker rmi

# (Quan trọng) Cập nhật trạng thái từ remote trước khi push để tránh lỗi
git pull origin

# Thêm tất cả các file mới hoặc đã thay đổi
git add .

# Chỉ commit khi có thay đổi thực sự
if ! git diff-index --quiet --cached HEAD; then
  echo "Phát hiện thay đổi, đang commit..."
  git commit -m "Auto Backup: Cập nhật ngày $(date +'%Y-%m-%d %H:%M:%S')"
  git push
  echo "Push thành công."
else
  echo "Không có thay đổi nào để push."
fi

echo "Hoàn tất."
echo "--------------------"