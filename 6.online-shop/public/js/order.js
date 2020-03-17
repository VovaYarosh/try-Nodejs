document.querySelector('#lite-shop-oreder').onsubmit = function(event){
    event.preventDefault();
    let userName = document.querySelector('#username').value.trim()
    let phone = document.querySelector('#phone').value.trim()
    let email = document.querySelector('#email').value.trim()
    let address = document.querySelector('#address').value.trim()

    if(!document.querySelector('#rule').checked){

    }

    if(userName == '' || phone == '' || email == '' || address == ''){

    }

    fetch('/finish-order',{
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'phone': phone,
            'email': email,
            'address': address,
            'key' : (JSON.parse(localStorage.getItem('cart')))
        }),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response){
        return response.text();
    })
    .then(function(body){
        if(body == 1){

        }else{
            
        }
    })
}