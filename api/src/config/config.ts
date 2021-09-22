
interface DatabaseConfig {
  host: string
  name: string
  username: string
  password: string
  port: string
}
const config = {
  port: process.env.PORT || 3000,
  database: {
      host: '167.71.157.95',
      name: 'ADFOODIO',
      username: 'ULTRASTAGING',
      password: 'ULTRADEV123#',
      port: 3306,
  }
}

export default config
  