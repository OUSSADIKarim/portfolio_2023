import { RefreshToken } from "../models/RefreshToken"
import { RefreshTokenDocument } from "../types/refreshToken"

export const createRefreshTokenService = async (
  userId: string,
  refreshToken: string
) => {
  try {
    const newRefreshToken: RefreshTokenDocument = await RefreshToken.create({
      userId,
      refreshToken,
    })
    return newRefreshToken
  } catch (error) {
    throw error
  }
}

export const deleteRefreshTokenService = async (refreshToken: string) => {
  try {
    await RefreshToken.deleteOne({ refreshToken })
  } catch (error) {
    throw error
  }
}
