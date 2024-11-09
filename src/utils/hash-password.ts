import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(12);
  const hash = bcrypt.hash(password, salt);
  return hash;
}
