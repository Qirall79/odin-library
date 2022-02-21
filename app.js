let myLibrary = [];

displayBooks(myLibrary);


// Display form when "Add Book" btn is clicked
const addButton = document.querySelector(".add");
addButton.addEventListener("click", (e) => {
    document.querySelector("#books").style.display = "none";
    e.target.style.display = "none";
    document.querySelector("form").style.display = "flex";

    document.querySelectorAll("input").forEach(input => input.value = "");
})


// Taking input from user
let form = document.querySelector("form");

form.addEventListener("submit", e => {
    e.preventDefault();

    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").value;

    addBookToLibrary(title, author, pages, read);
})



// Book object constructor
class Book {
    constructor(title, author, pagesNumber, isRead){
        this.title = title;
        this.author = author;
        this.pagesNumber = pagesNumber;
        this.isRead = isRead;
    }  
}


// Adds new book to library
function addBookToLibrary(title, author, pagesNumber, isRead) {
    isRead = isRead == "read" ? true : false;

    let book = new Book(title, author, pagesNumber, isRead);

    myLibrary.push(book);
    
    displayBooks(myLibrary);
}


// Display all books on the page
function displayBooks(books){

    // Check if the Books' display property is none
    if(document.querySelector("#books").style.display == "none"){
        document.querySelector("#books").style.display = "flex";
        addButton.style.display = "inline-block";
        document.querySelector("form").style.display = "none";
    }
    
    document.querySelector("#books").innerHTML = "";

    // Give each book an id attribute based on the count
    let count = 0;

    for(let book of books){
        
        let div = document.createElement("div");
        let buttonsDiv = document.createElement("div");
        let h2 = document.createElement("h2");
        let p = document.createElement("p");
        let span = document.createElement("span");
        let h5 = document.createElement("h5");
        let btnStatus = document.createElement("button");
        let btnDelete = document.createElement("button");

        btnStatus.innerHTML = "Change Status";
        btnDelete.innerHTML = "Delete";

        btnStatus.classList.add("btnStatus");
        btnDelete.classList.add("btnDelete");

        buttonsDiv.appendChild(btnStatus);
        buttonsDiv.appendChild(btnDelete);

        div.classList.add("card");

        h2.innerHTML = book.title;
        p.innerHTML = book.author;
        span.innerHTML = book.pagesNumber;
        h5.innerHTML = book.isRead ? "Read" : "Unread";

        if(h5.innerHTML == "Read"){
            h5.style.color = "green";
        }
        else{
            h5.style.color = "red";
        }
        

        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(span);
        div.appendChild(h5);
        div.appendChild(buttonsDiv);
        div.setAttribute("data-id", count);

        document.querySelector("#books").appendChild(div);
        count++;

    }


    // Change status
    const btnStatus = document.querySelectorAll(".btnStatus");

    btnStatus.forEach(btn => {
        btn.addEventListener("click", e => {
            let cardID = e.target.parentElement.parentElement.dataset.id;
            myLibrary[cardID].isRead = myLibrary[cardID].isRead ? false : true;
            
            if(myLibrary[cardID].isRead){
                document.querySelector(`.card[data-id = "${cardID}"] h5`).innerHTML = "Read";
                document.querySelector(`.card[data-id = "${cardID}"] h5`).style.color = "green";
            }
            else{
                document.querySelector(`.card[data-id = "${cardID}"] h5`).innerHTML = "Unread";
                document.querySelector(`.card[data-id = "${cardID}"] h5`).style.color = "red";
            }
        })
    })



    // Delete book
    const btnDelete = document.querySelectorAll(".btnDelete");

    btnDelete.forEach(btn => {
        btn.addEventListener("click", e => {
            let cardID = parseInt(e.target.parentElement.parentElement.dataset.id);
            
            myLibrary.splice(cardID, 1);

            document.querySelector(`.card[data-id = "${cardID}"]`).style.display = "none";

            
        })
    })
}


