// script.js
let score = 0; // متغير لتتبع النقاط
let timerInterval; // متغير لتخزين المؤقت

// دالة لاختيار الخيار المناسب
function chooseOption(option) {
    clearInterval(timerInterval); // إيقاف أي مؤقت نشط
    document.getElementById('scene1').classList.add('hidden'); // إخفاء المشهد الأول

    // تحديد الخيار الذي تم اختياره
    if (option === 'save') {
        document.getElementById('result-green').classList.remove('hidden'); // إظهار شاشة النجاح
        playSound('success-sound'); // تشغيل صوت النجاح
        updateScore(10); // إضافة النقاط
        startTimer(10, () => {
            document.getElementById('result-green').classList.add('hidden');
            document.getElementById('scene2-save').classList.remove('hidden'); // الانتقال إلى المشهد التالي
        });
    } else if (option === 'buy') {
        document.getElementById('result-red').classList.remove('hidden'); // إظهار شاشة الفشل
        playSound('failure-sound'); // تشغيل صوت الفشل
        updateScore(-5); // خصم النقاط
        startTimer(10, () => {
            document.getElementById('result-red').classList.add('hidden');
            document.getElementById('scene2-save').classList.remove('hidden'); // الانتقال إلى المشهد التالي
        });
    }
}

// دالة للانتقال إلى المشهد التالي
function nextScene(option) {
    clearInterval(timerInterval);
    document.querySelector('.scene.visible').classList.add('hidden'); // إخفاء المشهد الحالي

    if (option === 'invest') {
        document.getElementById('scene3-invest').classList.remove('hidden'); // إظهار مشهد النجاح في الاستثمار
        changeBackgroundColor('#32CD32'); // تغيير لون الخلفية
        playSound('success-sound'); // تشغيل صوت النجاح
        updateScore(20); // إضافة النقاط
    } else if (option === 'spend') {
        document.getElementById('scene3-spend').classList.remove('hidden'); // إظهار مشهد الفشل في الإنفاق
        changeBackgroundColor('#FF6347'); // تغيير لون الخلفية
        playSound('failure-sound'); // تشغيل صوت الفشل
        updateScore(-10); // خصم النقاط
    }
}

// دالة لبدء المؤقت
function startTimer(duration, onTimeout) {
    let timeLeft = duration;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
    timerElement.classList.remove('hidden');

    timerInterval = setInterval(() => {
        timeLeft -= 1;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.classList.add('hidden');
            onTimeout(); // تنفيذ الدالة عند انتهاء الوقت
        }
    }, 1000);
}

// دالة لتحديث النقاط
function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = `النقاط: ${score}`;
}

// دالة لتشغيل الأصوات
function playSound(soundId) {
    document.getElementById(soundId).play();
}

// دالة لإعادة تعيين اللعبة
function restart() {
    clearInterval(timerInterval);
    document.querySelectorAll('.scene, .result').forEach(scene => {
        scene.classList.add('hidden');
    });
    document.getElementById('scene1').classList.remove('hidden');
    changeBackgroundColor('#1e1e1e');
    score = 0;
    updateScore(0);
}

// دالة لإنهاء القصة
function finish() {
    alert('لقد أكملت القصة بنجاح! تذكر دائمًا أهمية القرارات المالية الحكيمة.');
    restart();
}

// دالة لتغيير لون الخلفية
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}
