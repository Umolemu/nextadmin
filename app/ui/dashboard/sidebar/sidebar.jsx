import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdLogout,
} from "react-icons/md";
import MenuLink from './menuLink/menuLink';
import Image from "next/image";
import { auth, signOut } from "../../../auth";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Departments",
        path: "/dashboard/departments",
        icon: <MdShoppingBag />,
      },
    ],
  },
];

const Sidebar = async ()  => {
  const {user} = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage}src="/noavatar.png" alt="" width="50" height="50"/>
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.name}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form action={async () => {
        "use server"
        await signOut();
      }}>
        <button className={styles.logout}>
          <MdLogout/>
         Logout
        </button>
      </form>
    </div>
  )
}

export default Sidebar;