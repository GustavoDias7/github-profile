function getUserLogin() {
    return document.querySelector('#login-name-input').value;
}

function getGithubUser() {
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

    let endpoint = `https://api.github.com/users/${getUserLogin()}`;
    xhr.open('GET', endpoint, true);
    xhr.send();

    function getDatas(data) {
        let myDatas = {
            name: data.name,
            bio: data.bio,
            login: data.login,
            followers: data.followers,
            reposNum: data.public_repos,
            avatar: data.avatar_url,
            linkProfile: data.html_url,
            following: data.following
        };
        setInformations(myDatas);
    }

    function setInformations(myDatas) {
        document.querySelector('#profile-avatar').setAttribute('src', myDatas.avatar);
        document.querySelector('#profile-link').setAttribute('href', myDatas.linkProfile);
        document.querySelector('#profile-link').innerText = myDatas.name;
        document.querySelector('#login-name').innerText = myDatas.login;
        document.querySelector('#bio').innerText = myDatas.bio;
        document.querySelector('#counter-01').innerText = myDatas.reposNum;
        document.querySelector('#counter-02').innerText = myDatas.followers;
        document.querySelector('#counter-03').innerText = myDatas.following;
    }
}

function getUserRepos() {
    let endpoint = `https://api.github.com/users/${getUserLogin()}/repos`;
    fetch(endpoint)
        .then(response => response.json())
        .then(data => setInformations(data))
        .catch(console.error);

    function setInformations(data) {
        let myElementsUl = [];

        myElementsUl = data.map(function (element) {
            let liTags = '';

            for (let key in element) {
                if(element[key] === null) continue;

                if (key === 'name') {
                    liTags += '<li><h3>' + element[key] + '</h3></li>';
                } 
                else if (key === 'html_url') {
                    liTags += `<li><a href="${element[key]}">Acesse o repositório</a></li>`;
                }
                else if (key === 'description' || key === 'language' ||
                key === 'stargazers_count') {
                    liTags += '<li>'+ element[key] + '</li>';
                }
            }

            return '<ul>' + liTags + '</ul>';
        })

        document.querySelector('#repos-list').innerHTML = '';
        document.querySelector('#repos-list').classList.add('generic-section');
        
        myElementsUl.forEach(function (ul) {
            document.querySelector('#repos-list').innerHTML += ul;
        })
    }
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
    getGithubUser();
    getUserRepos();
    hideAndShowSearch();
})