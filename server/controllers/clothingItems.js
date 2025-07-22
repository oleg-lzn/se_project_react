const clothingItem = require("../models/clothingItem");
const serverStatuses = require("../utils/errors");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

// Get all items

const getItems = (_, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(serverStatuses.success).send(items))
    .catch(next);
};

// Create Item

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(`item ${name} created`);
      return res.status(serverStatuses.created).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError")
        next(new BadRequestError("Invalid Data Provided."));
      else next(err);
    });
};

// Delete by ID

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      if (item.owner.toString() !== userId)
        throw new ForbiddenError("You are not allowed to delete this item");
      return clothingItem
        .findByIdAndDelete(itemId)
        .orFail(() => {
          throw new NotFoundError("Item not found");
        })
        .then((deletedItem) =>
          res.status(serverStatuses.success).send(deletedItem)
        );
    })
    .catch((err) => {
      if (err.name === "CastError")
        next(new BadRequestError("Invalid Item Id format"));
      else next(err);
    });
};

// Likes

const likeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((like) => res.status(serverStatuses.success).send(like))
    .catch((err) => {
      if (err.name === "CastError")
        next(new BadRequestError("Invalid Item Id format"));
      else next(err);
    });
};

// Dislike

const dislikeItem = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((dislike) => res.status(serverStatuses.success).send(dislike))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
