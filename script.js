// script.js
function chooseOption(option) {
    document.getElementById('scene1').classList.add('hidden');

    if (option === 'save') {
        document.getElementById('result-green').classList.remove('hidden');
        playSound('success-sound');
        setTimeout(() => {
            document.getElementById('result-green').classList.add('hidden');
            document.getElementById('scene2-save').classList.remove('hidden');
        }, 10000); // الانتظار لمدة 10 ثوانٍ أو حسب طول الفيديو
    } else if (option === 'buy') {
        document.getElementById('result-red').classList.remove('hidden');
        playSound('failure-sound');
        setTimeout(() => {
            document.getElementById('result-red').classList.add('hidden');
            document.getElementById('scene2-save').classList.remove('hidden');
        }, 10000); // الانتظار لمدة 10 ثوانٍ أو حسب طول الفيديو
    }
}

function nextScene(option) {
    document.querySelector('.scene.visible').classList.add('hidden');

    if (option === 'invest') {
        document.getElementById('scene3-invest').classList.remove('hidden');
        changeBackgroundColor('#32CD32');
        playSound('success-sound');
    } else if (option === 'spend') {
        document.getElementById('scene3-spend').classList.remove('hidden');
        changeBackgroundColor('#FF6347');
        playSound('failure-sound');
    }
}

function playSound(soundId) {
    document.getElementById(soundId).play();
}

function restart() {
    document.querySelectorAll('.scene, .result').forEach(scene => {
        scene.classList.add('hidden');
    });
    document.getElementById('scene1').classList.remove('hidden');
    changeBackgroundColor('#1e1e1e');
}

function finish() {
    alert('لقد أكملت القصة بنجاح! تذكر دائمًا أهمية القرارات المالية الحكيمة.');
    restart();
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}
