import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";
import { addUser } from '../../../lib/actions'

const AddUserPage = () => {
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
          <option value={false}>
            Is Manager?
          </option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="status" id="status">
          <option>Active</option>
          <option value={false}>Inactive</option>
        </select>

        <select name="isActive" id="isActive">
          <option>Manager 1</option>
          <option>Manager 2</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;