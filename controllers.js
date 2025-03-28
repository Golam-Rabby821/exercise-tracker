const { Exercise, User, Log } = require("./models");

const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const newUser = new User({ username });
    const savedUser = await newUser.save();

    console.log("New user created:", savedUser);

    res.status(201).json({ username: savedUser.username, _id: savedUser._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    console.log(users);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createExercise = async (req, res) => {
  try {
    const { [":_id"]: _id, description, duration, date } = req.body;

    // Check _id is available on database or not
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const formattedDate = date
      ? new Date(date).toDateString()
      : new Date().toDateString();

    const newExercise = new Exercise({
      username: user.username,
      description,
      duration: Number(duration),
      date: formattedDate,
    });
    const savedExercise = await newExercise.save();

    // Update logs
    await updateUserLogs(user, savedExercise);

    console.log(savedExercise);

    res.status(201).json({
      username: savedExercise.username,
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: savedExercise.date.toDateString(),
      _id: savedExercise._id,
    });
  } catch (error) {
    console.error("Error Creating Exercises:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserLogs = async (user, savedExercise) => {
  try {
    let userLog = await Log.findOne({ username: user.username });

    if (!userLog) {
      userLog = new Log({
        username: user.username,
        count: 0,
        _id: user._id,
        log: [],
      });
    }
    userLog.log.push({
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: savedExercise.date.toDateString(),
    });

    userLog.count = userLog.log.length;

    // Save the updated log
    await userLog.save();
  } catch (error) {
    console.error("Error Updating Logs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLogs = async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Buidling a query buffer to filter acc to req params
    let query = { username: user.username };
    if (from) query.date = { $gte: new Date(from) };
    if (to) query.date = { ...query.date, $lte: new Date(to) };

    // Fetch exercises with optional limit
    const logs = await Exercise.find(query).limit(parseInt(limit));

    res.status(200).json({
      username: user.username,
      count: logs.length,
      _id: user._id,
      log: logs.map((log) => ({
        description: log.description,
        duration: log.duration,
        date: log.date,
      })),
    });
  } catch (error) {
    console.error("Error Creating Exercises:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  createExercise,
  getLogs,
};
