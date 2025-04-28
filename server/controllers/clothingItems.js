const clothingItem = require("../models/clothingItem");
const serverStatuses = require("../utils/errors");

// Get all items

const getItems = (_, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(serverStatuses.success).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(serverStatuses.serverError)
        .send({ message: "An error has occurred on the server." });
    });
};

// Create Item

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(`item ${name} created`);
      return res.status(serverStatuses.created).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(serverStatuses.invalidData)
          .send({ message: err.message });
      }
      return res
        .status(serverStatuses.serverError)
        .send({ message: "An error has occurred on the server." });
    });
};

// Delete by ID

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  clothingItem
    .findById(itemId)
    .orFail(() => new Error("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== userId) {
        return res
          .status(serverStatuses.forbidden)
          .send({ message: "You are not allowed to delete this item." });
      }
      return clothingItem
        .findByIdAndDelete(itemId)
        .orFail(() => new Error("Item deletion not successful"))
        .then((deletedItem) =>
          res.status(serverStatuses.success).send(deletedItem)
        );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(serverStatuses.invalidData)
          .send({ message: "Invalid item Id" });
      }
      if (err.message === "Item not found") {
        return res
          .status(serverStatuses.notFound)
          .send({ message: "Item not found" });
      }
      return res
        .status(serverStatuses.serverError)
        .send({ message: "An error has occurred on the server." });
    });
};

// Likes

const likeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => new Error("Like not successful"))
    .then((like) => res.status(serverStatuses.success).send(like))
    .catch((err) => {
      console.error(err);
      if (err.message === "Like not successful") {
        return res
          .status(serverStatuses.notFound)
          .send({ message: "Like not successful" });
      }
      if (err.name === "CastError") {
        return res
          .status(serverStatuses.invalidData)
          .send({ message: "Invalid item ID format" });
      }
      return res
        .status(serverStatuses.serverError)
        .send({ message: "An error has occurred on the server." });
    });
};

// Dislike

const dislikeItem = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => new Error("dislike not successful"))
    .then((dislike) => res.status(serverStatuses.success).send(dislike))
    .catch((err) => {
      console.error(err);
      if (err.message === "dislike not successful") {
        return res
          .status(serverStatuses.notFound)
          .send({ message: "dislike not successful" });
      }
      if (err.name === "CastError") {
        return res
          .status(serverStatuses.invalidData)
          .send({ message: "Invalid item ID format" });
      }
      return res
        .status(serverStatuses.serverError)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
