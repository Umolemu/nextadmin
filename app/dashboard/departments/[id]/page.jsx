import styles from '../../../ui/dashboard/departments/singleDepartment/singleDepartment.module.css'
import {updateDepartment} from '../../../lib/actions'
import { fetchDepartment } from '../../../lib/data'
const SingleDepartmentPage = async ({params}) => {

    const { id } = params
    const department = await fetchDepartment(id)

  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <form action={updateDepartment} className={styles.form}>
                <input type="hidden" name="" value={department.id}/>
                <label >Name</label>
                <input type="text" name="name" placeholder={department.name}/>

                <label>Status</label>
                <select name="status" id="status">
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>

                <label>Manager</label>
                <select name="manager" id="manager">
                    <option>manager 1</option>
                    <option>manager 2</option>
                </select>

                <button>Update</button>
            </form>
        </div>
    </div>
  )
}

export default SingleDepartmentPage