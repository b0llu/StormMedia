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
    name: "NZXT",
    username: "NZXT",
    content:
      "What if... it was YOU that made a mistake and NOT your teammates?",
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
    name: "ROG Global",
    username: "ASUS_ROG",
    content:
      "ASUS is bringing five new series of motherboards to exponentially raise performance of upcoming AMD Ryzen 7000-series processors.",
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
    name: "NVIDIA",
    username: "nvidia",
    content:
      "Pearl, a NVIDIA Inception startup program member, landed FDA clearance last month, the first to get such a go-ahead for dentistry #AI. Their software platform, enables dentists to run real-time screening of X-rays.",
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
