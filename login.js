$("#signinBtn").on("click",function(){
    let username = $("#floatingInput").val() ;
    let password = $("#floatingPassword").val() ;

    if(!(username === "admin" && password === "password")){
        alert("Wrong! please try again") ;
    }else{
        setTimeout(function(){
            window.open("C:\\Users\\Dell\\Desktop\\Web Deveploment\\class work\\Javascript\\Library management system\\dashboard.html") ;
        },1000) ;
    }

    $("#floatingInput, #floatingPassword").val("") ;
})