const use = require("@tensorflow-models/universal-sentence-encoder");

const Predict = async (phrase, model) => {

    const sentenceEncoder = await use.load();
    let Data = [{ message: phrase }];
    let Sentences = Data.map(t => t.message.toLowerCase());
    const xPredict = await sentenceEncoder.embed(Sentences);
    let prediction = await model.predict(xPredict).data();

    let highest = [0, 0];
    for (let i = 0; i < prediction.length; ++i) {
        if (highest[1] < prediction[i]) {
            highest[0] = i;
            highest[1] = prediction[i];
        }
    }

    let predicted = "";
    switch (highest[0]) {
        case 0:
            predicted = "Greeting";
            break;
        case 1:
            predicted = "Goodbye";
            break;
        case 2:
            predicted = "Insult";
            break;
        case 3:
            predicted = "Compliment";
            break;
    }

    return {predicted: {str: predicted, value: highest[1]}, predictions: prediction};
}

module.exports = Predict;