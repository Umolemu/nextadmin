import styles from '../../../ui/dashboard/users/singleUser/singleUser.module.css'
import Image from 'next/image'

const SingleUserPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            
            <div className={styles.imgContainer}>
                <Image src="/noavatar.png" alt="" fill/>
            </div>
            John Doe
        </div>
        
        <div className={styles.formContainer}>
            <form action="" className={styles.form}>
                <label >Name</label>
                <input type="text" name="name" placeholder='John'/>

                <label >Surname</label>
                <input type="surname" name="surname" placeholder='Doe'/>

                <label >Phone</label>
                <input type="text" name="phone" placeholder='00000000'/>

                <label >Email</label>
                <input type="email" name="email" placeholder='JohnDoe@test.com'/>

                <label >Password</label>
                <input type="password" name="password"/>

                <label>is Manager?</label>
                <select name="isManager" id="isManager">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>

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

export default SingleUserPage