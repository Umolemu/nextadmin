import styles from "../../../ui/dashboard/departments/addDepartment/addDepartment.module.css";
import { addDepartment } from '../../../lib/actions';
import { fetchManagers } from "../../../lib/data";

const AddDepartmentPage = async () => {
  const managers = await fetchManagers();
  managers.push({id: 'None', name: "None"});
  return (
    <div className={styles.container}>
      <form action={addDepartment} className={styles.form}>
        
        <input type="text" placeholder="name" name="name" required/>
        
        <select name="manager" id="manager">
          {managers.map((manager) => (
            <option value={manager.id}>{manager.name}</option>
          ))}
        </select>

        <select name="status" id="status">
            <option value="" disabled selected hidden>
             Status
            </option>
          <option value="yes">Active</option>
          <option value="no">Inactive</option>
        </select>

          <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default AddDepartmentPage