import Pagination from "../../ui/dashboard/pagination/pagination"
import Search from "../../ui/dashboard/search/search"
import styles from "../../ui/dashboard/departments/departments.module.css"
import Link from "next/link"
import { fetchDepartments } from '../../lib/data';
import { deleteDepartment } from "../../lib/actions";
import { auth } from "../../auth"
import { fetchUser, fetchDepartmentsOnce } from "../../lib/data";

const DepartmentsPage = async ({searchParams}) => {
  
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  let {count, departments} = await fetchDepartments(q, page);

  const {user} = await auth();
  let hide = false;
  
  //if user 
  if(user.isAdmin === "No" && user.isManager === "No") {
    let currentUser = await fetchUser(user.id);
    departments = departments.filter((e) => e.manager === currentUser.manager)
    hide = true;
  }

  //if manager
  if(user.isAdmin === "No" && user.isManager === "Yes") {
    departments = departments.filter((e) => e.manager === user.name)
    hide = true;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a department"/>
        <Link href="/dashboard/departments/add">
          <button className={styles.addButton} disabled={hide}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Manager</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>{department.manager}</td>
              <td>{department.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/departments/${department.id}`}>
                    <button className={`${styles.button} ${styles.view}`} disabled={hide}>
                      View
                    </button>
                  </Link>
                  
                  <form action={deleteDepartment}>
                    <input type="hidden" name="id" value={department.id}/>
                    <button className={`${styles.button} ${styles.delete}`} disabled={hide}>
                      Delete
                    </button>
                  </form>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count}/>
    </div>
  )
}

export default DepartmentsPage;