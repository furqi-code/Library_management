let booksArray = [] ;
if(localStorage.getItem("books"))
    booksArray = JSON.parse(localStorage.getItem("books")) ;

class Books{
    static count = localStorage.getItem("booksCount") ? JSON.parse(localStorage.getItem("booksCount")) : 0 ;

    constructor(title, bookID, author, genre, qnty)
    {
        this.title = title ;
        this.bookID = bookID ;
        this.genre = genre ;
        this.author = author ;
        this.quantity = qnty ;
        this.id = ++Books.count ;
        localStorage.setItem("booksCount", Books.count) ;
    }
}

// Add kro
$("#submitBtn").on("click", function(){
    let title = $("#bookTitle").val() ;
    let bookId = $("#bookID").val() ;
    let author = $("#author").val() ;
    let genre = $("#Genre").val() ;
    let qnty = $("#qnty").val() ;

    let obj = new Books(title, bookId, author, genre, qnty) ;
    booksArray.push(obj) ;
    localStorage.setItem("books", JSON.stringify(booksArray)) ;

    // setTimeout(function(){
    //     $("#viewsideBar").trigger("click") ;
    // },1000)

    $("#bookTitle, #bookID, #author, #Genre, #qnty").val("") ;
})

// Display section
function deleteBook(id)
{
    let bookIndex = booksArray.findIndex(function(element){
        return element.id === id ? true : false ;
    })    
    booksArray.splice(bookIndex,1) ;
    localStorage.setItem("books", JSON.stringify(booksArray)) ;    // update the localStorage after removal of a book
    $("#viewsideBar").trigger("click") ;  // display the updated list
}

// function editBook()
// {

// }

function displayBooks()
{
    $(".details").remove() ;
    let html = '' ;
    booksArray.forEach(function(element){
        html += `
            <tr class="details">
                <th scope="row">${element.id}</th>
                <td>${element.title}</td>
                <td>${element.author}</td>
                <td>${element.genre}</td>
                <td>${element.bookID}</td>
                <td>${element.quantity}</td>
                <td>pending</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="deleteBook(${element.id})">Remove</button>
                    <button type="button" class="btn btn-primary" onclick="editBook(${element.id})">Edit</button>
                </td>
            </tr>`
    })
    $("#list").append(html) ;
}

// To sort the Books
$("#bybookID").on("click",function(){
    booksArray.sort(function(a,b){
        return a.bookID.localeCompare(b.bookID) ;
    })
    localStorage.setItem("books", JSON.stringify(booksArray));
    displayBooks() ;
})

$("#byGenre").on("click",function(){
    booksArray.sort(function(a,b){
        return a.genre.localeCompare(b.genre) ;
    })
    localStorage.setItem("books", JSON.stringify(booksArray));
    displayBooks() ;
})

$("#byTitle").on("click",function(){
    booksArray.sort(function(a,b){
        return a.title.localeCompare(b.title) ;
    })
    localStorage.setItem("books", JSON.stringify(booksArray));
    displayBooks() ;
})

// To search the Books --> i'll have the count for all the matching books and then
// use loop count times to create the html and append it but we have a better solution
$("#srchBtn").on("click",function(){
    let findBy = $("#search").val() ;
    let booksFound = booksArray.filter(function(element){
        return findBy === element.title || findBy === element.genre || findBy === element.bookID ;
    })
    if(booksFound.length === 0)
    {
        alert("Not found! Try different Title, Genre or bookID") ;
    }else{
        $(".details").remove() ;
        let html1 = '' ;
        booksFound.forEach(function(element){
            html1 += `
             <tr class="details">
                <th scope="row">${element.id}</th>
                <td>${element.title}</td>
                <td>${element.author}</td>
                <td>${element.genre}</td>
                <td>${element.bookID}</td>
                <td>${element.quantity}</td>
                <td>pending</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="deleteBook(${element.id})">Remove</button>
                    <button type="button" class="btn btn-primary" onclick="editBook(${element.id})">Edit</button>
                </td>
            </tr>`
        })   
        $("#list").append(html1) ;
    }
})

$("#showing, #adding").addClass("d-none") ;
// to show the only div which is clicked
$("#addsidebar").on("click", function(){
    $("#adding").removeClass("d-none") ;
    $("#showing").addClass("d-none") ;
})
$("#viewsideBar").on("click", function(){
    displayBooks() ;
    $("#showing").removeClass("d-none") ;
    $("#adding").addClass("d-none") ;
})