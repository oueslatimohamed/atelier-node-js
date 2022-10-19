import { validationResult } from "express-validator";
import Game from "../models/game.js";

export function getAll(req, res) {
  Game.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          id: docs[i]._id,
          title: docs[i].title,
          price: docs[i].price,
        });
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addOnce(req, res) {
  if(!validationResult(req).isEmpty()){
    res.status(400).json({errors:validationResult(req).array()});
  } else {
    Game.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image : `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
      quantity: req.body.quantity
    })
    .then(newGame => {
      res.status(200).json(newGame);
    })
    
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  }

}

export function getOnce(req, res) {
  Game.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  Game.findByIdAndUpdate(req.params.id, req.body)
    .then((doc1) => {
      Game.findById(req.params.id)
        .then((doc2) => {
          res.status(200).json(doc2);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
