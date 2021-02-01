function getUserGithub() {
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

function getDatas(data) {
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

function changeInformations(myDatas) {
    document.querySelector('#profile-avatar').setAttribute('src', myDatas.avatar);
    document.querySelector('#profile-link').setAttribute('href', myDatas.linkProfile);
    document.querySelector('#profile-link').innerText = myDatas.name;
    document.querySelector('#login-name').innerText = myDatas.login;
    document.querySelector('#counter-01').innerText = myDatas.repos;
    document.querySelector('#counter-02').innerText = myDatas.followers;
    document.querySelector('#counter-03').innerText = myDatas.following;
}

let searchGithubUser = document.querySelector('#search-github-user');

function hideAndShowSearch() {
    if (searchGithubUser.style.display !== 'block') {
        searchGithubUser.style.display = 'block';
    } else {
        searchGithubUser.style.display = 'none';
    }
}

let searchBtn = document.querySelector('#search');
searchBtn.addEventListener('click', hideAndShowSearch);

let closeTab = document.querySelector('#close-tab');
closeTab.addEventListener('click', hideAndShowSearch);

let searchAndConfirm = document.querySelector('#confirm');
searchAndConfirm.addEventListener('click', function () {
    getUserGithub();
    hideAndShowSearch();
})