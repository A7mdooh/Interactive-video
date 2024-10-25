// script.js
let timerInterval;

function chooseOption(option) {
    // إيقاف المؤقت السابق (إذا كان موجودًا)
    clearInterval(timerInterval);

    document.getElementById('scene1').classList.add('hidden');

    if (option === 'save') {
        document.getElementById('scene2-save').classList.remove('hidden');
        changeBackgroundColor('#4CAF50');
        playSound('success-sound');
        startTimer(10, 'scene2-save'); // تشغيل مؤقت 10 ثوانٍ للمشهد الثاني
    } else if (option === 'buy') {
        document.getElementById('scene2-buy').classList.remove('hidden');
        changeBackgroundColor('#FF6347');
        playSound('failure-sound');
    }
}

function nextScene(option) {
    clearInterval(timerInterval);
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

function startTimer(seconds, sceneId) {
    let timeLeft = seconds;
    const timerElement = document.getElementById('timer');
    timerElement.classList.remove('hidden');
    timerElement.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft -= 1;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.classList.add('hidden');
            document.getElementById(sceneId).classList.add('hidden');
            document.getElementById('scene2-buy').classList.remove('hidden');
            changeBackgroundColor('#FF6347');
            playSound('failure-sound');
        }
    }, 1000);
}

function restart() {
    clearInterval(timerInterval);
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.add('hidden');
    });
    document.getElementById('scene1').classList.remove('hidden');
    changeBackgroundColor('#1e1e1e');
    document.getElementById('background-music').play();
}

function finish() {
    alert('لقد أكملت القصة بنجاح! تذكر دائمًا أهمية القرارات المالية الحكيمة.');
    restart();
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

function playSound(soundId) {
    document.getElementById(soundId).play();
}

// بدء تشغيل الموسيقى الخلفية
document.getElementById('background-music').play();
