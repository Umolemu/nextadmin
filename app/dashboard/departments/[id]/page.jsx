import styles from '../../../ui/dashboard/departments/singleDepartment/singleDepartment.module.css'
import Image from 'next/image'

const SingleDepartmentPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <form action="" className={styles.form}>
                <label >Name</label>
                <input type="text" name="name" placeholder='John Doe'/>

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