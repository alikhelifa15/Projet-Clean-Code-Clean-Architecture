import jwt from 'jsonwebtoken';

export class JwtService {
  private secretKey = 'yourSecretKey';

  generateToken(user: any, company: any, dealer: any): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        type: user.type,
        company: company ? company.companyName : null,
        dealer: dealer ? dealer.name : null
      },
      this.secretKey,
      {
        expiresIn: '1h',
      }
    );
  }
  

  verifyToken(token: string): any {
    return jwt.verify(token, this.secretKey);
  }
}
