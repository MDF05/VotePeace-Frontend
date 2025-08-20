export interface UserDTO {
  id: string;
  nik: string;
  name: string;
  role: "USER" | "ADMIN"; // kalau role sudah ada
  createdAt: string;
  updatedAt: string;
}
