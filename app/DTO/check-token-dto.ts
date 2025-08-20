import { UserDTO } from "./user-dto";

export interface CheckTokenDTO {
  token: string;
  user: UserDTO;
}
