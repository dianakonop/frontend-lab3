/* ==========================================================================
   ЗАВДАННЯ 1: УПРАВЛІННЯ НОВИНАМИ (МАСИВИ ТА ФУНКЦІЇ)
   ========================================================================== */

// Створюємо масив із 10 записів новин
let newsList = [
    {
        id: 1,
        title: "Відкриття виставки авангардистів",
        author: "Олена Петрів",
        shortMessageLength: 85,
        readsDay1: 1250,
        readsDay2: 940,
        publishDate: new Date(2026, 3, 10, 14, 30) // 10 квітня 2026, 14:30 (робочий час)
    },
    {
        id: 2,
        title: "Прем'єра в Національному театрі",
        author: "Іван Мельник",
        shortMessageLength: 64,
        readsDay1: 2100,
        readsDay2: 1800,
        publishDate: new Date(2026, 3, 10, 19, 0)  // неробочий час
    },
    {
        id: 3,
        title: "Фестиваль етнічної музики",
        author: "Олена Петрів",
        shortMessageLength: 72,
        readsDay1: 1500,
        readsDay2: 1300,
        publishDate: new Date(2026, 3, 11, 11, 15) // робочий час
    },
    {
        id: 4,
        title: "Нова книга про архітектуру Києва",
        author: "Diana Schmid",
        shortMessageLength: 95,
        readsDay1: 3200,
        readsDay2: 2900,
        publishDate: new Date(2026, 3, 12, 9, 45)  // неробочий час (< 10:00)
    },
    {
        id: 5,
        title: "Реставрація ікон у Софії Київській",
        author: "Олена Петрів",
        shortMessageLength: 50,
        readsDay1: 890,
        readsDay2: 760,
        publishDate: new Date(2026, 3, 12, 16, 20) // робочий час
    },
    {
        id: 6,
        title: "Засідання міської ради щодо бюджету",
        author: "Іван Мельник",
        shortMessageLength: 110,
        readsDay1: 4500,
        readsDay2: 3100,
        publishDate: new Date(2026, 3, 13, 10, 0)  // робочий час (рівно 10:00)
    },
    {
        id: 7,
        title: "Прогнози інфляції від Нацбанку",
        author: "Diana Schmid",
        shortMessageLength: 78,
        readsDay1: 1800,
        readsDay2: 1400,
        publishDate: new Date(2026, 3, 13, 17, 50) // робочий час
    },
    {
        id: 8,
        title: "Київський марафон зібрав кошти",
        author: "Іван Мельник",
        shortMessageLength: 60,
        readsDay1: 950,
        readsDay2: 820,
        publishDate: new Date(2026, 3, 14, 8, 30)  // неробочий час
    },
    {
        id: 9,
        title: "Інновації утилізації сміття в столиці",
        author: "Diana Schmid",
        shortMessageLength: 88,
        readsDay1: 1340,
        readsDay2: 1100,
        publishDate: new Date(2026, 3, 14, 12, 0)  // робочий час
    },
    {
        id: 10,
        title: "Весняні посадки парків Києва",
        author: "Олена Петрів",
        shortMessageLength: 65,
        readsDay1: 670,
        readsDay2: 540,
        publishDate: new Date(2026, 3, 15, 21, 10) // неробочий час
    }
];

// 1. Впорядкування новин за автором та знаходження середньої довжини повідомлення в символах для одного автора
function analyzeAuthorNews(arr, targetAuthor) {
    // Впорядкування (сортування) за автором (алфавітне)
    let sortedArr = [...arr].sort((a, b) => a.author.localeCompare(b.author));
    
    // Фільтрація новин конкретного автора
    let authorNews = arr.filter(item => item.author === targetAuthor);
    
    if (authorNews.length === 0) {
        return { sorted: sortedArr, averageLength: 0 };
    }

    let totalChars = authorNews.reduce((sum, item) => sum + item.shortMessageLength, 0);
    let averageLength = totalChars / authorNews.length;

    console.log(`--- Аналіз для автора: ${targetAuthor} ---`);
    console.log(`Середня довжина повідомлення: ${averageLength.toFixed(2)} символів`);

    return { sorted: sortedArr, averageLength };
}

// 2. Знаходження новини з максимальною кількістю читачів за добу_1 та вивід її внутрішнього id
function getMaxReadsDay1Id(arr) {
    if (arr.length === 0) return null;
    
    let maxNews = arr.reduce((prev, current) => 
        (current.readsDay1 > prev.readsDay1) ? current : prev
    );

    console.log(`Новина з макс. читачами за добу_1 (ID: ${maxNews.id}): "${maxNews.title}" (${maxNews.readsDay1} читачів)`);
    return maxNews.id;
}

// 3. Додавання нової новини (якщо відсутня хоч якась інфо — в кінець, якщо вся є — на початок)
function addNewNews(arr, newNewsItem) {
    // Перевіряємо наявність усіх полів
    let isComplete = (
        newNewsItem.id !== undefined &&
        newNewsItem.title &&
        newNewsItem.author &&
        newNewsItem.shortMessageLength !== undefined &&
        newNewsItem.readsDay1 !== undefined &&
        newNewsItem.readsDay2 !== undefined &&
        newNewsItem.publishDate instanceof Date
    );

    if (isComplete) {
        arr.unshift(newNewsItem); // на початок списку
        console.log("Вся інформація присутня: новину додано на ПОЧАТОК списку.");
    } else {
        arr.push(newNewsItem);    // в кінець списку
        console.log("Частина інформації відсутня: новину додано в КІНЕЦЬ списку.");
    }
}

// 4. Обчислення суми оплати праці автора за добу (робочий час 10:00-18:00 = 0.5 грн/символ, решта = 0.8 грн/символ)
function calculateAuthorPayment(newsItem) {
    let hour = newsItem.publishDate.getHours();
    // Робочий час: з 10:00 до 18:00 (включно до 18:00 або строго до 18:00 - візьмемо [10, 18))
    let isWorkingHours = (hour >= 10 && hour < 18);
    let rate = isWorkingHours ? 0.5 : 0.8;

    let payment = newsItem.shortMessageLength * rate;
    return payment;
}


/* ==========================================================================
   ЗАВДАННЯ 2: ОБЛІКОВІ ЗАПИСИ КОРИСТУВАЧІВ (ОБ'ЄКТНО-ОРІЄНТОВАНИЙ JS)
   ========================================================================== */

class UserAccount {
    constructor(surname, name, age, education, feedbackPurpose, dateStr, timeStr) {
        this.surname = surname;
        this.name = name;
        this.age = Number(age);
        this.education = education;           // напр., "Вища", "Неповна середня" тощо
        this.feedbackPurpose = feedbackPurpose; // мета зв'язку
        this.date = new Date(dateStr);        // дата звернення
        this.time = timeStr;                  // час звернення (рядок або години/хвилини)
    }

    // Метод для виведення інформації
    printInfo() {
        console.log(`${this.surname} ${this.name}, Вік: ${this.age}, Освіта: ${this.education}`);
    }
}

// Створюємо 10 облікових записів користувачів
let usersList = [
    new UserAccount("Коваленко", "Олена", 24, "Вища", "Співпраця", "2026-03-12", "14:20"),
    new UserAccount("Мельник", "Андрій", 35, "Середня", "Пропозиція", "2026-04-05", "10:10"),
    new UserAccount("Шевченко", "Марія", 19, "Неповна вища", "Скарга", "2026-04-18", "16:45"),
    new UserAccount("Бойко", "Іван", 42, "Без освіти", "Наявність помилки", "2026-02-14", "09:30"),
    new UserAccount("Ткаченко", "Анна", 28, "Вища", "Співпраця", "2026-04-22", "11:00"),
    new UserAccount("Кравченко", "Сергій", 50, "Без освіти", "Пропозиція", "2026-01-10", "12:15"),
    new UserAccount("Гончарук", "Діана", 21, "Вища", "Співпраця", "2026-04-02", "15:00"),
    new UserAccount("Павленко", "Олександр", 31, "Середня", "Скарга", "2026-05-01", "08:20"),
    new UserAccount("Лисенко", "Катерина", 26, "Вища", "Пропозиція", "2026-03-30", "18:00"),
    new UserAccount("Романюк", "Дмитро", 45, "Без освіти", "Наявність помилки", "2026-04-12", "13:40")
];

// 1. Виведення переліку користувачів, які звернулися протягом певного місяця (наприклад, квітень 2026 року -> місяць 3 (0-indexed) або місяць 4)
function getUsersForMonth(users, year, monthIndex) {
    let filtered = users.filter(user => {
        return user.date.getFullYear() === year && user.date.getMonth() === monthIndex;
    });

    console.log(`--- Користувачі, які звернулися у місяць ${monthIndex + 1}/${year} ---`);
    filtered.forEach(u => u.printInfo());
    return filtered;
}

// 2. Вивести мінімальний вік користувача і якщо він співпадає із віком деякого користувача, надати його освіту як типову
function getTypicalEducationByMinAge(users) {
    if (users.length === 0) return null;

    let minAge = Math.min(...users.map(u => u.age));
    let matchedUser = users.find(u => u.age === minAge);

    console.log(`Мінімальний вік користувача: ${minAge} років.`);
    if (matchedUser) {
        console.log(`Типова освіта (взята від користувача ${matchedUser.surname} ${matchedUser.name}): ${matchedUser.education}`);
        return matchedUser.education;
    }
    return null;
}

// 3. Поділити користувачів на три класи: «Жінки з вищою освітою», «Чоловіки без освіти» та «Інші»
function classifyUsers(users) {
    let higherEduWomen = 0;
    let noEduMen = 0;
    let others = 0;

    // Для прикладу визначимо стать за закінченням імені (або прізвища/імені умовно для лабораторної)
    // Умовно: жіночі імена зазвичай закінчуються на 'а', 'я' (Олена, Марія, Анна, Діана, Катерина)
    // Чоловічі: Андрій, Іван, Сергій, Олександр, Дмитро
    users.forEach(u => {
        let isFemale = u.name.endsWith("а" || u.name.endsWith("я") || ["Олена", "Марія", "Анна", "Діана", "Катерина"].includes(u.name));
        let isMale = !isFemale; // спрощено для демонстрації

        if (isFemale && u.education === "Вища") {
            higherEduWomen++;
        } else if (isMale && u.education === "Без освіти") {
            noEduMen++;
        } else {
            others++;
        }
    });

    console.log("--- Класифікація користувачів ---");
    console.log(`Жінки з вищою освітою: ${higherEduWomen}`);
    console.log(`Чоловіки без освіти: ${noEduMen}`);
    console.log(`Інші: ${others}`);

    return { higherEduWomen, noEduMen, others };
}

// 4. Сортування користувачів у порядку спадання віку та в алфавітному порядку (за прізвищем)
function sortUsers(users) {
    // Спадання віку
    let sortedByAgeDesc = [...users].sort((a, b) => b.age - a.age);
    // Алфавітний порядок за прізвищем
    let sortedBySurnameAsc = [...users].sort((a, b) => a.surname.localeCompare(b.surname));

    console.log("--- Сортування за спаданням віку ---");
    sortedByAgeDesc.forEach(u => console.log(`${u.surname} ${u.age} років`));

    console.log("--- Сортування в алфавітному порядку (за прізвищем) ---");
    sortedBySurnameAsc.forEach(u => console.log(`${u.surname} ${u.name}`));

    return { sortedByAgeDesc, sortedBySurnameAsc };
}


/* ==========================================================================
   ДЕМОНСТРАЦІЯ ВИКОНАННЯ ФУНКЦІЙ У КОНСОЛІ
   ========================================================================== */
console.log("=== РЕЗУЛЬТАТИ ЛАБОРАТОРНОЇ РОБОТИ №3 ===");
analyzeAuthorNews(newsList, "Олена Петрів");
getMaxReadsDay1Id(newsList);

// Приклад додавання новини (з усіма полями -> на початок)
addNewNews(newsList, {
    id: 11,
    title: "Новий технологічний хаб у Києві",
    author: "Іван Мельник",
    shortMessageLength: 70,
    readsDay1: 1500,
    readsDay2: 1200,
    publishDate: new Date(2026, 3, 15, 12, 0)
});

// Тест розрахунку оплати для першої новини
console.log(`Оплата за новину ID 1: ${calculateAuthorPayment(newsList[1])} грн`);

// Тестування задач користувачів
getUsersForMonth(usersList, 2026, 3); // Квітень 2026 (місяць 3, оскільки відлік з 0)
getTypicalEducationByMinAge(usersList);
classifyUsers(usersList);
sortUsers(usersList);