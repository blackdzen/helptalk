interface IServer {
  link: string
  login(password: string, username: string): Promise<Object>
}

export default IServer
