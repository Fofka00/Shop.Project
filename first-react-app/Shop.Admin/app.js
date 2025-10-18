const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/admin', async (req, res) => {
  const { data: products } = await axios.get('http://localhost:3000/api/products');
  res.render('products', { products });
});

app.get('/admin/new-product', (req, res) => {
  res.render('product-new');
});

app.post('/admin/new-product', async (req, res) => {
  const { title, description, price } = req.body;
  const { data: product } = await axios.post('http://localhost:3000/api/products', { title, description, price });
  res.redirect(`/admin/${product.id}`);
});

app.get('/admin/:id', async (req, res) => {
  const { id } = req.params;
  const { data: product } = await axios.get(`http://localhost:3000/api/products/${id}`);
  product.id = product.id || product.product_id;
  console.log('product:', product);
  const { data: similar } = await axios.get(`http://localhost:3000/api/products/similar/${id}`);
  const { data: allProducts } = await axios.get('http://localhost:3000/api/products');
  const similarIds = similar.map(p => p.id);
  const others = allProducts.filter(p => p.id !== id && !similarIds.includes(p.id));
  similar.forEach(p => { p.id = p.id || p.product_id; });
  others.forEach(p => { p.id = p.id || p.product_id; });
  res.render('product-edit', { product, similar, others });
});

app.post('/admin/:id/save', async (req, res) => {
  const { id } = req.params;
  let addSimilar = req.body.addSimilar || [];
  let removeSimilar = req.body.removeSimilar || [];

  if (!Array.isArray(addSimilar)) addSimilar = addSimilar ? [addSimilar] : [];
  if (!Array.isArray(removeSimilar)) removeSimilar = removeSimilar ? [removeSimilar] : [];

  if (addSimilar.length) {
    const pairs = addSimilar.map(otherId => [id, otherId]);
    await axios.post(
      'http://localhost:3000/api/products/add-similar',
      pairs,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  if (removeSimilar.length) {
    await axios.post(
      'http://localhost:3000/api/products/remove-similar',
      removeSimilar,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  res.redirect(`/admin/${id}`);
});

app.listen(4000, () => console.log('Admin running on port 4000'));