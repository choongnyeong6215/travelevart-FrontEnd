export type TTooltipDirection = "top" | "bottom" | "left" | "right";

export type TCheckBoxGroupDirecion = "horizontal" | "vertical";

export type TLoginWay = "kakao" | "credentials";

export type TFocusBoard = "여행게시판" | "자유게시판";

export interface IAuthUser {
  userId: number; // primary key
  name: string;
  email: string;
  profileImg: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
  uid: string; // token.sub
}

export interface IAuthKaKaoUser {
  userId: number;
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
  startDay: string;
  endDay: string;
  title: string;
  region: string;
  image: string;
}

export interface IFestival {
  id: number;
  startDay: string;
  endDay: string;
  title: string;
  region: string;
  image: string;
  summary: string;
  detailInfo: string;
  eventInfo: string;
  tel: string;
  address: string;
  eventAddress: string;
  site: string;
  price: string;
  host: string;
  viewCount: number;
}

export interface IGetFestivalResponse {
  item: IFestival | null;
}

// 커스텀하기 데이터 타입

export interface ITravelDetail {
  detailtravelId: number;
  travelrouteId: number;
  placeId: number;
  routeIndex: number;
  contents: string;
  regionId: number;
  address: string;
  placeTitle: string;
  placeImage: string;
  mapLink: string | null;
}

export interface ITravelItem {
  date: string;
  details: ITravelDetail[];
}

export interface ITravelCustomData {
  travelRouteName: string;
  travelRouteRange: number;
  startDate: string;
  endDate: string;
  travelRouteId: number | null;
  travelRouteTransport: string;
}

export interface ITravelResponse {
  items: ITravelItem[];
}
