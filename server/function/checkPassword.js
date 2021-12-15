import fs from 'fs';

 export function checkPassword(password, allSockets, socket) {
     try {
         let res = "Authentication failed\r\n";
         let json = fs.readFileSync('./data/user.json');
         let js = JSON.parse(json);
         if (js[allSockets[socket.uid]]["password"] == password) {
             res = "Authentication was successfuly !\r\n"
         }
         return res;
     } catch (e) {
         console.log(e);
         socket.write("Password check didn't work properly, please try again.\r\n");
     }
 }