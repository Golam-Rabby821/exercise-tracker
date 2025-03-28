const { User} = require('./models')

const createUser = async (req, res) => {
    try {
        const {username} = req.body;

        if(!username){
            return res.status(400).json({ error: 'Username is required' });
        }

        const newUser = new User({ username })
        const savedUser = await newUser.save()

        console.log('New user created:', savedUser);

        res.status(201).json({ username: savedUser.username, _id: savedUser._id });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        console.log(users)

        res.status(200).json(users)
        
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const createExercise = async (req, res) => {
    try {
        const {_id} = req.params
        const { description, duration, date} = req.body

        // Check _id is available on database or not
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).json({ error: "User not found" })
        }

        const formattedDate = date ? new Date(date) : new Date();

        user.log.push({
            description,
            duration: Number(duration),
            date: formattedDate
        });
        
         // Save the updated user object
         await user.save();

         // Return the user object with exercise fields
         res.status(201).json({
             username: user.username,
             description,
             duration: Number(duration),
             date: formattedDate.toDateString(),
             _id: user._id,
         });

    } catch (error) {
        console.error('Error Creating Exercises:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getLogs = async (req, res) => {
    try {
        const { _id } = req.params;
    const { from, to, limit } = req.query;

    const user  = await User.findById(_id)
    if(!user){
        return res.status(404).json({ error: "User not found" })
    }

    let logs = user.log.map(exercise => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString() // Format date as requested
    }));

    // Apply date filtering if from or to parameters exist
    if (from) {
      const fromDate = new Date(from);
      logs = logs.filter(exercise => new Date(exercise.date) >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      logs = logs.filter(exercise => new Date(exercise.date) <= toDate);
    }

    // Apply limit if provided
    if (limit) {
      logs = logs.slice(0, Number(limit));
    }

    // Construct response object
    res.json({
      username: user.username,
      count: logs.length,
      _id: user._id,
      log: logs
    });


    } catch (error) {
        console.error('Error Creating Exercises:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    createExercise,
    getLogs
}