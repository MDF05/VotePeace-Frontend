import { UserDTO } from "./user-dto";

export interface RegisterResponseDTO {
  success: boolean;
  author: string;
  application: string;
  message: string;
  date: string;
  status: number;
  content: {
    user: UserDTO;
  };
}
