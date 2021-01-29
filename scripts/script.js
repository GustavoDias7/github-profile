let searchGithubUser = document.querySelector('#search-github-user');

let hideAndShowSearch = function () {
    if (searchGithubUser.style.display !== 'block') {
        searchGithubUser.style.display = 'block';
    } else {
        searchGithubUser.style.display = 'none';
    }
}

let searchAndConfirm = document.querySelector('#confirm');
searchAndConfirm.addEventListener('click', function () {
    getUserGithub();
    hideAndShowSearch();
})

let edit = document.querySelector('#edit');
edit.addEventListener('click', hideAndShowSearch);

let closeTab = document.querySelector('#close-tab');
closeTab.addEventListener('click', hideAndShowSearch);

let changeInformations = function (myDatas) {
    document.querySelector('#profile-avatar').setAttribute('src', myDatas.avatar);
    document.querySelector('#profile-link').setAttribute('href', myDatas.linkProfile);
    document.querySelector('#profile-link').innerText = myDatas.name;
    document.querySelector('#login-name').innerText = myDatas.login;
    document.querySelector('#counter-01').innerText = myDatas.repos;
    document.querySelector('#counter-02').innerText = myDatas.followers;
    document.querySelector('#counter-03').innerText = myDatas.following;
}

let getDatas = function (data) {
    let myDatas = {
        name: data.name,
        login: data.login,
        followers: data.followers,
        repos: data.public_repos,
        avatar: data.avatar_url,
        linkProfile: data.html_url,
        following: data.following
    };
    changeInformations(myDatas);
}


let getUserGithub = function () {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
            let data = JSON.parse(xhr.responseText);
            getDatas(data);
        } else {
            alert('Houve um erro na requisição...\nTente de novo!');
        }
    }

    let loginNameInput = document.querySelector('#login-name-input');
    let endpoint = `https://api.github.com/users/${loginNameInput.value}`;
    xhr.open('GET', endpoint, true);
    xhr.send();
}