const Workout = require("../models/workoutdb.js");
const router = require("express").Router();


router.get("/api/workouts/range", (req, res) => {
    Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);  
    });
});

router.get("/api/workouts/:id", (req, res) => {
    let id = req.params.id;
    Workout.findById(id)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err); 
    });
});

router.get("/api/workouts", (req, res) => {
    Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts", ({body}, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post("/api/workouts/bulk", ({body}, res) => {
    Workout.insertMany(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json.apply(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
    let id = req.params.id;
    Workout.findByIdAndUpdate(id, req.body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);  
    });
});

module.exports = router;