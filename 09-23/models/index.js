const { Op } = require('sequelize');
const User = require('./User');
const Post = require('./Post');
const Author = require('./Author');
const Book = require('./Book');
const Student = require('./Student');
const Course = require('./Course');
const Enrollment = require('./Enrollment');
const Order = require('./Order');
const Item = require('./Item');

User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

Student.belongsToMany(Course, { through: Enrollment, as: 'courses' });
Course.belongsToMany(Student, { through: Enrollment, as: 'students' });

Order.hasMany(Item, { foreignKey: 'orderId', as: 'items' });
Item.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

async function getUsersWithRecentPosts() {
return User.findAll({
include: [{
model: Post,
as: 'posts',
where: { publishedAt: { [Op.gt]: '2023-01-01' } },
required: true,
}],
order: [
['name', 'ASC'],
[{ model: Post, as: 'posts' }, 'publishedAt', 'DESC'],
],
});
}

async function getAllAuthorsIncludingEmpty() {
return Author.findAll({
include: [{
model: Book,
as: 'books',
required: false,
}],
order: [['lastname', 'ASC']],
});
}

async function getStudentsInAdvancedCourses() {
return Student.findAll({
include: [{
model: Course,
as: 'courses',
where: { credits: { [Op.gt]: 3 } },
required: true,
through: { attributes: [] },
}],
order: [
['name', 'ASC'],
[{ model: Course, as: 'courses' }, 'title', 'ASC'],
],
});
}

async function getOrdersWithBulkItems() {
return Order.findAll({
include: [{
model: Item,
as: 'items',
where: { quantity: { [Op.gt]: 2 } },
required: true,
}],
order: [
['createdAt', 'DESC'],
[{ model: Item, as: 'items' }, 'price', 'DESC'],
],
});
}

async function getActiveUsersWithPublishedPosts() {
return User.findAll({
where: { isActive: true },
include: [{
model: Post,
as: 'posts',
where: { status: 'published' }, 
required: true,
}],
order: [
['name', 'ASC'],
[{ model: Post, as: 'posts' }, 'createdAt', 'DESC'],
],
});
}

module.exports = {
User, Post, Author, Book,
Student, Course, Enrollment,
Order, Item,
getUsersWithRecentPosts,
getAllAuthorsIncludingEmpty,
getStudentsInAdvancedCourses,
getOrdersWithBulkItems,
getActiveUsersWithPublishedPosts
};