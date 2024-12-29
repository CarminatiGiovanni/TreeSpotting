const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Tree = require('./schema/treeSchema');
const Pod = require('./schema/podSchema');
const Ruin = require('./schema/ruinSchema');
const Slack = require('./schema/slackSchema');

const app = express();

const PORT = process.env.PORT || 443;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => {
        console.log(`>> Listening at PORT:${PORT}, DB connected`);
    }))
    .catch(err => console.error('>> Error connecting to MongoDB', err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

////// READ ALL //////7 /////////////////////////////////////////////////

app.post('/trees', (req, res) => {
    Tree.find()
        .then(trees => res.json(trees))
        .catch(err => res.status(500).send(err));
});

app.post('/pods', (req, res) => {
    Pod.find()
        .then(pods => res.json(pods))
        .catch(err => res.status(500).send(err));
});

app.post('/ruins', (req, res) => {
    Ruin.find()
        .then(ruins => res.json(ruins))
        .catch(err => res.status(500).send(err));
});

app.post('/slack', (req, res) => {
    Ruin.find()
        .then(slack => res.json(slack))
        .catch(err => res.status(500).send(err));
});

// UPDATE /////////////////////////////////////////////////////////////////

app.post('/update_tree', (req, res) => {
    Tree.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(tree => res.json(tree))
        .catch(err => res.status(500).send(err));
});

app.post('/update_pod', (req, res) => {
    Pod.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(pod => res.json(pod))
        .catch(err => res.status(500).send(err));
});

app.post('/update_ruin', (req, res) => {
    Ruin.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(ruin => res.json(ruin))
        .catch(err => res.status(500).send(err));
});

app.post('/update_slack', (req, res) => {
    Ruin.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(slack => res.json(slack))
        .catch(err => res.status(500).send(err));
});


//// ADD /////////////////////////////////////////////////////////////////

app.post('/add_tree', (req, res) => {
    const tree = new Tree(req.body);
    tree.save()
        .then((result) => res.send(result))
        .catch(err => res.send(err));
});

app.post('/populate_tree', (req, res) => { // handle arrays
    let errors = [];
    req.body.forEach(t => {
        const tree = new Tree(t);
        tree.save()
            .catch(err => errors.push(err));
    });
    if (errors.length > 0) res.send(errors);
    else res.send('Trees added');
});

app.post('/add_pod', (req, res) => {
    const pod = new Pod(req.body);
    pod.save()
        .catch(err => res.send(err))
        .then(() => res.send({result:'Pod added'}));
}); 

app.post('/populate_pod', (req, res) => { // handle arrays
    let errors = [];
    req.body.forEach(p => {
        const pod = new Pod(p);
        pod.save()
            .catch(err => errors.push(err));
    });
    if (errors.length > 0) res.send(errors);
    else res.send('Pods added');
});

app.post('/add_ruin', (req, res) => {
    const ruin = new Ruin(req.body);
    ruin.save()
        .then(() => res.send({result:'Ruin added'}))
        .catch(err => res.send(err));
});

app.post('/populate_ruin', (req, res) => { // handle arrays
    let errors = [];
    req.body.forEach(r => {
        const ruin = new Ruin(r);
        ruin.save()
            .catch(err => errors.push(err));
    });
    if (errors.length > 0) res.send(errors);
    else res.send('Ruins added');
});

app.post('/add_slack', (req, res) => {
    const slack = new Slack(req.body);
    slack.save()
        .then(() => res.send({result:'Slack added'}))
        .catch(err => res.send(err));
});

app.post('/populate_slack', (req, res) => { // handle arrays
    let errors = [];
    req.body.forEach(s => {
        const slack = new Slack(s);
        slack.save()
            .catch(err => errors.push(err));
    });
    if (errors.length > 0) res.send(errors);
    else res.send('Slacks added');
});


/////   DELETE /////////////////////////////////////////////////////////////////

app.post('/delete_tree', (req, res) => {
    Tree.findByIdAndDelete(req.body._id)
        .then(() => res.send('Tree deleted'))
        .catch(err => res.send(err));
});

app.post('/delete_pod', (req, res) => {
    Pod.findByIdAndDelete(req.body._id)
        .then(() => res.send('Pod deleted'))
        .catch(err => res.send(err));
});

app.post('/delete_ruin', (req, res) => {
    Ruin.findByIdAndDelete(req.body._id)
        .then(() => res.send('Ruin deleted'))
        .catch(err => res.send(err));
});

app.post('/delete_slack', (req, res) => {
    Slack.findByIdAndDelete(req.body._id)
        .then(() => res.send('Slack deleted'))
        .catch(err => res.send(err));
});


// 54.86.60.29:80
// ec2-user
//  kill -9 $(ps aux | grep '\snode\s' | awk '{print $2}')
// sudo su