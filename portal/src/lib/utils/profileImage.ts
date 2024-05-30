interface IProfileImage {
  email?: string
  userId?: string
}

export function profileImage ({email, userId}: IProfileImage ) {
  const userPicture = `${process.env.REACT_APP_API || ''}/api/user/profile/image/${email || userId}`
  return userPicture
}