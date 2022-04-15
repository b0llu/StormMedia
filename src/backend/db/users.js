import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Admin",
    username: "TheAdmin",
    password: "Admin123",
    profilePhoto: "",
    coverPhoto: "",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Dhruv",
    username: "TheBestDhruv",
    password: "Dhruv123",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_200x200.jpg",
    coverPhoto:
      "https://pbs.twimg.com/profile_banners/4025742919/1649866987/1080x360",
    bio: `Learning Programming with Neog Camp.💻
I have a knack for creating websites and styling them.🎨`,
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Akshay",
    username: "Gadgetfather",
    password: "Akshay123",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1463934993692987392/TXpTXOl6_200x200.jpg",
    coverPhoto:
      "https://pbs.twimg.com/profile_banners/2712374694/1637864766/1080x360",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Tanay",
    username: "tanaypratap",
    password: "Tanay123",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1501178147420585987/5_2plEJW_200x200.jpg",
    coverPhoto:
      "https://pbs.twimg.com/profile_banners/52322389/1625485383/1080x360",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Narendra Modi",
    username: "narendramodi",
    password: "Narendra123",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1479443900368519169/PgOyX1vt_200x200.jpg",
    coverPhoto:
      "https://pbs.twimg.com/profile_banners/18839785/1559221352/1080x360",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Rahul Gandhi",
    username: "RahulGandhi",
    password: "Rahul123",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1394646637004431361/43eyqnqr_200x200.jpg",
    coverPhoto:
      "https://pbs.twimg.com/profile_banners/3171712086/1615541977/1080x360",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
