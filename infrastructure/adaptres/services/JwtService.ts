import jwt from 'jsonwebtoken';

export class JwtService {
  private secretKey = 'yourSecretKey';

  generateToken(user: any): string {
    return jwt.sign({ id: user.id, email: user.email }, this.secretKey, {
      expiresIn: '1h',
    });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.secretKey);
  }
}
