const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll(
    {
      include: [ProductTag, Product]
    }.then((tags) => res.json(tags))
    .catch((err) => {
     res.status(400).json(err);
   }));
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne(
    {
      where: {
          id: req.params.id
      },
      include: [{Product}, 
        {ProductTag,
        where: {id: tag_id}},]
    }
  ).then((tag) => res.json(tag))
  .catch((err) => {
    res.status(400).json(err);
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});


router.post('/', (req, res) => {
  // create a new tag
});


router.put('/:id', (req, res) => {
  
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { tag_id: req.params.id } });
    })
    .then((tagProducts) => {
      // get list of current product_ids
      const tagProductIds = tagProducts.map(({ product_id }) => product_id);
      // create filtered list of new product_ids
      const newTagProducts = req.body.productIds
        .filter((product_id) => !tagProductIds.includes(product_id))
        .map((product_id) => {
          return {
            tag_id: req.params.id,
            product_id,
          };
        });
      // figure out which ones to remove
      const tagProductsToRemove = tagProducts
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: tagProductsToRemove } }),
        ProductTag.bulkCreate(newTagProducts),
      ]);
    })
    .then((updatedTagProducts) => res.json(updatedTagProducts))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
  // update a tag's name by its `id` value
});


router.delete('/:id', (req, res) => {
  Tag.destroy(
    {
      where: {
         id: req.params.id
      },
    })
    .then((deletedTag) => res.status(200).json(deletedTag))
    .catch((err) => {
      res.status(400).json(err);
    });
  // delete on tag by its `id` value
});




module.exports = router;
