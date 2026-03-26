AOS.init({ duration: 800, once: true, offset: 30 });
    
// GSAP ScrollTrigger for counter animation
gsap.registerPlugin(ScrollTrigger);

function animateCounter(element, target, isDecimal = false) {
    let start = 0;
    const duration = 2;
    const step = target / (60 * duration);
    let current = start;
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            element.innerText = isDecimal ? target.toFixed(1) : Math.floor(target);
            clearInterval(interval);
        } else {
            element.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
        }
    }, 16);
}

// Trigger counters when section comes into view
const observerOptions = { threshold: 0.3, rootMargin: "0px" };
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const readers = document.getElementById('counterReaders');
            const downloads = document.getElementById('counterDownloads');
            const rating = document.getElementById('counterRating');
            if (readers && readers.innerText === '0') animateCounter(readers, 10500);
            if (downloads && downloads.innerText === '0') animateCounter(downloads, 1850);
            if (rating && rating.innerText === '0') animateCounter(rating, 4.9, true);
            counterObserver.disconnect();
        }
    });
}, observerOptions);
const statsSection = document.getElementById('statsSection');
if (statsSection) counterObserver.observe(statsSection);

// Books Data
const books = [
    { id: 1, title: "Prepare (Second Edition)", author: "Cambridge", price: 350, oldPrice: 800, category: "Curriculum", cover: "assets/PREPARE.jpg", images: ["assets/PREPARE.jpg"], preview: "https://www.youtube.com/embed/HVV4OVL4Ms4?si=X_D_zQ5mUe-sFYI4", moreVideos: ["https://www.youtube.com/embed/i5Bui9XoFGE?si=hxYJ3uXECori-sUv", "https://www.youtube.com/embed/iF9MIe7aCKI?si=6TGSr7TSD547Ssm3"], faqs: [
        { q: "إيه هو كتاب Prepare ده؟", a: "يا باشا، ده كتاب إنجليزي من مطبعة كامبريدج المشهورة، مكون من 9 مستويات من A1 لـ C1 (يعني من المبتدئ لحد المتقدم). الكتاب ده معمول خصيصاً للتحضير لامتحانات كامبريدج (مثل KET, PET, FCE, CAE). كل مستوى بيجهزك لامتحان معين." },
        { q: "الكتاب ده مناسب لسن كام؟", a: "مناسب للطلبة من سن 10 لـ 18 سنة، لكن كمان الكبار المبتدئين ممكن يستخدموه. كل مستوى بيغطي مرحلة عمرية:\n- المستويات الأولى (A1-A2): من 10 لـ 13 سنة\n- المستويات المتوسطة (B1-B2): من 13 لـ 16 سنة\n- المستويات المتقدمة (C1): من 16 لـ 18 سنة" },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب بيتبع المعايير الأوروبية (CEFR). في مصر، الكتاب ده:\n- متوافق مع مدارس النيل المصرية (Egyptian Nile Schools) لأنها بتتبع المنهج البريطاني.\n- متوافق مع المدارس الدولية (IGCSE, American Diploma) اللي بتستخدم مناهج أجنبية.\n- متوافق جزئياً مع المدارس التجريبية للغات في المرحلة الإعدادية والثانوية (خاصة محتوى القواعد والمفردات).\n- متوافق مع معايير وزارة التربية والتعليم المصرية للمرحلة الثانوية المتقدمة (بدرجة كبيرة في المستويات B1-B2)." },
        { q: "إيه اللي مميز في Prepare عن غيره؟", a: "أولاً، الكتاب فيه قسم اسمه 'Life Skills' (مهارات حياتية) بيعلم الطالب مهارات زي التواصل والتفكير النقدي. ثانياً، كل مستوى فيه 20 درس، وكل 4 دروس فيهم مراجعة. ثالثاً، موجود منه نسخة إلكترونية (Presentation Plus) بتخلي المدرس يشرح بسهولة على الشاشة." },
        { q: "الكتاب بينفع لطلبة المدارس في مصر؟", a: "طبعاً! الكتاب مناسب جداً للمدارس الدولية والمدارس التجريبية لأن بيتبع المعايير الأوروبية (CEFR). كمان في مدارس مصرية بتبدأ تستخدمه في المرحلة الإعدادية والثانوية لأنه بيحضر الطالب لامتحانات دولية." },
        { q: "الكتاب فيه أجزاء إيه؟", a: "الكتاب فيه:\n- Student's Book (كتاب الطالب)\n- Workbook (كتاب التمارين)\n- Audio Files (صوتيات للنطق والاستماع)\n- Video (فيديوهات تعليمية)\n- Teacher's Book (كتاب المدرس)\n- Presentation Plus (عرض تقديمي تفاعلي)" }
    ] },
    { id: 2, title: "Great Writing", author: "National Geographic", price: 350, oldPrice: 800, category: "Writing", cover: "assets/GREATWRITING.jpg", images: ["assets/GREATWRITING.jpg"], preview: "https://www.youtube.com/embed/I5W5FSuIm5g?si=Z4PlyuRWo9sajKPX", faqs: [
        { q: "كتاب Great Writing ده بيعلم إيه؟", a: "ده كتاب متخصص في تعليم الكتابة الأكاديمية باللغة الإنجليزية، من إصدار ناشيونال جيوغرافيك. مكون من 6 مستويات، بيعلم الطالب ازاي يكتب من جمل بسيطة لحد مقالات وبحث علمي متكامل." },
        { q: "الكتاب مناسب لمين؟", a: "مناسب جداً لـ:\n- طلاب المدارس الثانوية (من سن 14 لـ 18 سنة)\n- طلاب الجامعات (لازم للي بيحضروا IELTS أو TOEFL)\n- اللي عايز يحسن كتابته الأكاديمية" },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع المنهج الأمريكي (American Diploma) في مادة English Writing.\n- متوافق مع منهج IGCSE في قسم الكتابة الأكاديمية.\n- متوافق مع معايير الجامعات المصرية (خاصة كليات الآداب، الألسن، الإعلام) للطلاب اللي بيدرسوا بالإنجليزية.\n- متوافق مع متطلبات اختبارات IELTS و TOEFL المطلوبة للمنح الدراسية.\n- بيستخدم كمادة إضافية في المدارس الدولية في مصر." },
        { q: "إيه اللي مميز في Great Writing عن غيره؟", a: "أولاً، الصور من ناشيونال جيوغرافيك بتخلّي المادة شيقة. ثانياً، بيدرب على أنواع الكتابة المختلفة (وصف، سرد، حجاج، تحليل). ثالثاً، كل مستوى فيه نماذج لكتابات حقيقية من طلاب. رابعاً، فيه قسم مخصص للقواعد الأساسية للكتابة." },
        { q: "هل الكتاب بينفع في المدارس المصرية؟", a: "المدارس الدولية في مصر بتستخدمه في المرحلة الثانوية. كمان مناسب جداً للطلبة اللي بيدخلوا منح دراسية أو جامعات أجنبية. في مدارس مصرية حكومية متطورة ممكن تستخدمه كلإضافة." },
        { q: "الكتاب بيغطي إيه من ناحية المحتوى؟", a: "بيغطي:\n- كتابة الجمل (Sentence Writing)\n- كتابة الفقرات (Paragraph Writing)\n- كتابة المقالات (Essay Writing)\n- البحث العلمي (Research Writing)\n- قواعد اللغة المتقدمة\n- مفردات أكاديمية" }
    ] },
    { id: 3, title: "Super Minds (2nd Edition)", author: "Cambridge", price: 350, oldPrice: 800, category: "Kids", cover: "assets/SUPERMIND.jpg", images: ["assets/SUPERMIND.jpg"], preview: "https://www.youtube.com/embed/SuLgmAU1peY?si=buI7rl324B2RpEvd", moreVideos: ["https://www.youtube.com/embed/CKck4crkhxI?si=TiQLSJ_oStDmMAlE", "https://www.youtube.com/embed/21f6VJ2Vy4A?si=gzFdIQ1pcBVw0ilF"], faqs: [
        { q: "كتاب Super Minds ده مناسب لطفل في سن إيه؟", a: "يا فندم، الكتاب ده معمول خصيصاً للأطفال من سن 4 لـ 12 سنة (من مرحلة الحضانة للصف السادس الابتدائي). بيوصل الطفل لمستوى B1 (متوسط) بعد 7 مستويات." },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع منهج كامبريدج الدولي (Cambridge Primary).\n- متوافق مع مدارس النيل المصرية (Nile Egyptian Schools) للمرحلة الابتدائية.\n- متوافق مع منهج وزارة التربية والتعليم المصرية للمرحلة الابتدائية (بدرجة كبيرة في المحتوى والمفردات).\n- بيستخدم كمصدر أساسي في مدارس اللغات الخاصة في مصر.\n- متوافق مع معايير التعليم المبكر المعتمدة من المجلس الثقافي البريطاني." },
        { q: "إيه اللي بيخلي Super Minds مختلف؟", a: "الكتاب بيركز على تنمية مهارات التفكير (Thinking Skills) والذاكرة والإبداع. فيه شخصيات كرتونية لطيفة زي Captain Zoom، كمان فيه ألعاب تفاعلية وفيديوهات وأناشيد. بيخلي الطفل يحب اللغة مش يخاف منها." },
        { q: "الكتاب بينفع في المدارس المصرية؟", a: "مناسب جداً للمدارس الدولية واللغات. المدارس المصرية الحكومية اللي عندها فصول متطورة ممكن تستخدمه من KG1 لحد الصف السادس. كتير من مراكز اللغات في مصر بتعتمد عليه." },
        { q: "الكتاب فيه أجزاء إيه؟", a: "فيه:\n- Student's Book\n- Workbook\n- Flashcards (بطاقات تعليمية)\n- Posters (ملصقات حائط)\n- Digital Package (إصدار إلكتروني)\n- Video Animations (فيديوهات كرتون)" },
        { q: "الطفل هياخد وقت قد إيه في كل مستوى؟", a: "كل مستوى بيكفي سنة دراسية كاملة (حوالي 100-120 ساعة تعليمية). يعني لو الطفل بدأ من 4 سنين، يخلص 7 مستويات في 7 سنين ويوصل لمستوى B1." }
    ] },
    { id: 4, title: "Storyfun", author: "Cambridge", price: 350, oldPrice: 800, category: "Kids", cover: "assets/STORYFUN.jpg", images: ["assets/STORYFUN.jpg"], preview: "https://www.youtube.com/embed/3d8DCzcNnkA?si=ZUUc443JZoyx2hpE", faqs: [
        { q: "كتاب Storyfun ده إيه قصته؟", a: "ده كتاب بيستخدم القصص المصورة والحكايات لتعليم الأطفال اللغة الإنجليزية. مكون من 6 مستويات، بيجهز الطفل لامتحانات كامبريدج للأطفال (YLE - Starters, Movers, Flyers)." },
        { q: "الكتاب مناسب لسن كام؟", a: "مناسب للأطفال من سن 6 لـ 12 سنة. كل مستوى بيعتمد على قصة كاملة مع أنشطة متنوعة." },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع منهج كامبريدج YLE (Cambridge Young Learners Exams).\n- متوافق مع مدارس اللغات المصرية في المرحلة الابتدائية (كنشاط إضافي).\n- متوافق مع معايير المجلس الثقافي البريطاني في مصر لتعليم الأطفال.\n- بيستخدم كمنهج تكميلي في مراكز اللغات المعتمدة.\n- متوافق مع استراتيجيات تعليم القراءة المبكرة في وزارة التربية والتعليم." },
        { q: "إيه اللي مميز في Storyfun؟", a: "أولاً، كل قصة فيها شخصيات ومغامرات بتجذب الطفل. ثانياً، الأنشطة متدرجة ومصممة زي امتحانات كامبريدج بالضبط. ثالثاً، في نسخة من الكتاب فيها Home Fun Booklet (أنشطة للبيت). رابعاً، كل قصة فيديو مصاحب ليها." },
        { q: "هل الكتاب بينفع في مصر؟", a: "أكيد! مناسب جداً للمدارس الدولية واللغات اللي بتهتم بالتحضير لامتحانات كامبريدج. كتير من مراكز اللغات في مصر (زي الـBritish Council ومراكز خاصة) بتستخدمه في كورسات الأطفال." },
        { q: "الطفل هيحتاج وقت قد إيه في كل مستوى؟", a: "كل مستوى بيكفي من 30 لـ 40 ساعة دراسية. مناسب كإضافة بجانب المنهج الأساسي، أو كورس صيفي." }
    ] },
    { id: 5, title: "Cambridge Empower", author: "Cambridge", price: 350, oldPrice: 800, category: "General English", cover: "assets/EMPOWER.jpg", images: ["assets/EMPOWER.jpg"], preview: "https://www.youtube.com/embed/DijqrjzslX4?si=O1TrWRU5f5WhAFe2", moreVideos: ["https://www.youtube.com/embed/l43bhiDg0yM?si=tV2FflKVoV4aBpHP"], faqs: [
        { q: "كتاب Empower ده معمول لمين؟", a: "ده كتاب شامل لتعليم اللغة الإنجليزية للكبار والشباب (من 14 سنة فما فوق). مكون من 6 مستويات من A1 لـ C1. الكتاب معتمد من كامبريدج وبيستخدم في الجامعات والمعاهد." },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع منهج كامبريدج للكبار (Cambridge English for Adults).\n- متوافق مع معايير الجامعات المصرية (مثل الجامعة الأمريكية، الجامعة البريطانية في مصر، الجامعات الحكومية).\n- متوافق مع متطلبات سوق العمل المصري للموظفين اللي عايزين يحسنوا الإنجليزي.\n- بيستخدم كمقرر أساسي في الكليات والمعاهد العليا (كليات التجارة، الألسن، الإعلام).\n- متوافق مع اختبارات كامبريدج الدولية (BEC, IELTS, FCE)." },
        { q: "إيه اللي بيخلي Empower مميز؟", a: "الكتاب ده معمول على منهجية 'Assessment for Learning' يعني كل درس فيه تقييم ذاتي للطالب. كمان فيه:\n- فيديوهات حقيقية مع ناس بتتكلم إنجليزي\n- قسم 'Everyday English' للمحادثات اليومية\n- Grammavision (فيديوهات لتوضيح القواعد)\n- منصة إلكترونية متكاملة" },
        { q: "هل الكتاب مناسب للطلبة المصريين؟", a: "مناسب جداً لطلاب الجامعات والمعاهد العليا في مصر. كمان المدارس الثانوية الدولية بتستخدمه في المرحلة الثانوية. مناسب لللي عايز يسافر أو يدرس برة." },
        { q: "الكتاب فيه أجزاء إيه؟", a: "فيه:\n- Student's Book\n- Workbook with Audio\n- Online Workbook (نسخة إلكترونية)\n- Teacher's Book\n- Presentation Plus\n- Assessment Package (اختبارات)" },
        { q: "الكتاب بيغطي إيه بالضبط؟", a: "بيغطي:\n- المحادثة (Speaking)\n- القراءة (Reading)\n- الكتابة (Writing)\n- الاستماع (Listening)\n- القواعد (Grammar)\n- المفردات (Vocabulary)\n- النطق (Pronunciation)" }
    ] },
    { id: 6, title: "Oxford Phonics World", author: "Oxford", price: 350, oldPrice: 800, category: "Phonics", cover: "assets/XFORDPHONICSWORLD.jpg", images: ["assets/XFORDPHONICSWORLD.jpg"], preview: "https://www.youtube.com/embed/K_7cx78jTHc?si=23dI81r2YcoAyLtV", moreVideos: ["https://www.youtube.com/embed/tzSnppLYlRk?si=01V7rDCCm2jfM0e7", "https://www.youtube.com/embed/YNxrNIy0xOg?si=gFeRNxjbC-7t-KO4"], faqs: [
        { q: "كتاب Oxford Phonics World ده بيعلم إيه؟", a: "ده كتاب متخصص في تعليم النطق السليم (Phonics) للأطفال، من إصدار جامعة أكسفورد. مكون من 5 مستويات، بيعلم الطفل أصوات الحروف وازاي يربط الحرف بالصوت عشان يقرأ أي كلمة." },
        { q: "الكتاب مناسب لطفل في سن إيه؟", a: "مناسب للأطفال من سن 3 لـ 8 سنوات. أفضل سن لبداية تعليم Phonics هو 4-5 سنوات (KG1 و KG2)." },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع منهج أكسفورد الدولي (Oxford International Curriculum).\n- متوافق مع معايير تعليم القراءة المبكرة في وزارة التربية والتعليم المصرية (منهج Connect Plus).\n- متوافق مع منهج مدارس اللغات المصرية في مرحلة KG والصف الأول الابتدائي.\n- بيستخدم كمصدر أساسي في جميع مدارس اللغات الدولية في مصر.\n- متوافق مع استراتيجيات التعليم المبكر المعتمدة من المجلس الثقافي البريطاني." },
        { q: "إيه اللي بيخلي الكتاب ده مميز؟", a: "أولاً، بيستخدم منهجية علمية معتمدة عالمياً. ثانياً، فيه أغاني (Songs) لكل حرف. ثالثاً، فيه ألعاب تفاعلية وفيديوهات. رابعاً، ممكن الطفل يتعلم لوحده بسهولة. خامساً، بيوصل الطفل لدرجة إنه يقرأ أي كلمة يشوفها." },
        { q: "الكتاب بينفع في المدارس المصرية؟", a: "طبعاً! كتاب أساسي في مدارس اللغات الدولية والمدارس المصرية المتطورة لمرحلة KG والصفوف الأولى. في مصر، كتير من المدارس بتستخدمه في منهج اللغة الإنجليزية." },
        { q: "إيه محتويات الكتاب؟", a: "كل مستوى فيه:\n- Student's Book\n- Workbook\n- Audio CD\n- Videos\n- Phonics Cards\n- Games" },
        { q: "الطفل هيخلص الكتاب في وقت قد إيه؟", a: "كل مستوى بيكفي من 3 لـ 4 شهور (حوالي 40 ساعة). يعني لو الطفل بدأ من سن 4 سنين، يخلص الـ5 مستويات في سنة ونص ويقدر يقرأ أي قصة بسيطة." }
    ] },
    { id: 7, title: "Face2face", author: "Cambridge", price: 350, oldPrice: 800, category: "General English", cover: "assets/FACE2FACE.jpg", images: ["assets/FACE2FACE.jpg"], preview: "https://www.youtube.com/embed/8OS4njlqJVI?si=IpSK91OhgU_d4FIY", moreVideos: ["https://www.youtube.com/embed/COvW3PDikyQ?si=fN-SJM4urkGJOxxP"], faqs: [
        { q: "كتاب Face2Face ده مناسب لمين؟", a: "ده كتاب لتعليم اللغة الإنجليزية للكبار، مكون من 6 مستويات. مناسب جداً للمبتدئين اللي عايزين يتعلموا المحادثة (Speaking) بشكل خاص." },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع منهج كامبريدج للمحادثة (Cambridge Communication Curriculum).\n- متوافق مع برامج التدريب المهني في الشركات والمؤسسات المصرية (زي البنوك، شركات البترول، مراكز الاتصالات).\n- متوافق مع معايير المجلس الثقافي البريطاني في كورسات المحادثة للكبار.\n- بيستخدم في المعاهد المصرية (مثل المعهد البريطاني، المعهد الأمريكي، مراكز اللغات الخاصة).\n- متوافق مع متطلبات سوق العمل المصري للموظفين اللي عايزين يتعلموا إنجليزي سريع." },
        { q: "إيه اللي مميز في Face2Face؟", a: "الكتاب ده بيركز على المحادثة الحقيقية (Real-world conversations). فيه:\n- Help with Listening (طرق فهم النطق الطبيعي)\n- Help with Pronunciation (النطق السليم)\n- Quick Review (مراجعة سريعة كل درس)\n- Interactive Software (برنامج تفاعلي)" },
        { q: "هل الكتاب بينفع للكبار في مصر؟", a: "مناسب جداً للبالغين في مراكز اللغات والمعاهد (زي المعهد البريطاني). كمان مناسب للموظفين اللي عايزين يتعلموا إنجليزي للشغل. فيه نسخة خاصة (Business Plus) للمجال التجاري." },
        { q: "الكتاب بيغطي إيه؟", a: "بيغطي:\n- محادثات حقيقية من الحياة اليومية\n- قواعد عملية مش نظرية\n- مفردات مستخدمة في الشارع\n- مواقف اجتماعية (سفر، شغل، دراسة)" }
    ] },
    { id: 8, title: "Mindset for IELTS", author: "Cambridge", price: 350, oldPrice: 800, category: "IELTS", cover: "assets/MINDSETFORIELTS.jpg", images: ["assets/MINDSETFORIELTS.jpg"], preview: "https://www.youtube.com/embed/LHC_4DCtUtI?si=7S8-Szevmzuj2cfw", faqs: [
        { q: "كتاب Mindset for IELTS ده إيه؟", a: "ده كتاب متخصص للتحضير لامتحان IELTS (الأيلتس) من كامبريدج. مكون من 4 مستويات (Foundation, 1, 2, 3) بيغطي جميع مهارات الامتحان." },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع اختبار IELTS الأكاديمي المطلوب للجامعات المصرية (الجامعة الأمريكية، الجامعة البريطانية، الجامعات الحكومية للدراسات العليا).\n- متوافق مع متطلبات الـMOE Scholarship (منح وزارة التعليم العالي المصرية).\n- متوافق مع معايير الـIELTS المطلوبة للهجرة لكندا، أستراليا، بريطانيا.\n- بيستخدم في مراكز إعداد IELTS في مصر (مثل IDP، British Council، مراكز خاصة).\n- متوافق مع المناهج الجامعية لكليات الطب، الهندسة، الصيدلة (لأنها بتطلب IELTS)." },
        { q: "الكتاب مناسب لمين؟", a: "مناسب لـ:\n- الطلاب اللي عايزين يدرسوا برة مصر (جامعات أجنبية)\n- اللي عايزين يهاجروا أو يسافروا للشغل\n- طلاب الجامعات المصرية اللي عايزين منح دراسية\n- من سن 16 سنة فما فوق" },
        { q: "إيه اللي مميز في Mindset for IELTS؟", a: "أولاً، من إعداد فريق الامتحان نفسه (Cambridge Assessment). ثانياً، فيه نصائح وإستراتيجيات مباشرة من المصححين. ثالثاً، فيه 8 اختبارات كاملة مشابهة للامتحان الحقيقي. رابعاً، فيه تمارين على كل مهارة على حدة." },
        { q: "الكتاب بينفع للطلبة المصريين؟", a: "مناسب جداً للطلبة المصريين اللي بيحضروا للجامعات الخارجية أو المنح الدراسية. كتير من مراكز إعداد IELTS في مصر بتعتمد عليه." },
        { q: "إيه محتويات الكتاب؟", a: "كل مستوى فيه:\n- Student's Book\n- Online Workbook\n- Audio Files\n- Practice Tests\n- Teacher's Book" }
    ] },
    { id: 9, title: "English File (Fifth Edition)", author: "Oxford", price: 350, oldPrice: 800, category: "General English", cover: "assets/ENGLISHFILE.jpg", images: ["assets/ENGLISHFILE.jpg"], preview: "https://www.youtube.com/embed/tKwC9f4BSSc?si=MzNTQyHUp47rovsy", faqs: [
        { q: "كتاب English File ده مناسب لمين؟", a: "ده كتاب من أكسفورد لتعليم اللغة الإنجليزية للكبار والشباب، مكون من 9 مستويات. معروف بإنه بيجمع بين القواعد والمحادثة بطريقة عملية." },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع المنهج البريطاني العام (General British English).\n- متوافق مع مدارس اللغات المصرية في المرحلة الثانوية (كمنهج إضافي).\n- بيستخدم كمصدر أساسي في معاهد اللغات في مصر (المعهد البريطاني، مراكز خاصة).\n- متوافق مع متطلبات وزارة التربية والتعليم للمرحلة الثانوية (من حيث القواعد والمفردات).\n- متوافق مع اختبارات كامبريدج العامة (PET, FCE)." },
        { q: "إيه اللي مميز في English File؟", a: "الكتاب معروف بمنهجيته الفريدة في شرح القواعد (Grammar Bank) وملف الصوتيات (Sound Bank). فيه تطبيق موبايل تفاعلي، وفيديوهات حقيقية." }
    ] },
    { id: 10, title: "English Vocabulary in Use", author: "Cambridge", price: 350, oldPrice: 800, category: "Vocabulary", cover: "assets/VOCABULARYINUSE.jpg", images: ["assets/VOCABULARYINUSE.jpg"], preview: "https://www.youtube.com/embed/ExDJwM774uc?si=NoEDVJSs6YRcrX9I", faqs: [
        { q: "كتاب English Vocabulary in Use ده بيعلم إيه؟", a: "ده كتاب متخصص في تعليم المفردات الإنجليزية (Vocabulary) من كامبريدج. مكون من 4 مستويات (Elementary, Pre-intermediate, Intermediate, Advanced)." },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع جميع المناهج المصرية (حكومي، لغات، دولي) كمصدر للمفردات.\n- متوافق مع متطلبات امتحانات الثانوية العامة المصرية (من حيث المفردات المطلوبة).\n- بيستخدم في الجامعات المصرية (كليات التربية، الألسن، الآداب).\n- متوافق مع اختبارات TOEFL و IELTS في قسم المفردات." }
    ] },
    { id: 11, title: "Disney Kids Readers", author: "Disney", price: 200, oldPrice: 500, category: "Kids", cover: "assets/DISNEYENGLISH.jpg", images: ["assets/DISNEYENGLISH.jpg"], preview: "https://www.youtube.com/embed/ZzVxs6aPXR4?si=29FpgL4VytNABB8Y", moreVideos: ["https://www.youtube.com/embed/EADIGfYqiQM?si=7oKVdSiGpPiADHs_"], faqs: [
        { q: "كتاب Disney Kids Readers ده مناسب لطفل في سن إيه؟", a: "ده كتاب من بيرسون بيستخدم شخصيات ديزني (ميكي، ميني، إلسا، وغيرهم) لتعليم الأطفال اللغة الإنجليزية. مناسب من سن 4 لـ 12 سنة." },
        { q: "الكتاب ده بيتبع منهج إيه؟ وإيه المناهج المصرية اللي بيتوافق معاها؟", a: "الكتاب:\n- متوافق مع منهج بيرسون الدولي (Pearson English Readers).\n- متوافق مع مدارس اللغات المصرية في مرحلة KG والابتدائية (كنشاط قراءة).\n- متوافق مع استراتيجيات تعليم القراءة في وزارة التربية والتعليم.\n- بيستخدم في مراكز اللغات لتعليم الأطفال بطريقة ممتعة." }
    ] },
    { id: 12, title: "Speak Out", author: "Pearson", price: 350, oldPrice: 800, category: "General English", cover: "assets/SPEAKOUT.jpg", images: ["assets/SPEAKOUT.jpg"], preview: "https://www.youtube.com/embed/Se0Q2scjAu8?si=QgILYIiEa_TSS7lr", faqs: [
        { q: "كتاب Speak Out ده بيعلم إيه؟", a: "ده كتاب متخصص في تعليم اللغة الإنجليزية للكبار من Pearson بالتعاون مع BBC. بيركز بشكل أساسي على المحادثة والاستماع." },
        { q: "الكتاب مناسب لمين؟", a: "مناسب جداً للبالغين والشباب اللي عايزين يتكلموا إنجليزي بثقة في مواقف الحياة اليومية أو في بيئة العمل." }
    ] }
];

let currentBook = null;
const catalogDiv = document.getElementById('catalogContainer');
const mainViewDiv = document.getElementById('mainAppView');
const detailViewDiv = document.getElementById('detailView');
const searchInput = document.getElementById('globalSearch');

function renderCatalog(filter = "") {
    const filtered = books.filter(b => b.title.toLowerCase().includes(filter.toLowerCase()) || b.author.toLowerCase().includes(filter.toLowerCase()));
    
    let html = filtered.map(book => `
        <div class="book-card" data-id="${book.id}" data-aos="fade-up">
            <div class="card-img" style="position:relative;">
                <div class="price-tag">
                    <span class="old-price">${book.oldPrice}</span>
                    <span class="new-price">${book.price}</span>
                </div>
                <img src="${book.cover}" alt="${book.title}" loading="lazy">
            </div>
            <div class="card-body">
                <div style="background: rgba(244, 63, 94, 0.1); color: var(--accent-pink); border: 1px dashed var(--accent-pink); padding: 5px; border-radius: 5px; font-size: 0.85rem; text-align: center; margin-bottom: 10px; font-weight: bold;">
                    🔥 عرض: سلسلتين بـ 550 / 3 سلاسل بـ 700
                </div>
                <h3 style="font-size:1.3rem; margin-bottom: 5px;">${book.title}</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">${book.author} • ${book.category}</p>
                <div class="btn-group">
                    ${book.preview ? `<button class="btn-sm preview-btn" data-preview-id="${book.id}"><i class="fa-regular fa-eye"></i> معاينة</button>` : ''}
                    <button class="btn-sm buy-btn" data-buy-id="${book.id}"><i class="fa-solid fa-cart-shopping"></i> شراء</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add Request Card if no strict searching or at the end
    html += `
        <div class="book-card request-card" data-aos="zoom-in">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <h3>لم تجد كتابك؟</h3>
            <p>اكتب اسم الكتاب الذي تبحث عنه وسنوفره لك فوراً!</p>
            <input type="text" id="requestBookInput" class="request-input" placeholder="اسم الكتاب (بالعربي)...">
            <button class="btn-large buy-btn" id="sendRequestBtn" style="width:100%; justify-content:center;">اطلب الآن <i class="fa-brands fa-whatsapp"></i></button>
        </div>
    `;

    catalogDiv.innerHTML = html;

    document.querySelectorAll('.book-card').forEach(card => {
        const id = parseInt(card.dataset.id);
        if(!id) return;
        card.addEventListener('click', (e) => { 
            if(e.target.closest('.preview-btn') || e.target.closest('.buy-btn')) return; 
            openDetailView(id); 
        });
    });

    document.querySelectorAll('[data-preview-id]').forEach(btn => btn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        openPreviewModal(parseInt(btn.dataset.previewId)); 
    }));

    document.querySelectorAll('[data-buy-id]').forEach(btn => btn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        openBuyWhatsapp(parseInt(btn.dataset.buyId)); 
    }));

    const sendRequestBtn = document.getElementById('sendRequestBtn');
    if(sendRequestBtn) {
        sendRequestBtn.onclick = () => {
            const val = document.getElementById('requestBookInput').value;
            if(!val) return alert('يرجى كتابة اسم الكتاب أولاً');
            const msg = `أرغب في الاستفسار عن توفر كتاب: "${val}"`;
            window.open(`https://wa.me/+201550537533?text=${encodeURIComponent(msg)}`, '_blank');
        };
    }
}

function openDetailView(id) {
    const book = books.find(b => b.id === id);
    if(!book) return;
    currentBook = book;
    document.getElementById('detailMainImg').src = book.cover;
    document.getElementById('detailTitle').innerText = book.title;
    document.getElementById('detailAuthor').innerHTML = `<i class="fa-regular fa-user"></i> ${book.author} • ${book.category}`;
    document.getElementById('detailPrice').innerHTML = `<span style="font-size: 0.8em; text-decoration: line-through; opacity: 0.6; margin-left: 10px;">${book.oldPrice} ج.م</span> ${book.price} ج.م`;
    
    // Render FAQs Accordion
    const descContainer = document.getElementById('detailDesc');
    descContainer.innerHTML = '';
    if(book.faqs && book.faqs.length > 0) {
        let faqsHtml = `<div class="faq-container"><h3 style="margin-bottom:1rem; color:var(--accent-cyan); display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-circle-question"></i> الأسئلة الشائعة حول الكتاب</h3>`;
        book.faqs.forEach((faq) => {
            faqsHtml += `
            <div class="faq-item">
                <div class="faq-question"><span>${faq.q}</span> <i class="fa-solid fa-chevron-down"></i></div>
                <div class="faq-answer"><p>${faq.a.replace(/\n/g, '<br>')}</p></div>
            </div>`;
        });
        faqsHtml += `</div>`;
        descContainer.innerHTML = faqsHtml;

        // Attach FAQ events
        descContainer.querySelectorAll('.faq-question').forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                item.classList.toggle('active');
            });
        });
    }

    const thumbStrip = document.getElementById('thumbnailStrip');

    // Thumbnails removed.

    const actionDiv = document.getElementById('detailActions');
    actionDiv.innerHTML = `
        ${book.preview ? `<button class="btn-large preview-btn" id="detailPreviewBtn"><i class="fa-regular fa-circle-play"></i> مشاهدة المعاينة</button>` : ''}
        <button class="btn-large buy-btn" id="detailBuyBtn"><i class="fa-solid fa-bolt"></i> شراء الآن</button>
    `;
    if(book.preview) document.getElementById('detailPreviewBtn').onclick = () => openPreviewModal(book.id);
    document.getElementById('detailBuyBtn').onclick = () => openBuyWhatsapp(book.id);

    // More videos removed.

    mainViewDiv.classList.add('hidden');
    detailViewDiv.classList.remove('hidden');
    window.scrollTo(0,0);
}

function openVideoLink(url) {
    const container = document.getElementById('previewVideoContainer');
    document.getElementById('modalPreviewTitle').innerText = `🎬 فيديو إضافي`;
    container.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`;
    document.getElementById('previewModal').classList.add('active');
}

function openPreviewModal(id) {
    const b = books.find(bk => bk.id === id);
    if(!b || !b.preview) return;
    const container = document.getElementById('previewVideoContainer');
    document.getElementById('modalPreviewTitle').innerText = `🎬 معاينة: ${b.title}`;
    container.innerHTML = `<iframe src="${b.preview}" frameborder="0" allowfullscreen></iframe>`;
    document.getElementById('previewModal').classList.add('active');
}

function openBuyWhatsapp(id) {
    const book = books.find(b => b.id === id);
    const msg = `أرغب في شراء كتاب "${book.title}" بسعر ${book.price} ج.م بدلاً من ${book.oldPrice} ج.م من متجر E-books.`;
    window.open(`https://wa.me/+201550537533?text=${encodeURIComponent(msg)}`, '_blank');
}

function backToCatalog() { detailViewDiv.classList.add('hidden'); mainViewDiv.classList.remove('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
document.getElementById('backFromDetail').addEventListener('click', backToCatalog);
document.getElementById('homeLogo').addEventListener('click', (e) => { e.preventDefault(); backToCatalog(); });
document.getElementById('navHome').addEventListener('click', (e) => { e.preventDefault(); backToCatalog(); });
document.getElementById('navAbout').addEventListener('click', (e) => { e.preventDefault(); backToCatalog(); setTimeout(()=> document.getElementById('aboutSection').scrollIntoView({behavior:'smooth'}),100); });
document.getElementById('navContact').addEventListener('click', (e) => { e.preventDefault(); backToCatalog(); setTimeout(()=> document.getElementById('contactSection').scrollIntoView({behavior:'smooth'}),100); });
searchInput.addEventListener('input', (e) => renderCatalog(e.target.value));

const themeBtn = document.getElementById('globalThemeToggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const icon = themeBtn.querySelector('i');
    icon.className = document.body.classList.contains('light') ? "fa-solid fa-sun" : "fa-solid fa-moon";
});
document.getElementById('closePreviewModal').addEventListener('click', () => { document.getElementById('previewModal').classList.remove('active'); document.getElementById('previewVideoContainer').innerHTML = ''; });
document.getElementById('previewModal').addEventListener('click', (e) => { if(e.target === document.getElementById('previewModal')) { document.getElementById('previewModal').classList.remove('active'); document.getElementById('previewVideoContainer').innerHTML = ''; } });
// fakeContactForm removed

renderCatalog("");

// GSAP Entrance animation for hero
gsap.from(".hero h1", { duration: 1.2, y: 60, opacity: 0, ease: "power4.out" });
gsap.from(".hero p", { duration: 1, y: 40, opacity: 0, delay: 0.3, ease: "power3.out" });
gsap.from(".search-wrapper", { duration: 1, scale: 0.9, opacity: 0, delay: 0.5, ease: "back.out(1.7)" });

// Particles JS setup
if(typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
            "color": {"value": ["#2dd4bf", "#a855f7", "#f43f5e"]},
            "shape": {"type": "circle"},
            "opacity": {"value": 0.5, "random": true, "anim": {"enable": true, "speed": 1, "opacity_min": 0.1, "sync": false}},
            "size": {"value": 4, "random": true},
            "line_linked": {"enable": true, "distance": 150, "color": "#a855f7", "opacity": 0.3, "width": 1},
            "move": {"enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false}
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {"enable": true, "mode": "grab"},
                "onclick": {"enable": true, "mode": "push"},
                "resize": true
            },
            "modes": {
                "grab": {"distance": 140, "line_linked": {"opacity": 0.5}},
                "push": {"particles_nb": 3}
            }
        },
        "retina_detect": true
    });
}
