import jwt from 'jsonwebtoken';

export class JwtService {
  //private secretKey = process.env.JWT_SECRET as string;
  private secretKey = "a3f1b29c8a62d3e4f7c9b6a8e1d5c3a7";
  constructor() {
    if (!this.secretKey) {
      throw new Error("SECRET_KEY non définie dans .env");
    }
  }

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
