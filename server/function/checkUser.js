import fs from 'fs';

 export function checkUser(name, allSockets, socket) {
     try {
         let res = "User not exist";
         let json = fs.readFileSync('./data/user.json');
         let js = JSON.parse(json);
         if (js[name] != null) {
             allSockets[socket.uid] = name;
             res = "Hi " + name + ". What is your pass ? \n\r"
         }
         return res;
     } catch (e) {
         console.log(e);
         socket.write("User check didn't work properly, please try again.\r\n");
     }
 }