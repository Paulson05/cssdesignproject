// Book class :represent a book

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI class: Handle UI tasks book
class UI {
    static displayBooks(){
        // const StoredBooks =[
        //     {
        //         title: "book one",
        //         author: "john Deo",
        //         isbn:"343422"

        //     },
        //     {
        //         title: "book two",
        //         author: "jane Deo",
        //         isbn:"44645"

        //     }
        // ];
        // const books = StoredBooks;
        const books = Store.getBooks();
        books.forEach((book)=> UI.addBooktodolist(book)) 
    }
    static addBooktodolist(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement('tr');
        row.innerHTML =` 
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class = "delete">x</a></td>
        `;
        list.appendChild(row);

        
    }
    static deletebook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showalert(message, classname){
        const div =  document.createElement("div");
        
        div.classname = `alert  alert-${classname}`;
        div.appendChild(document.createTextNode(message));
        div.classList.add("add");
        const container = document.querySelector('.container');
       const form = document.querySelector('#bookform');
        container.insertBefore(div, form);


        setTimeout(() => document.querySelector(".add").remove(), 3000);
    
    }
    static clearfields(){
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
}
//store class: Handles storage
class Store{
    static getBooks(){
       let books;
       if(localStorage.getItem("books") === null){
           books = [];

       }
       else{
           books = JSON.parse(localStorage.getItem('books'))
       }
      return books;
    }
    static adddBook(book){
                  const books = store.getBooks();
                  books.push(book);
                  localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn){
          const books = store.getBooks();
          books.forEach((book, index) =>{
              if(book.isbn === isbn){
                  books.splice(index, 1);
              }
          });
          loca.localStorage.setItem("books", JSON.stringify(books))
    }
}
// Event: Dispaly book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Add a book
document.querySelector('#bookform').addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if(title === "" || author === "" || isbn === "" ){
        UI.showalert("plese fill in all fields");
        
    }
    else{
        const book = new Book(title, author, isbn);
        UI.showalert("BooK ADD ");
        UI.addBooktodolist(book);
        UI.clearfields()
    }

    

})
// Event: Remove a book

document.querySelector('#book-list').addEventListener("click", (e)=>{
  UI.deletebook(e.target);
  UI.showalert("BOOK removed ");
});

