class AuthController {
  async login(ctx) {
    const { id, name } = ctx.state.user
    ctx.body = { success: true, message: 'User login succeed.', data: ctx.state.user }
  }
}

export default new AuthController()
