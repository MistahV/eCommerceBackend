const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  const categoryData = Category.findAll().catch((err) => {
    res.json(err);
  });
  res.json(categoryData);
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  const oneCategory = Category.findOne(
    {
      where: {
          id: req.params.id
      },
    }
  ).catch((err) => {
    res.json(err);
  });
  res.json(oneCategory);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try {
    const newCategory = Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(newCategory);
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  try {
    const updatedCategory = Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
         id: req.params.id
      },
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(updatedCategory)
  }
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const deletedCategory = Category.destroy(
    {
      where: {
         id: req.params.id
      },
    });
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(400).json(deletdCategory)
  }
  // delete a category by its `id` value
});

module.exports = router;
