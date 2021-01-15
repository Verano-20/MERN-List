exports.getList = (req, res) => {
    res.status(200).send('getList');
}

exports.newTask = (req, res) => {
    res.status(200).send('newTask');
}

exports.deleteTask = (req, res) => {
    res.status(200).send('deleteTask');
}

exports.completedTask = (req, res) => {
    res.status(200).send('completedTask');
}