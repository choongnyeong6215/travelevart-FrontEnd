export type TTooltipDirection = "top" | "bottom" | "left" | "right";

export type TCheckBoxGroupDirecion = "horizontal" | "vertical";

export type TLoginWay = "kakao" | "credentials";

export interface IAuthUser {
  userId: number;
  name: string;
  email: string;
  profileImg: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthKaKaoUser {
  userId: string;
  name: string;
  profileImg: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
}

// export interface IUser {
//   user: IAuthUser | IAuthKaKaoUser;
// }

export interface ICarouselContents {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  target: string;
}
