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
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
    URL: "https://dhruv-samant.netlify.app/",
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
    URL: "https://gadgetfather.netlify.app/",
  },
  {
    _id: uuid(),
    firstName: "NZXT",
    username: "NZXT",
    password: "NZXT123",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1455182854351061000/YJR3nuxY_reasonably_small.png",
    coverPhoto:
      "https://pbs.twimg.com/profile_banners/19936982/1631051641/300x100",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "ROG Global",
    username: "ASUS_ROG",
    password: "ASUS_ROG123",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1346369825019371525/awnlfQQs_200x200.jpg",
    coverPhoto:
      "https://pbs.twimg.com/profile_banners/111519701/1651463969/1080x360",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "NVIDIA",
    username: "nvidia",
    password: "Nvidia123",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1145524454170062848/U4lxVYEw_200x200.png",
    coverPhoto:
      "https://pbs.twimg.com/profile_banners/61559439/1653365289/1080x360",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
