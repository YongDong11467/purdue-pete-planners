import { AbstractControl, FormGroup } from '@angular/forms';
import axios from 'axios';
    
export function testUsernameAvailable (username: string, oldusername: string){
        let ret
        axios.get(`/api/account/searchUsers`, { params: { prefix: username} })
        .then((res) => {
          //console.log("res data: ", res.data[0])
          //console.log("res data user: ", res.data[0].user_name)
          //console.log("user: ", username)
          //console.log("user: ", oldusername)
          if (typeof res.data[0] === 'undefined' || res.data[0].user_name === oldusername){
            console.log('No matching users, all good')
            ret = 1
          } else {
            console.log('cant change, username is taken')
            ret = 0
            // sessionStorage.setItem('curUser', JSON.stringify(res.data[0]));
          }
        });
        return ret;
    // }   
}