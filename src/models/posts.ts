import { User } from '@/models/user'

export class Posts {
    constructor(
      public author: User = new User(),
      public postId?: string | null,
      public title?: string | null,
      public body?: string | null,
      public createdDate?: Date | null,
    ) { }
  }