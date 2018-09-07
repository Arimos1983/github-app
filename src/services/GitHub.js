import axios from 'axios'


export default class GitHub{

    constructor(){
        axios.defaults.baseURL = "https://api.github.com/"
    }

    getRepos(username){
        let accessToken = '28627ac497188e7bbe6ad78fd3bf9f5513ef1150'
        return axios.get(`users/${username}/repos`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
    }

}

export const gitHub = new GitHub()