const sequelize = require('./database');
const {
User, Post, Author, Book,
Student, Course, Enrollment,
Order, Item,
getUsersWithRecentPosts,
getAllAuthorsIncludingEmpty,
getStudentsInAdvancedCourses,
getOrdersWithBulkItems,
getActiveUsersWithPublishedPosts 
} = require('./models');

(async () => {
await sequelize.sync({ force: true });

const user1 = await User.create({ name: 'Анна', email: 'anna@mail.ru' });
const user2 = await User.create({ name: 'Борис', email: 'boris@mail.ru' });
const user3 = await User.create({ name: 'Вика', email: 'vika@mail.ru' });

await Post.create({ title: 'Старый пост Анны', publishedAt: '2022-06-01', authorId: user1.id });
await Post.create({ title: 'Новый пост Анны', publishedAt: '2023-05-01', authorId: user1.id });
await Post.create({ title: 'Новый пост Бориса', publishedAt: '2023-03-01', authorId: user2.id });

console.log('\n=== ЗАДАНИЕ 1: Пользователи с постами после 2023-01-01 ===');
const result1 = await getUsersWithRecentPosts();

result1.forEach(user => {
console.log(`\n${user.name}:`);
user.posts.forEach(post => {
console.log(` - "${post.title}" (${post.publishedAt})`);
});
});

const pushkin = await Author.create({
firstname: 'Александр',
lastname: 'Пушкин', 
country: 'Россия'
});

const lermontov = await Author.create({
firstname: 'Михаил',
lastname: 'Лермонтов',
country: 'Россия'
});

const chekhov = await Author.create({
firstname: 'Антон',
lastname: 'Чехов',
country: 'Россия'
});

await Book.create({ title: 'Евгений Онегин', year: 1833, genre: 'роман', authorId: pushkin.id });
await Book.create({ title: 'Капитанская дочка', year: 1836, genre: 'роман', authorId: pushkin.id });
await Book.create({ title: 'Герой нашего времени', year: 1840, genre: 'роман', authorId: lermontov.id });

console.log('\n=== ЗАДАНИЕ 2: Все авторы (включая без книг) ===');
const result2 = await getAllAuthorsIncludingEmpty();

result2.forEach(author => {
console.log(`\n${author.lastname} ${author.firstname} (${author.country})`);
if (author.books.length === 0) {
console.log(' Книг нет');
} else {
author.books.forEach(book => {
console.log(` - "${book.title}" (${book.year})`);
});
}
});


const ivan = await Student.create({ name: 'Иван', group: 'ИТ-101' });
const maria = await Student.create({ name: 'Мария', group: 'ИТ-102' }); 
const alexey = await Student.create({ name: 'Алексей', group: 'ИТ-103' });

const math = await Course.create({ title: 'Математика', credits: 4 }); 
const physics = await Course.create({ title: 'Физика', credits: 3 }); 
const chemistry = await Course.create({ title: 'Химия', credits: 5 }); 
const biology = await Course.create({ title: 'Биология', credits: 2 });

await maria.addCourse(chemistry, { through: { grade: 92 } }); 
await maria.addCourse(biology, { through: { grade: 60 } });
await alexey.addCourse(physics, { through: { grade: 75 } });
console.log('\n=== ЗАДАНИЕ 3: Студенты на курсах с credits > 3 ==='); 
const result3 = await getStudentsInAdvancedCourses(); 
result3.forEach(student => { 
    console.log(`\n${student.name} (группа ${student.group}):`); 
    student.courses.forEach(course => { 
        console.log(` - "${course.title}" (${course.credits} кредитов)`); 
    }); 
});

const order1 = await Order.create({ number: 'ORD-001', status: 'paid' });
const order2 = await Order.create({ number: 'ORD-002', status: 'new' });
const order3 = await Order.create({ number: 'ORD-003', status: 'shipped' });

await Item.create({ productName: 'Ноутбук', quantity: 3, price: 50000, orderId: order1.id });
await Item.create({ productName: 'Мышь', quantity: 1, price: 500, orderId: order1.id });

await Item.create({ productName: 'Клавиатура', quantity: 2, price: 3000, orderId: order2.id });
await Item.create({ productName: 'Монитор', quantity: 1, price: 15000, orderId: order2.id });

await Item.create({ productName: 'Наушники', quantity: 5, price: 2000, orderId: order3.id });
await Item.create({ productName: 'Флешка', quantity: 10, price: 800, orderId: order3.id });

console.log('\n=== ЗАДАНИЕ 4: Заказы с товарами quantity > 2 ===');
const result = await getOrdersWithBulkItems();

result.forEach(order => {
console.log(`\nЗаказ ${order.number} (статус: ${order.status}, создан: ${order.createdAt})`);
order.items.forEach(item => {
console.log(` - "${item.productName}" — ${item.quantity} шт. × ${item.price} руб.`);
});
});

const alice = await User.create({ name: 'Алиса', email: 'alice@mail.ru', isActive: true });
const bob = await User.create({ name: 'Боб', email: 'bob@mail.ru', isActive: true });
const charlie = await User.create({ name: 'Чарли', email: 'charlie@mail.ru', isActive: false }); 
const diana = await User.create({ name: 'Диана', email: 'diana@mail.ru', isActive: true });

await Post.create({ title: 'Привет мир', status: 'published', publishedAt: '2023-06-01', createdAt: '2023-06-01', authorId: alice.id });
await Post.create({ title: 'Черновик', status: 'draft', publishedAt: '2023-07-01', createdAt: '2023-07-01', authorId: alice.id });
await Post.create({ title: 'Вторая публикация', status: 'published', publishedAt: '2023-08-01', createdAt: '2023-08-01', authorId: alice.id });

await Post.create({ title: 'Мой черновик', status: 'draft', publishedAt: '2023-05-01', createdAt: '2023-05-01', authorId: bob.id });

await Post.create({ title: 'Опубликовано', status: 'published', publishedAt: '2023-04-01', createdAt: '2023-04-01', authorId: charlie.id });

console.log('\n=== ЗАДАНИЕ 5: Активные пользователи с опубликованными постами ===');
const result5 = await getActiveUsersWithPublishedPosts();
result5.forEach(user => {
console.log(`\n${user.name} (активен: ${user.isActive}):`);
user.posts.forEach(post => {
console.log(` - "${post.title}" [${post.status}]`);
});
});

await sequelize.close();
})();