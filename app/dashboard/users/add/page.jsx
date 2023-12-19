import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        
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
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <select name="status" id="status">
          <option value={true}>
            Status
          </option>
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>

        <select name="isActive" id="isActive">
          <option value={true}>
            Manager
          </option>
          <option value={true}>Manager 1</option>
          <option value={false}>Manager 2</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;