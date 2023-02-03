import axios from "axios"
import IServer from "../Interfaces/IServer"

class Server implements IServer {
  link: string

  constructor(link: string) {
    this.link = link
  }

  async login(username: string, password: string) {
    axios.post(`${this.link}/api/login`, { username, password })
      .then(response => {
        console.log(response)
      })
    return 'hui`'
  }
}

export default Server
