import Pagination from "../../ui/dashboard/pagination/pagination"
import Search from "../../ui/dashboard/search/search"
import styles from "../../ui/dashboard/departments/departments.module.css"
import Link from "next/link"
import { fetchDepartments } from '../../lib/data';
import { deleteDepartment } from "../../lib/actions";
import { auth } from "../../auth"
import { fetchUser } from "../../lib/data";
import  { Departments } from "../../lib/types"

const DepartmentsPage = async ({searchParams}) => {
  
  //Filter departments by search params
  const q: string = searchParams?.q || "";
  const page: number = searchParams?.page || 1;
  let {count, departments}: {count: number, departments: Departments[]}  = await fetchDepartments(q, page);

  const {user}: any = await auth();
  
  //if manager or user hide create user and set isManager
  let hide: boolean = false;
  
  //if logged in as user only show departments that belong to that user
  if(user.isAdmin === "No" && user.isManager === "No") {
    let currentUser = await fetchUser(user.id);
    departments = departments.filter((e) => e.manager === currentUser.manager)
    hide = true;
  }

  //if logged in as manager only show departments that belong to the manager
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