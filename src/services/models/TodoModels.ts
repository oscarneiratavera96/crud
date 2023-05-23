export interface Todo {
  _id: string;
  title: string;
  description: string;
  priority: number;
  completed: boolean;
  hashtags: string[];
}
