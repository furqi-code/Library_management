let borrowersArray = [] ;
if(localStorage.getItem("borrowers"))
    borrowersArray = JSON.parse(localStorage.getItem("borrowers")) ;

class Borrowers{
    static count = localStorage.getItem("borrowersCount") ? JSON.parse(localStorage.getItem("borrowersCount")) : 0 ;

    constructor(borrower_name, contact, address, Id_card)
    {
        this.borrower_name = borrower_name ;
        this.contact = contact ;
        this.address = address ;
        this.Id_card = Id_card ;
        this.id = ++Borrowers.count ;
        localStorage.setItem("borrowersCount", Borrowers.count) ;
    }
}

// Add kro
$("#submitBtn").on("click", function(){
    let borrower_name = $("#name").val() ;
    let contact = $("#contact").val() ;
    let address = $("#address").val() ;
    let Id_card = $("#Id_card").val() ;

    let obj = new Borrowers(borrower_name, contact, address, Id_card) ;
    borrowersArray.push(obj) ;
    localStorage.setItem("borrowers", JSON.stringify(borrowersArray)) ;

    // setTimeout(function(){
    //     $("#viewsideBar").trigger("click") ;
    // },1000)

    $("#name, #contact, #address, #Id_card").val("") ;
})

// Display section
function deleteBorrower(id)
{
    let borrowersIndex = borrowersArray.findIndex(function(element){
        return element.id === id ? true : false ;
    })    
    borrowersArray.splice(borrowersIndex,1) ;
    localStorage.setItem("borrowers", JSON.stringify(borrowersArray)) ;    // update the localStorage after removal of a book
    $("#viewsideBar").trigger("click") ;  // display the updated list
}

// function editBorrower()
// {

// }

function displayborrowers()
{
    $(".details").remove() ;
    let html = '' ;
    borrowersArray.forEach(function(element){
        html += `
            <tr class="details">
                <th scope="row">${element.id}</th>
                <td>${element.borrower_name}</td>
                <td>${element.contact}</td>
                <td>${element.address}</td>
                <td>${element.Id_card}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="deleteBorrower(${element.id})">Remove</button>
                    <button type="button" class="btn btn-primary" onclick="editBorrower(${element.id})">Edit</button>
                </td>
            </tr>`
    })
    $("#list").append(html) ;
}

// To sort the borrowers
$("#byContact").on("click",function(){
    borrowersArray.sort(function(a,b){
        return a.contact - b.contact ;
    })
    localStorage.setItem("borrowers", JSON.stringify(borrowersArray));
    displayborrowers() ;
})

$("#byAddress").on("click",function(){
    borrowersArray.sort(function(a,b){
        return a.address.localeCompare(b.address) ;
    })
    localStorage.setItem("borrowers", JSON.stringify(borrowersArray));
    displayborrowers() ;
})

$("#byName").on("click",function(){
    borrowersArray.sort(function(a,b){
        return a.borrower_name.localeCompare(b.borrower_name) ;
    })
    localStorage.setItem("borrowers", JSON.stringify(borrowersArray));
    displayborrowers() ;
})

// To search the borrowers --> i'll have the count for all the matching borrowers and then
// use loop count times to create the html and append it but we have a better solution
$("#srchBtn").on("click",function(){
    let findBy = $("#search").val() ;
    let borrowersFound = borrowersArray.filter(function(element){
        return findBy === element.borrower_name || findBy === element.Id_card || findBy === element.contact ;
    })
    if(borrowersFound.length === 0)
    {
        alert("Not found! Try different borrower_name, Id_card or contact") ;
    }else{
        $(".details").remove() ;
        let html1 = '' ;
        borrowersFound.forEach(function(element){
            html1 += `
             <tr class="details">
                <th scope="row">${element.id}</th>
                <td>${element.borrower_name}</td>
                <td>${element.contact}</td>
                <td>${element.address}</td>
                <td>${element.Id_card}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="deleteBook(${element.id})">Remove</button>
                    <button type="button" class="btn btn-primary" onclick="editBorrower(${element.id})">Edit</button>
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
    displayborrowers() ;
    $("#showing").removeClass("d-none") ;
    $("#adding").addClass("d-none") ;
})