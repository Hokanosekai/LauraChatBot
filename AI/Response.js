const fs = require("fs");
const JW = require('../AI/JaroWinkler');

const Response = async (predict, phrase) => {
    const DataT = JSON.parse(fs.readFileSync('./data.json'));
    let input = [undefined, 0];



    DataT[predict.predicted.str.toLowerCase()].patterns.forEach(msg => {
        let weight = JW(phrase, msg);
        if (weight > input[1]) {
            input[0] = msg;
            input[1] = weight;
        }
    });

    let possibleResponses = [];
    if (input[1] > 0.5) {
        DataT[predict.predicted.str.toLowerCase()].responses.forEach(res => {
            if (res.question === input[0]) possibleResponses.push(res.message);
        });
    }

    if (possibleResponses.length === 0) {
        possibleResponses.push('Sans doute');
    }

    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
}

module.exports = Response;