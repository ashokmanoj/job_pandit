import { IMenuData } from "@/types/menu-data-type";

const menu_data: IMenuData[] = [
  {
    id: 1,
    link: "/",
    title: "Home",
  },
  {
    id: 2,
    link: "/job-list-v1",
    title: "Jobs",
    sub_menus: [
      { link: "/job-list-v1", title: "All Jobs" },
      { link: "/company-v1", title: "Companies" },
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
