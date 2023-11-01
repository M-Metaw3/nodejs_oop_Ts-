export interface UserTokenAttributes {
    id: number;
    userId: number;
    token: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserTokenCreationAttributes {
    userId: number;
    token: string;
    refreshToken: string;
  }
  
  export interface UserTokenInstance {
    dataValues: UserTokenAttributes;
    // Add any additional methods or properties related to UserToken here.
  }
  