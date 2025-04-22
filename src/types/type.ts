export interface BlogData {
  id: string;
  title: string;
  content: string;
  tags: string[];
  create_at: Date;
  update_at: Date;
  author_id: string;
}

export type LoginData = { email: string; password: string };

export type RegisterData = LoginData & { name: string };