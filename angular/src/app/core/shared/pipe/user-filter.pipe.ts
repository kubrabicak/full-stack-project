import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../../models/user.model";

@Pipe({
  standalone: true,
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], searchTerm: string): User[] {
    const term = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }
}
