CREATE TABLE similar_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_product VARCHAR(36) NOT NULL,
  second_product VARCHAR(36) NOT NULL,
  FOREIGN KEY (first_product) REFERENCES products(product_id) ON DELETE CASCADE,
  FOREIGN KEY (second_product) REFERENCES products(product_id) ON DELETE CASCADE
);