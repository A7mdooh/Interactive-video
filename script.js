// متغيرات لتتبع النقاط والمؤقت وسجل القرارات
let score = 0;
let timerInterval;
let decisionHistory = [];

// دالة لعرض التحدي اليومي
function showDailyChallenge() {
    const dailyChallenges = [
        "حاول توفير 20% من دخلك اليومي.",
        "تجنب شراء المشروبات الغازية اليوم.",
        "استثمر في تعلم مهارة جديدة بدلاً من شراء شيء ترفيهي.",
        "قم بتدوين جميع مصاريفك اليوم لتتعرف على أماكن التوفير."
    ];
    const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
    alert(`تحدي اليوم: ${dailyChallenges[randomIndex]}`);
}

// عرض التحدي اليومي عند بدء اللعبة
showDailyChallenge();

// دالة لاختيار الخيار المناسب مع إضافة الرسوم المتحركة
function chooseOption(option) {
    decisionHistory.push(option);
    clearInterval(timerInterval);

    anime({
        targets: '#scene1',
        opacity: 0,
        duration: 500,
        easing: 'easeInOutQuad',
        complete: () => {
            document.getElementById('scene1').classList.add('hidden');
            showResult(option);
            checkDecisionPattern();
        }
    });
}

// دالة لعرض النتيجة بناءً على الخيار
function showResult(option) {
    if (option === 'save') {
        updateCharacter('happy', 'أحسنت! هذا قرار ذكي.');
        document.getElementById('result-green').classList.remove('hidden');
        playSound('success-sound');
        updateScore(10);
        animateResult('#result-green');
    } else if (option === 'buy') {
        updateCharacter('sad', 'هذا ليس أفضل قرار.');
        document.getElementById('result-red').classList.remove('hidden');
        playSound('failure-sound');
        updateScore(-5);
        animateResult('#result-red');
    }
}

// دالة للتحقق من نمط القرارات وتخصيص القصة
function checkDecisionPattern() {
    if (decisionHistory.slice(-3).every(decision => decision === 'buy')) {
        displayAiAdvice('يبدو أنك تميل إلى الإنفاق، حاول توفير بعض المال للمستقبل.');
    } else if (decisionHistory.slice(-3).every(decision => decision === 'save')) {
        displayAiAdvice('أحسنت، استمر في توفير المال، ويمكنك التفكير في استثمار بعضه.');
    }
}

// دالة لبدء المؤقت مع الرسوم المتحركة
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
            onTimeout();
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

// دالة لإضافة الرسوم المتحركة عند عرض النتيجة
function animateResult(elementId) {
    anime({
        targets: elementId,
        scale: [0.8, 1.2],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)'
    });
}

// دالة لتحديث الشخصية التفاعلية
function updateCharacter(mood, message) {
    const characterImage = document.getElementById('character-image');
    const characterText = document.getElementById('character-text');
    const characterElement = document.getElementById('character');

    if (mood === 'happy') {
        characterImage.src = 'character_happy.png';
        characterText.textContent = message;
    } else if (mood === 'sad') {
        characterImage.src = 'character_sad.png';
        characterText.textContent = message;
    }

    characterElement.classList.remove('hidden');
    anime({
        targets: '#character',
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
    });

    setTimeout(() => {
        anime({
            targets: '#character',
            translateY: [0, -50],
            opacity: [1, 0],
            duration: 800,
            easing: 'easeInElastic(1, .8)',
            complete: () => {
                characterElement.classList.add('hidden');
            }
        });
    }, 4000);
}

// دالة لإعادة تعيين اللعبة مع الرسوم المتحركة
function restart() {
    clearInterval(timerInterval);
    document.querySelectorAll('.scene, .result').forEach(scene => {
        scene.classList.add('hidden');
        anime({ targets: scene, opacity: 0 });
    });
    document.getElementById('scene1').classList.remove('hidden');
    anime({ targets: '#scene1', opacity: [0, 1], duration: 1000 });
    score = 0;
    decisionHistory = [];
    updateScore(0);
    changeBackgroundColor('#1e1e1e');
}

// دالة لإنهاء القصة وإنشاء تقرير
function finish() {
    generateReport();
    restart();
}

// دالة لإنشاء تقرير مخصص للمستخدم
function generateReport() {
    let positiveDecisions = decisionHistory.filter(decision => decision === 'save').length;
    let negativeDecisions = decisionHistory.filter(decision => decision === 'buy').length;

    let reportMessage = `تقرير الأداء:\n`;
    reportMessage += `عدد القرارات الجيدة (توفير المال): ${positiveDecisions}\n`;
    reportMessage += `عدد القرارات غير المثالية (الشراء): ${negativeDecisions}\n`;

    if (positiveDecisions > negativeDecisions) {
        reportMessage += `أنت على الطريق الصحيح! استمر في اتخاذ القرارات المالية الذكية.`;
    } else {
        reportMessage += `حاول تقليل الإنفاق واتخذ قرارات أفضل مستقبلاً.`;
    }

    alert(reportMessage);
}

// دالة لعرض النصيحة من الذكاء الاصطناعي
function displayAiAdvice(advice) {
    const adviceElement = document.createElement('p');
    adviceElement.textContent = `نصيحة المساعد الذكي: ${advice}`;
    adviceElement.style.color = '#FFD700';
    adviceElement.style.marginTop = '20px';
    document.body.appendChild(adviceElement);
}

// دالة لتغيير لون الخلفية
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}
