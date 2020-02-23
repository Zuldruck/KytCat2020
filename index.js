let model;
let key = 'B';
let trainingFinished = false;

function setup() {
    const options = {
        inputs: 2,
        outputs: 1,
        task: 'classification',
        debug: true
    };

    model = ml5.neuralNetwork(options);
    createCanvas(600, 600);
    background('gray');
}

function keyPressed() {
    key = String.fromCharCode(keyCode);
    console.log(`Key Pressed ${key}`);

    if (key === 'T') {
        const options = {
            epochs: 100
        };

        model.normalizeData();
        model.train(options, () => {
            console.log('Training finished');
            trainingFinished = true;
        });
    }
}

function mousePressed() {
    const x = mouseX;
    const y = mouseY;
    let fillColor = 'white';

    console.log(`Mouse Pressed x:${x} y:${y}`);
    if (trainingFinished) {
        model.classify([x, y], (err, res) => {
            if (err) return;
            fillColor = res[0].label;
            fill(fillColor);
            stroke('white');
            ellipse(x, y, 25);
        });
        return;
    }
    if (key === 'R') {
        fillColor = 'red';
    } else if (key === 'G') {
        fillColor = 'green';
    } else if (key === 'B') {
        fillColor = 'blue';
    }
    fill(fillColor);
    stroke('black');
    ellipse(x, y, 25);
    model.addData([x, y], [fillColor]);
}

// 1 - Add data to the model when clicking
// 2 - Normalize the data
// 3 - Train the model when enough has been added to it
// 4 - Classify the inputs when clicking after training
