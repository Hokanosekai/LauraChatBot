const fs = require('fs')
const tf = require('@tensorflow/tfjs-node')
const encoder = require('@tensorflow-models/universal-sentence-encoder')

const TrainAI = async () => {
    const data = JSON.parse(fs.readFileSync('./data.json'));
    const trainingData = [];

    for (let [key, value] of Object.entries(data)) {
        value.patterns.forEach(msg => {
            trainingData.push({type: key, message: msg});
        });
    }

    const sentenceEncoder = await encoder.load();
    const sentences = trainingData.map(t => t.message.toLowerCase());
    const xs = await sentenceEncoder.embed(sentences);
    const ys = tf.tensor2d(trainingData.map(t => [
        t.type === 'greeting'? 1 : 0,
        t.type === 'compliment'? 1 : 0,
        t.type === 'goodbye'? 1 : 0,
        t.type === 'insult'? 1 : 0,
    ]));

    const model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: [xs.shape[1]],
        activation: "sigmoid",
        units: 20
    }));

    model.add(tf.layers.dense({
        activation: "softmax",
        units: 4
    }));


    model.compile({
        loss: 'categoricalCrossentropy',
        optimizer: tf.train.adam(0.001),
        metrics: ['accuracy']
    });

    const onBatchEnd = (batch, logs) => {
        console.log('Accuracy', logs.acc);
    }

    await model.fit(xs, ys, {
        batchSize: 32,
        validationSplit: 0.1,
        shuffle: true,
        epochs: 300,
        callbacks: {onBatchEnd}
    }).then(info => {
        console.log('Final accuracy', info.history.acc);

    });
    return model;
}

module.exports = TrainAI;