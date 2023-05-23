import { Todo } from "../../services/models/TodoModels";
import { User } from "../../services/models/UserModel";

export interface HomeState {
  usuario: {
    user: User;
    token: string;
  };
  todo: Todo;
}
