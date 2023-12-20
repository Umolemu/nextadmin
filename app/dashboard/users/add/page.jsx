import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";
import { addUser } from '../../../lib/actions';
import { fetchManagers } from "../../../lib/data";

const AddUserPage = async () => {
  const managers = await fetchManagers();
  managers.push({id: 'None', name: "None"});
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        
        <input type="text" placeholder="name" name="name" required />
        
        <input type="text" placeholder="surname" name="surname" required />

        <input type="phone" placeholder="phone" name="phone" />

        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />

        <select name="isManager" id="isManager">
          <option value="" disabled selected hidden>
          is Manager ?
          </option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="status" id="status">
          <option value="" disabled selected hidden>
            Status
          </option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <select name="manager" id="manager">
          <option value="" disabled selected hidden>
            Select Manager
          </option>
          {managers.map((manager) => (
            <option key={manager.name} value={manager.name}>
              {manager.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;