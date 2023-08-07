import argon2 from 'argon2'

async function hashPassword(plainPassword) {
  try {
    const hashedPassword = await argon2.hash(plainPassword)
    return hashedPassword
  } catch (err) {
    throw err
  }
}

async function verifyPassword(savedHashedPassword, loginPassword) {
  try {
    const result = await argon2.verify(savedHashedPassword, loginPassword)
    return result
  } catch (err) {
    throw err
  }
}

export { hashPassword, verifyPassword }
