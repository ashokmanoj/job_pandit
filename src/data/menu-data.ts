import { IMenuData } from "@/types/menu-data-type";

const menu_data: IMenuData[] = [
  {
    id: 1,
    link: "/",
    title: "Home",
  },
  {
    id: 2,
    link: "/job-list",
    title: "Jobs",
    sub_menus: [
      { link: "/job", title: "All Jobs" },
      { link: "/company", title: "Companies" },
      { link: "/candidate", title: "Candidates" },
    ],
  },
  {
    id: 3,
    link: "/about-us",
    title: "About Us",
  },
  {
    id: 4,
    link: "/blog-v1",
    title: "Guide",
  },
  {
    id: 5,
    link: "/contact",
    title: "Contact",
  },
  {
    id: 6,
    link: "/",
    title: "More",
    sub_menus: [
      { title: "Pricing", link: "/pricing" },
      { title: "FAQ", link: "/faq" },
      { title: "Register", link: "/register" },
    ],
  },
];

export default menu_data;
