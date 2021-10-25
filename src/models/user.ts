export class User {
    constructor(
      public userId?: string | null,
      public email?: string | null,
      public userName?: string | null,
      public password?: string | null
    ) { }
  }