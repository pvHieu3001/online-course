-- Preserve the legacy bookstore table before replacing it with the renamed catalog table.
RENAME TABLE books TO legacy_books;
RENAME TABLE courses TO books;

-- Preserve course-tag associations under the new book naming.
RENAME TABLE course_tag TO book_tags;
ALTER TABLE book_tags RENAME COLUMN course_id TO book_id;

-- Rename catalog references used by category counts, carts, and orders.
ALTER TABLE categories RENAME COLUMN number_course TO number_book;
ALTER TABLE cart_items RENAME COLUMN course_id TO book_id;
ALTER TABLE order_items RENAME COLUMN course_id TO book_id;

-- The previous course URL relation is not used by the Book entity but may contain data.
RENAME TABLE course_url TO legacy_book_url;