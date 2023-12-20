import styles from '../../../ui/dashboard/users/singleUser/singleUser.module.css'
import Image from 'next/image'
import { fetchUser } from '../../../lib/data'
import { updateUser } from '../../../lib/actions'
import { fetchManagers } from "../../../lib/data";

const SingleUserPage = async ({ params }) => {
    
    
    const managers = await fetchManagers();
    managers.push({id: 'None', name: "None"});
    const { id } = params
    const user = await fetchUser(id)

  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            
            <div className={styles.imgContainer}>
                <Image src="/noavatar.png" alt="" fill/>
            </div>
            {user.name}
        </div>
        
        <div className={styles.formContainer}>
            <form action={updateUser} className={styles.form}>
                <input type="hidden" name="id" value={user.id}/>
                <label >Name</label>
                <input type="text" name="name" placeholder={user.name}/>

                <label >Surname</label>
                <input type="surname" name="surname" placeholder={user.surname}/>

                <label >Phone</label>
                <input type="text" name="phone" placeholder={user.phone}/>

                <label >Email</label>
                <input type="email" name="email" placeholder={user.email}/>

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
                    {managers.map(manager => (
                        <option key={manager.id} value={manager.id}>{manager.name}</option>
                    ))}
                </select>

                <button>Update</button>
            </form>
        </div>
    </div>
  )
}

export default SingleUserPage