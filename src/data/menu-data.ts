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
  // {
  //   id:3,
  //   link:'/about-us',
  //   title:'About Us',
  //   mega_menus:[
  //     {
  //       id:1,
  //       title:'Candidates',
  //       sub_menus:[
  //         {title:'Candidates V-1',link:'/candidates-v1'},
  //         {title:'Candidates V-2',link:'/candidates-v2'},
  //         {title:'Candidates V-3',link:'/candidates-v3'},
  //         {title:'Candidates V-4',link:'/candidates-v4'},
  //         {title:'Candidates Details v-1',link:'/candidate-profile-v1'},
  //         {title:'Candidates Details v-2',link:'/candidate-profile-v2'},
  //       ]
  //     },
  //     {
  //       id:2,
  //       title:'Company',
  //       sub_menus:[
  //         {title:'Company V-1',link:'/company-v1'},
  //         {title:'Company V-2',link:'/company-v2'},
  //         {title:'Company V-3',link:'/company-v3'},
  //         {title:'Company V-4',link:'/company-v4'},
  //         {title:'Company Details',link:'/company-details'},
  //       ]
  //     },
  //     {
  //       id:3,
  //       title:'Essentials',
  //       sub_menus:[
  //         {title:'About Us',link:'/about-us'},
  //         {title:'Pricing',link:'/pricing'},
  //         {title:'FAQ',link:'/faq'},
  //         {title:'Register',link:'/register'},
  //       ]
  //     },
  //   ]
  // },
  {
    id: 3,
    link: "/about-us",
    title: "About Us",
  },
  {
    id: 5,
    link: "/blog-v1",
    title: "Guide",
  },
  {
    id: 6,
    link: "/contact",
    title: "Contact",
  },
  {
    id: 7,
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
