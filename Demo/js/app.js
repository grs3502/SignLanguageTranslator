const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let isVideo = false;
let model = null;

// video.width = 500
// video.height = 400

const modelParams = {
    flipHorizontal: true,   // flip e.g for video
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

handTrack.startVideo(video).then(function (status) {
    if (status) {
        isVideo = true
        runDetection()
    }
});

function runDetection() {
    model.detect(video).then(predictions => {
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
});
