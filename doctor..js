const express = require("express");

const app = express();

// Sample user data with kidneys and their health status
const users = [
    {
        name: "John",
        kidney: [
            { healthy: true },
            { healthy: true },
            { healthy: true },
            { healthy: true },
            { healthy: false },
        ],
    },
];

// Middleware to parse JSON bodies
app.use(express.json());

// GET endpoint to return kidney statistics
app.get("/", (req, res) => {
    const johnKindey = users[0].kidney;
    const numberOfkindeys = johnKindey.length;
    let numberofhealthyKidneys = 0;
    for (let i = 0; i < numberOfkindeys; i++) {
        if (johnKindey[i].healthy) {
            numberofhealthyKidneys++;
        }
    }

    let numberofUnhealthyKidneys = numberOfkindeys - numberofhealthyKidneys;

    res.json({
        numberOfkindeys,
        numberofhealthyKidneys,
        numberofUnhealthyKidneys,
    });
});

// POST endpoint to add a new kidney with health status
app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0]["kidney"].push({
        healthy: isHealthy,
    });
    res.json({
        msg: "Done!",
    });
});

// PUT endpoint to make all unhealthy kidneys healthy
app.put("/", function (req, res) {
    if (checkUnhealthyKidney()) {
        const johnKindey = users[0].kidney;
        const numberOfkindeys = johnKindey.length;
        for (let i = 0; i < numberOfkindeys; i++) {
            if (!users[0]["kidney"][i].healthy) {
                users[0]["kidney"][i].healthy = true;
            }
        }

        res.json({
            msg: "done!",
        });
    } else {
        res.status(411).json({
            msg: "No unhealthy kidneys to delete",
        });
    }
});

// DELETE endpoint to remove all unhealthy kidneys
app.delete("/", function (req, res) {
    if (checkUnhealthyKidney()) {
        let johnKindey = users[0]["kidney"];
        let numberOfkindeys = johnKindey.length;
        let newKidney = [];
        for (let i = 0; i < numberOfkindeys; i++) {
            if (johnKindey[i].healthy) {
                newKidney.push({
                    healthy: true,
                });
            }
        }

        users[0]["kidney"] = newKidney;
        res.json({
            msg: "done!",
        });
    } else {
        res.status(411).json({
            msg: "No unhealthy kidneys to delete",
        });
    }
});

// Helper function to check if there is any unhealthy kidney
function checkUnhealthyKidney() {
    let isUnhealthy = false;

    for (let i = 0; i < users[0].kidney.length; i++) {
        if (!users[0].kidney[i].healthy) {
            isUnhealthy = true;
            break;
        }
    }

    return isUnhealthy;
}

// Start the server on port 2000
app.listen(2000);
