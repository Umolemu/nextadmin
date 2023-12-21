import styles from '../../../ui/dashboard/users/singleUser/singleUser.module.css'
import Image from 'next/image'
import { fetchUser } from '../../../lib/data'
import { updateUser } from '../../../lib/actions'
import { fetchManagers } from "../../../lib/data";
import { auth } from "../../../auth"
import { User, Users } from '../../../lib/types';

const SingleUserPage = async ({ params }) => {
    
    const managers: Users[] = await fetchManagers();
    
    managers.push({id: 'None', name: "None"});
    
    /**Fetch Users by parameters in url*/
    const { id } = params
    const userToEdit = await fetchUser(id)

    var hide = true;
    /*Only show relevant Users*/
    const { user }: any = await auth();
    
    //if User
    if(user.isAdmin === "Yes") {
      hide = false;
    }

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
                <input type="hidden" name="id" value={userToEdit.id}/>
                <label >Name</label>
                <input type="text" name="name" placeholder={userToEdit.name}/>

                <label >Surname</label>
                <input type="surname" name="surname" placeholder={userToEdit.surname}/>

                <label >Phone</label>
                <input type="text" name="phone" placeholder={userToEdit.phone}/>

                <label >Email</label>
                <input type="email" name="email" placeholder={userToEdit.email}/>

                <label >Password</label>
                <input type="password" name="password"/>
                
                {!hide && (
                    <>
                        <label>is Manager?</label>
                        <select name="isManager" id="isManager">
                            <option >Yes</option>
                            <option >No</option>
                        </select>
                    </>
                )}

                <label>Status</label>
                <select name="status" id="status">
                    <option>Active</option>
                    <option>Inactive</option>
                </select>


                {!hide && (
                    <>
                        <label>Manager</label>
                        <select name="manager" id="manager">
                            {managers.map(manager => (
                                <option key={manager.id} value={manager.id}>{manager.name}</option>
                            ))}
                        </select>
                    </>
                )}

                <button>Update</button>
            </form>
        </div>
    </div>
  )
}

export default SingleUserPage