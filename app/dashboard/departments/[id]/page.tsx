import styles from '../../../ui/dashboard/departments/singleDepartment/singleDepartment.module.css'
import {updateDepartment} from '../../../lib/actions'
import { fetchDepartment } from '../../../lib/data'
import { fetchManagers } from "../../../lib/data";
import { Users, Departments } from "../../../lib/types";

const SingleDepartmentPage = async ({params}) => {
    //import managers to show in the select box
    const managers: Users[] = await fetchManagers();
    managers.push({id: 'None', name: "None"});
    
    //On edit get the current department being edited
    const { id } = params
    const department: Departments = await fetchDepartment(id)

  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <form action={updateDepartment} className={styles.form}>
                <input type="hidden" name="" value={department.id}/>
                <label >Name</label>
                <input type="text" name="name" placeholder={department.name}/>

                <label>Status</label>
                <select name="status" id="status">
                    <option>Active</option>
                    <option>Inactive</option>
                </select>

                <label>Manager</label>
                <select name="manager" id="manager">
                    {managers.map((manager) => (
                        <option value={manager.id}>{manager.name}</option>
                    ))}
                </select>

                <button>Update</button>
            </form>
        </div>
    </div>
  )
}

export default SingleDepartmentPage