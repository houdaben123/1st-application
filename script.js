// تحميل المهام عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

// =====================
// الدالة 1: إضافة مهمة جديدة
// =====================
function addTask() {
    // الحصول على قيمة حقل الإدخال
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    // التحقق من أن المهمة ليست فارغة
    if (taskText === '') {
        alert('من فضلك اكتبي مهمة قبل الإضافة!');
        return;
    }

    // الحصول على قائمة المهام الحالية من localStorage
    let tasks = getTasks();

    // إنشاء كائن المهمة الجديدة بـ ID فريد
    const newTask = {
        id: Date.now(), // استخدام الوقت الحالي كـ ID فريد
        text: taskText
    };

    // إضافة المهمة الجديدة للقائمة
    tasks.push(newTask);

    // حفظ المهام المحدثة في localStorage
    saveTasks(tasks);

    // إضافة المهمة للواجهة (DOM)
    displayTask(newTask);

    // تنظيف حقل الإدخال
    taskInput.value = '';
    taskInput.focus();

    // تحديث رسالة عدم وجود مهام
    updateEmptyMessage();
}

// =====================
// الدالة 2: حذف مهمة
// =====================
function deleteTask(taskId) {
    // الحصول على قائمة المهام من localStorage
    let tasks = getTasks();

    // تصفية المهام وحذف المهمة المطلوبة
    tasks = tasks.filter(task => task.id !== taskId);

    // حفظ المهام المحدثة
    saveTasks(tasks);

    // حذف المهمة من الواجهة (DOM)
    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    if (taskElement) {
        taskElement.remove();
    }

    // تحديث رسالة عدم وجود مهام
    updateEmptyMessage();
}

// =====================
// الدالة 3: تحميل المهام من localStorage
// =====================
function loadTasks() {
    const tasks = getTasks();
    const tasksList = document.getElementById('tasksList');

    // تنظيف القائمة أولاً
    tasksList.innerHTML = '';

    // عرض كل مهمة
    tasks.forEach(task => {
        displayTask(task);
    });

    // تحديث رسالة عدم وجود مهام
    updateEmptyMessage();
}

// =====================
// دوال مساعدة
// =====================

// دالة مساعدة: الحصول على المهام من localStorage
function getTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    // إذا لم توجد مهام، نرجع مصفوفة فارغة
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// دالة مساعدة: حفظ المهام في localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// دالة مساعدة: عرض مهمة واحدة في الواجهة
function displayTask(task) {
    const tasksList = document.getElementById('tasksList');

    // إنشاء عنصر المهمة (li)
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    // إنشاء نص المهمة
    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'task-text';
    taskTextSpan.textContent = task.text;

    // إنشاء زر الحذف
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '🗑️ حذف';
    deleteBtn.onclick = function() {
        deleteTask(task.id);
    };

    // إضافة النص وزر الحذف للعنصر
    li.appendChild(taskTextSpan);
    li.appendChild(deleteBtn);

    // إضافة العنصر للقائمة
    tasksList.appendChild(li);
}

// دالة مساعدة: تحديث رسالة عدم وجود مهام
function updateEmptyMessage() {
    const tasks = getTasks();
    const emptyMessage = document.getElementById('emptyMessage');

    if (tasks.length === 0) {
        emptyMessage.classList.add('show');
    } else {
        emptyMessage.classList.remove('show');
    }
}

// دالة مساعدة: السماح بالضغط على Enter لإضافة مهمة
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}