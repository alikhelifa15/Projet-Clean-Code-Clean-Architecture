import { jwtDecode, JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  type: { value: string };
  company: string;
  dealer: string;
}

export const getDecodedToken = (): DecodedToken => {
  const defaultUser: DecodedToken = {
    id: "",
    email: "",
    type: { value: "" },
    company: "",
    dealer: "",
  };

  const token = localStorage.getItem("token");
  if (!token) return defaultUser;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return defaultUser;
  }
};

export const getUserId = (): string => {
  const user = getDecodedToken();
  return user.type.value === "COMPANY" ? user.id : user.id;
};