// متغيرات لتتبع النقاط والمؤقت
let score = 0;
let timerInterval;

// دالة لاختيار الخيار المناسب مع إضافة الرسوم المتحركة
function chooseOption(option) {
    clearInterval(timerInterval); // إيقاف المؤقت الحالي

    // إخفاء المشهد الأول مع تأثير متلاشي
    anime({
        targets: '#scene1',
        opacity: 0,
        duration: 500,
        easing: 'easeInOutQuad',
        complete: () => {
            document.getElementById('scene1').classList.add('hidden'); // إخفاء المشهد تمامًا
            showResult(option); // عرض النتيجة بناءً على الخيار
        }
    });
}

// دالة لعرض النتيجة بناءً على الخيار
function showResult(option) {
    if (option === 'save') {
        document.getElementById('result-green').classList.remove('hidden'); // إظهار شاشة النجاح
        playSound('success-sound');
        updateScore(10); // إضافة النقاط
        animateResult('#result-green');
        startTimer(10, () => {
            anime({
                targets: '#result-green',
                opacity: 0,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    document.getElementById('result-green').classList.add('hidden');
                    document.getElementById('scene2-save').classList.remove('hidden');
                    anime({ targets: '#scene2-save', opacity: [0, 1], duration: 500 });
                }
            });
        });
    } else if (option === 'buy') {
        document.getElementById('result-red').classList.remove('hidden'); // إظهار شاشة الفشل
        playSound('failure-sound');
        updateScore(-5); // خصم النقاط
        animateResult('#result-red');
        startTimer(10, () => {
            anime({
                targets: '#result-red',
                opacity: 0,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    document.getElementById('result-red').classList.add('hidden');
                    document.getElementById('scene2-save').classList.remove('hidden');
                    anime({ targets: '#scene2-save', opacity: [0, 1], duration: 500 });
                }
            });
        });
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
    updateScore(0);
    changeBackgroundColor('#1e1e1e');
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

// دالة لطلب نصيحة المساعد الذكي
async function getAiAdvice(decision) {
    const apiKey = 'YOUR_API_KEY'; // ضع مفتاح API الخاص بك هنا
    const prompt = `أعطِ نصيحة مالية لشخص قرر ${decision}.`;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-004",
                prompt: prompt,
                max_tokens: 50
            })
        });

        const data = await response.json();
        const advice = data.choices[0].text.trim();
        displayAiAdvice(advice);
    } catch (error) {
        console.error('Error fetching AI advice:', error);
        displayAiAdvice('تعذر الحصول على نصيحة المساعد الذكي، حاول مرة أخرى لاحقًا.');
    }
}

// دالة لعرض نصيحة المساعد الذكي
function displayAiAdvice(advice) {
    const adviceElement = document.getElementById('ai-advice');
    adviceElement.textContent = `نصيحة المساعد الذكي: ${advice}`;
    adviceElement.style.display = 'block';
    adviceElement.style.marginTop = '20px';
}
