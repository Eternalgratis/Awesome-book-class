/* eslint max-classes-per-file: ["error", 3] */

// Book Class: Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Store Class: handles local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// awesome Class: Handle UI Tasks
class awesomeBooks {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => awesomeBooks.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById('book-list');
    const listBook = document.createElement('div');
    listBook.classList.add('list-book');
    listBook.innerHTML = `
              <p>"${book.title}"</p>
              <p>by</p>
              <p>${book.author}</p>
              <button class="delete">Remove</button>
          `;

    list.appendChild(listBook);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  static clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', awesomeBooks.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Instatiate book
  const book = new Book(title, author);

  // Add Book to UI
  awesomeBooks.addBookToList(book);

  // Store.addBook(book);
  Store.addBook(book);

  // clear fields
  awesomeBooks.clearField();
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  awesomeBooks.deleteBook(e.target);

  Store.removeBook(e.target.previousElementSibling.textContent);
});

// Nav link

const date = document.querySelector('.date');
date.innerHTML = new Date();

const bookList = document.querySelector('.bookList');
const bookAdd = document.querySelector('.bookAdd');
const contactInfo = document.querySelector('.contact-info');

const navLink = document.querySelectorAll('.nav');
navLink.forEach((n, index) => n.addEventListener('click', () => {
  navLink.forEach((link, number) => {
    if (index === number) {
      link.classList.add('bgcolor');
    } else {
      link.classList.remove('bgcolor');
    }
  });
  if (index === 0) {
    bookList.classList.remove('hide');
    bookAdd.classList.add('hide');
    contactInfo.classList.add('hide');
  } else if (index === 1) {
    bookList.classList.add('hide');
    bookAdd.classList.remove('hide');
    contactInfo.classList.add('hide');
  } else {
    bookList.classList.add('hide');
    bookAdd.classList.add('hide');
    contactInfo.classList.remove('hide');
  }
}));
