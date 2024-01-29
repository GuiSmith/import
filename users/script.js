import {setApiOptions, createTable, objListToArray, formatDate} from '../script.js';
document.querySelector('#newuser-button').addEventListener('click', () => {
    document.querySelector('form').style.display = "block";
    document.querySelector('#options').style.display = "none";
    document.querySelector('table').style.display = "none";
});
document.querySelector('#submit-button').addEventListener('click', async () => {
    let user = {
        name: document.querySelector('form input[name=name]').value,
        email: document.querySelector('form input[name=email').value,
        password: document.querySelector('form input[name=password').value
    }
    let options = setApiOptions('POST',user);
    let response = await fetch('../back/setUser.php', options);
    response = await response.json();
    let feedbackElement = document.querySelector('.feedback-element');
    feedbackElement.textContent = response.message;
    if (response.ok){
        feedbackElement.style.color = 'green';
    }else{
        feedbackElement.style.color = 'red';
    }
});
window.addEventListener('load', async () => {
    let response = await fetch('../back/getUsers.php?limit=10', {
        method: 'GET'
    });
    response = await response.json();
    let users = response.users;
    let usersList = objListToArray(users);
    for (let i=0;i<usersList.length;i++){
        usersList[i][3] = formatDate(usersList[i][3]);
    }
    usersList.unshift(['ID','Nome','E-mail','Data Cadastro']);
    let table = createTable(usersList);
    document.querySelector('table').appendChild(table);
});