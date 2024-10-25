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
                complete
