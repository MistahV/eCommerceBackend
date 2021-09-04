const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    Category.findAll(
    {
      include: [Product]
    }
  ).then((categories) => res.json(categories))
   .catch((err) => {
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
   Category.findOne(
    {
      where: {
          id: req.params.id
      },
      include: [Product]
    }
  ).then((category) => res.json(category))
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.post('/', (req, res) => {
    Category.create(req.body)
    .then((newCategory) => res.status(200).json(newCategory))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
    Category.update(
    req.body,
    {
      where: {
         id: req.params.id
      },
    }).then((updatedCategory) => res.status(200).json(updatedCategory))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
   Category.destroy(
    {
      where: {
         id: req.params.id
      },
    })
    .then((deletedCategory) => res.status(200).json(deletedCategory))
    .catch((err) => {
      res.status(400).json(err);
    });
});



module.exports = router;
