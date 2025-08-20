import { UserDTO } from "./user-dto";

export interface LoginResponseDTO {
  succes: boolean;
  author: string;
  application: string;
  message: string;
  date: string;
  status: number;
  content: {
    user: UserDTO;
    token: string;
  };
}