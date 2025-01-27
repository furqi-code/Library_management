let issueArray = [], booksArray = [], borrowersArray = [] ;

if(localStorage.getItem("borrowers"))
    borrowersArray = JSON.parse(localStorage.getItem("borrowers")) ;

if(localStorage.getItem("books"))
    booksArray = JSON.parse(localStorage.getItem("books")) ;

if(localStorage.getItem("issued"))
    issueArray = JSON.parse(localStorage.getItem("issued")) ;

let html = "" ;
html += `<h3>Total Books -> ${booksArray.length}</h3>
<h3>Total Borrowers -> ${borrowersArray.length}</h3>
<br>
<h3>Current Books -> ${booksArray.length - issueArray.length}</h3>
<h3>issued Books -> ${issueArray.length}</h3>`

$("#total").append(html) ;

$("#delete").on("click",function(){
    booksArray = [] ;
    borrowersArray = [] ;
    localStorage.clear() ;
})