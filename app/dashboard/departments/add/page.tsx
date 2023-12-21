import styles from "../../../ui/dashboard/departments/addDepartment/addDepartment.module.css";
import { addDepartment } from '../../../lib/actions';
import { fetchManagers } from "../../../lib/data";
import { Users } from "../../../lib/types";

const AddDepartmentPage = async () => {
  //import managers to show in the select box
  const managers: Users[] = await fetchManagers();
  managers.push({id: 'None', name: "None"});

  return (
    <div className={styles.container}>
      <form action={addDepartment} className={styles.form}>
        
        <input type="text" placeholder="name" name="name" required/>
        
        <select name="manager" id="manager">
          {managers.map((manager) => (
            <option value={manager.name}>{manager.name}</option>
          ))}
        </select>

        <select name="status" id="status">
            <option value="" disabled selected hidden>
             Status
            </option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

          <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default AddDepartmentPage