const db = require("../models");
const express = require("express");
const router = express.Router();



router.get("/api/Workouts", (req, res) => {
  db.Workout.aggregate([
    { 
      $addFields: { totalDuration: { $sum: "$exercises.duration"},}
    }
  ])
    .then(dbWorkout =>  { res.json(dbWorkout); })
    .catch(err => { res.json(err); })
    




  router.put("/api/Workouts/:id", (req, res) => {
    console.log(req.body)
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body }},
      { new: true })
      .then(dbWorkout => { res.json(dbWorkout); })
      .catch(err => { res.json(err); });
  });



  
  router.post("/api/Workouts", (req, res) => {
    db.Workout.create(req.body)
      .then(dbWorkout => { res.json(dbWorkout); })
      .catch(err => { res.json(err); });
  });



  
  router.get("/api/Workouts/range", (req, res) => {
    db.Workout.aggregate([
      { 
        $addFields: { totalDuration: { $sum: "$exercises.duration"},}
      }
  ]).then(dbWorkout => { res.json(dbWorkout); })
      .catch(err => { res.json(err); });
  });


});


module.exports = router;