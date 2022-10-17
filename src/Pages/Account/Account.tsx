import { useEffect } from 'react';
import { useApp, useAuth } from '../../Tools/Hooks';
import styles from './Account.module.css';

export function Account() {
  const app = useApp()
  const auth = useAuth()

  useEffect(() => {
    app.setTitle("Mi cuenta")
  }, [])

  if (auth.profile)
    return (
      <div className={styles.page}>
        <h1>{auth.profile.displayName}</h1>
        <h2>{auth.profile.email}</h2>
        <h3>Telefono: {auth.profile.phoneNumber}</h3>
        <img
          src={auth.profile.photoURL ? auth.profile.photoURL : "https://www.gstatic.com/images/branding/product/1x/contacts_48dp.png"}
        />

        <h3>Roles:</h3>
        {auth.profile.roles.map(r => <h4>{r}</h4>)}
      </div >
    );
  else return (
    <div>
      <h1>PERSONA NO REGISTRADA</h1>
    </div>
  )
}
