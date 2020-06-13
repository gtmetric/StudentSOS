const express = require('express');
const path = require('path');
const app1 = express();
const router1 = express.Router();
const app2 = express();
const router2 = express.Router();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const VoteMng = require('./model.js');
const voteMng = new VoteMng();
const cookieParser = require('cookie-parser');
const maxAge = 1800000;

app1.use(express.json());
app1.use(express.urlencoded({ extended: true }));
app2.use(express.json());
app2.use(express.urlencoded({ extended: true }));

app1.set('views', path.join(__dirname, 'views'));
app1.set('view engine','ejs');
app2.set('views', path.join(__dirname, 'views'));
app2.set('view engine','ejs');

app1.use(cookieParser());
app1.use(cors());

// Student server root at http://localhost:5500/
app1.use('/', router1);
// Instrutor server root at http://localhost:8080/
app2.use('/', router2);

// Send the student's page to the client
router1.get('/', function(req, res) {
    res.render('student');
});

// Send the topic to the client
router1.get('/topic', async function(req, res) {
    let topic = await voteMng.getTopic();
    res.send({ message: topic });
});

// If the client voted OK, respond with a message about the voting status.
router1.get('/ok', async function(req, res) {
    let set = await voteMng.voteOK(req.cookies.set);

    if(await voteMng.getSet()==0) {
        res.cookie('set', set, { maxAge: maxAge })
            .send({ message: 'The topic is loading.' });
    }
    else if(set) {
        res.cookie('set', set, { maxAge: maxAge })
            .send({ message: 'Voted OK Successfully!' });
    }
    else {
        res.cookie('set', req.cookies.set, { maxAge: maxAge })
            .send({ message: 'You have already voted.' })
    }
});

// If the client voted SOS, respond with a message about the voting status.
router1.get('/sos', async function(req, res) {
    let set = await voteMng.voteSOS(req.cookies.set);

    if(await voteMng.getSet()==0) {
        res.cookie('set', set, { maxAge: maxAge })
            .send({ message: 'The topic is loading.' });
    }
    else if(set) {
        res.cookie('set', set, { maxAge: maxAge })
            .send({ message: 'Voted SOS Successfully!' });
    }
    else {
        res.cookie('set', req.cookies.set, { maxAge: maxAge })
            .send({ message: 'You have already voted.' })
    }
});

// Send the instuctor's page to the client
router2.get('/', function(req, res) {
    res.render('instructor');
});

// Send the updated info to the client
router2.get('/info', async function(req, res) {
    let totalVote = await voteMng.getTotalVote();
    let okVote = await voteMng.getOKPercent();
    let sosVote = await voteMng.getSOSPercent();
    let topic = await voteMng.getTopic();

    let data = {
        totalVote: totalVote,
        ok: okVote,
        sos: sosVote,
        topic: topic
    }

    res.send({ data: data });
});

// Reset the topic and send back the status
router2.get('/:topic', async function(req, res) {
    let topic = req.params.topic;
    await voteMng.reset(topic);
    res.send({ message: "Successful changed the topic." });
});

app1.listen(process.env.PORT1, function(){
    console.log('Student server hosting at http://localhost:' + process.env.PORT1 + '/');
});

app2.listen(process.env.PORT2, function(){
    console.log('Instructor server hosting at http://localhost:' + process.env.PORT2 + '/');
});