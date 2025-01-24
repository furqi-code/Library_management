let issueArray = [], returned_bookArray = [], booksArray = [], borrowersArray = [] ;

if(localStorage.getItem("books"))
    booksArray = JSON.parse(localStorage.getItem("books")) ;

if(localStorage.getItem("borrowers"))
    borrowersArray = JSON.parse(localStorage.getItem("borrowers")) ;

if(localStorage.getItem("issued"))
    issueArray = JSON.parse(localStorage.getItem("issued")) ;

if(localStorage.getItem("returnedBooks"))
    returned_bookArray = JSON.parse(localStorage.getItem("returnedBooks")) ;

class Lending{
    static count = localStorage.getItem("issueCount") ? JSON.parse(localStorage.getItem("issueCount")) : 0 ;
    
    constructor(book_title, borrower, issue_date, return_date)
    {
        this.book_title = book_title ;
        this.borrower = borrower ;
        this.issue_date = issue_date ;
        this.return_date = return_date ;
        this.id = ++Lending.count ;
        localStorage.setItem("issueCount", Lending.count) ;
    }
}

// Issue section

//book_title dropdown(select tag)
let html = '' ;
booksArray.forEach(function(element){
    html += `<option value="${element.title}">${element.title}</option>`
})
$("#title").append(html) ;

// borrower dropdown(select tag)
let html1 = '' ;
borrowersArray.forEach(function(element){
    html1 += `<option value="${element.borrower_name}">${element.borrower_name}</option>`
})
$("#borrower").append(html1) ;

$("#applyBtn").on("click", function(){
    if(issueArray.length < booksArray.length)
    {
        let book_title = $("#title").val() ;
        let borrower = $("#borrower").val() ;
        let issue_date = $("#issue_date").val() ;
        let return_date = $("#return_date").val() ;

        let obj = new Lending(book_title, borrower, issue_date, return_date) ;
        issueArray.push(obj) ;
        localStorage.setItem("issued", JSON.stringify(issueArray)) ;

        // setTimeout(function(){
        //     $("#viewsideBar").trigger("click") ;
        // },1000)

        $("#title, #borrower, #issue_date, #return_date").val("") ;
    }else{
        alert("Not available! all issued") ;
    }
})

// Display section
function deleteissued_books(id)
{
    // storing returned book objs
    const returnedBook = issueArray.find(function(element){
        return id === element.id ;
    })
    returned_bookArray.push(returnedBook) ;
    localStorage.setItem("returnedBooks", JSON.stringify(returned_bookArray)) ;

    // deleting a returned book from issueArray
    let return_bookIndex = issueArray.findIndex(function(element){
        return element.id === id ? true : false ;
    })    
    issueArray.splice(return_bookIndex,1) ;
    localStorage.setItem("issued", JSON.stringify(issueArray)) ;   
    $("#viewsideBar").trigger("click") ;  // display the updated list 
}

function displayissued_books()
{
    $(".details").remove() ;
    let html = '' ;
    issueArray.forEach(function(element){
        html += `
            <tr class="details">
                <th scope="row">${element.id}</th>
                <td>${element.book_title}</td>
                <td>${element.borrower}</td>
                <td>${element.issue_date}</td>
                <td>${element.return_date}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="deleteissued_books(${element.id})">Return</button>
                </td>
            </tr>`
    })
    $("#list").append(html) ;

    // display the returned books after
    if(returned_bookArray.length > 0)
    {
        let html = '' ;
        returned_bookArray.forEach(function(element){
            html += `
            <tr class="details">
                <th scope="row">${element.id}</th>
                <td>${element.book_title}</td>
                <td>${element.borrower}</td>
                <td>${element.issue_date}</td>
                <td>${element.return_date}</td>
                <td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                        <label class="form-check-label" for="flexCheckChecked">
                            Returned
                        </label>
                    </div>
                </td>
            </tr>`
        })
        $("#list").append(html) ;
    }
}

// To sort the issued books
$("#byIssuedate").on("click",function(){
    issueArray.sort(function(a,b){
        return new Date(a.issue_date) - new Date(b.issue_date) ;
    })
    localStorage.setItem("issued", JSON.stringify(issueArray));
    displayissued_books() ;
})

$("#byReturndate").on("click",function(){
    issueArray.sort(function(a,b){
        return new Date(a.return_date) - new Date(b.return_date) ;
    })
    localStorage.setItem("issued", JSON.stringify(issueArray));
    displayissued_books() ;
})

$("#byName").on("click",function(){
    issueArray.sort(function(a,b){
        return a.borrower.localeCompare(b.borrower) ;
    })
    localStorage.setItem("issued", JSON.stringify(issueArray));
    displayissued_books() ;
})

$("#byTitle").on("click",function(){
    issueArray.sort(function(a,b){
        return a.book_title.localeCompare(b.book_title) ;
    })
    localStorage.setItem("issued", JSON.stringify(issueArray));
    displayissued_books() ;
})

// To search the issued --> i'll have the count for all the matching issued and then
// use loop count times to create the html and append it but we have a better solution
$("#srchBtn").on("click",function(){
    let findBy = $("#search").val() ;
    let issuedbook_found = issueArray.filter(function(element){
        return findBy === element.book_title || findBy === element.borrower ||
        findBy === element.issue_date || findBy === element.return_date ;
    })
    if(issuedbook_found.length === 0)
    {
        alert("Not found! Try different book_title, borrower or date") ;
    }else{
        $(".details").remove() ;
        let html1 = '' ;
        issuedbook_found.forEach(function(element){
            html1 += `
            <tr class="details">
                <th scope="row">${element.id}</th>
                <td>${element.book_title}</td>
                <td>${element.borrower}</td>
                <td>${element.issue_date}</td>
                <td>${element.return_date}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="deleteissued_books(${element.id})">Return</button>
                </td>
            </tr>`
        })   
        $("#list").append(html1) ;
    }
})

$("#deleteIssued").on("click", function(){
    issueArray = [] ;
    returned_bookArray = [] ;
    localStorage.removeItem("issued") ;
    localStorage.removeItem("returnedBooks") ;
})

$("#showing, #adding").addClass("d-none") ;
// to show the only div which is clicked
$("#addsidebar").on("click", function(){
    $("#adding").removeClass("d-none") ;
    $("#showing").addClass("d-none") ;
})
$("#viewsideBar").on("click", function(){
    displayissued_books() ;
    $("#showing").removeClass("d-none") ;
    $("#adding").addClass("d-none") ;
})