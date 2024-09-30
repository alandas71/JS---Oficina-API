import jwt from "jsonwebtoken";

function generateToken(usuario: string) {
  const payload = { usuario };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
}

export default generateToken;
