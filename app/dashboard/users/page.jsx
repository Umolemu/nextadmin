import Pagination from "../../ui/dashboard/pagination/pagination";
import Search from "../../ui/dashboard/search/search";
import styles from "../../ui/dashboard/users/users.module.css";
import Link from "next/link";
import { fetchUsers } from '../../lib/data';
import { deleteUser } from "../../lib/actions";
import { auth } from "../../auth"
import { fetchUser, fetchUsersOnce } from "../../lib/data";

const UsersPage = async ( {searchParams} ) => {

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  var {count, users} = await fetchUsers(q, page);
  
  var hide = false;
  /*Only show relevant Users*/
  const {user} = await auth();
  
  //if User
  if(user.isAdmin === "No" && user.isManager === "No") {
    const currentUser = await fetchUser(user.id);
    users = [currentUser];
    hide = true;
  }
  //if manager
  if(user.isManager === "Yes" && user.isAdmin === "No") {
    var currentUser = await fetchUser(user.id);
    var currentUsers = await fetchUsersOnce();

    var newUsers = currentUsers.filter((u) => u.manager === currentUser.name)
    newUsers.push(currentUser);
    
    users = newUsers;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user" />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton} disabled={hide}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Surname</td>
            <td>Email</td>
            <td>Phone</td>
            <td>manager</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  {user.name}
                </div>
              </td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.manager}</td>
              <td>{user.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <form action={deleteUser}>
                      <input type="hidden" name="id" value={user.id}/>
                      <button className={`${styles.button} ${styles.delete}`} disabled={hide}>Delete</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count}/>
    </div>
  );
};

export default UsersPage;