import fs from 'node:fs/promises'
import jwt from 'jsonwebtoken'

const privateKey = await fs.readFile('./config/private.pem', 'utf-8')

class AuthController {
  async loginUser(ctx) {
    const { id, name } = ctx.state.user
    const token = jwt.sign({ id, name }, privateKey, { algorithm: 'RS256', expiresIn: '1h' })

    ctx.body = { success: true, message: 'User login succeed.', data: { token } }
  }
}

export default new AuthController()
