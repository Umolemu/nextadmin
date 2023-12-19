import styles from "../../../ui/dashboard/departments/addDepartment/addDepartment.module.css"
import {addDepartment} from '../../../lib/actions'
const AddDepartmentPage = () => {
  return (
    <div className={styles.container}>
      <form action={addDepartment} className={styles.form}>
        
        <input type="text" placeholder="name" name="name" required/>
        
        <select name="manager" id="manager">
          <option value="manager1">manager1</option>
          <option value="manager2">manager2</option>
          <option value="manager3">manager3</option>
        </select>

        <select name="status" id="status">
          <option value="yes">Yes</option>
          <option value="no">no</option>
        </select>

          <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default AddDepartmentPage