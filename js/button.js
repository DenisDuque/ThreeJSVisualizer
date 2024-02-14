document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('visualizerBtn').addEventListener('click', function() {
        const model = 'blackVans';

        const visualizerUrl = 'visualizer.html?model=' + model;

        window.open(visualizerUrl, '_blank');
    });
});