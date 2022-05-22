import { v4 as uuid } from "uuid";
import { formatDate, formatMonth } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    name: "Dhruv",
    username: "TheBestDhruv",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1464407388228780036/NFY5UUPn_200x200.jpg",
    content:
      "It's been 1 and half year since I started playing Dota 2! With this much experience let me tell you something, Dota 2 is the number one free-to-play online game for me until now and I hope it always be.",
    likes: {
      likeCount: 10,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    time: "21 May 2022",
    createdAt: new Date("21 May 2022 11:58:15 PM"),
    updatedAt: formatDate(),
    trending: true,
  },
  {
    _id: uuid(),
    name: "Akshay",
    username: "Gadgetfather",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1463934993692987392/TXpTXOl6_200x200.jpg",
    content:
      "Already Diamond in Apex. I just cant get enough of this Game man!",
    likes: {
      likeCount: 50,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    time: "20 May 2022",
    createdAt: new Date("20 May 2022 11:58:15 PM"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    name: "Tanay",
    username: "tanaypratap",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1501178147420585987/5_2plEJW_200x200.jpg",
    content:
      "Kids playing pubg and fortnight need to realize how beautiful the world outside gaming is!",
    likes: {
      likeCount: 500,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    time: "19 May 2022",
    createdAt: new Date("19 May 2022 11:58:15 PM"),
    updatedAt: formatDate(),
    trending: true,
  },
  {
    _id: uuid(),
    name: "Narendra Modi",
    username: "narendramodi",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1479443900368519169/PgOyX1vt_200x200.jpg",
    content: "Ye PUBG wala hei kya?",
    likes: {
      likeCount: 500,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    time: "18 May 2022",
    createdAt: new Date("18 May 2022 11:58:15 PM"),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    name: "Rahul Gandhi",
    username: "RahulGandhi",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/1394646637004431361/43eyqnqr_200x200.jpg",
    content: "This Morning I Got up at Night!",
    likes: {
      likeCount: 20000,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    time: "17 May 2022",
    createdAt: new Date("17 May 2022 11:58:15 PM"),
    updatedAt: formatDate(),
    trending: true,
  },
  {
    _id: uuid(),
    name: "Admin",
    username: "TheAdmin",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    content: "This is Admin's first post!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    time: "15 May 2022",
    createdAt: new Date("15 May 2022 11:58:15 PM"),
    updatedAt: formatDate(),
    trending: true,
  },
];
