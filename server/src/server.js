import { createServer } from "net";
import { checkUser } from './function/checkUser';
import {checkPasswd } from './function/checkPassword';

export function launch(port) {
  const server = createServer((socket) => {
    console.log("new connection.");
    socket.on("data", (data) => {
      const message = data.toString();

      const [command, ...args] = message.trim().split(" ");
      console.log(command, args);

      switch(command) {
        case "USER":
          socket.write(checkUser(args, allSockets, socket));
          break;
        case "PASS":
          socket.write(checkPasswd(args, allSockets, socket))
            break;
        case "LIST":
          socket.write("125 Data connection already open, transfer starting \r\n");
          break;
        case "CWD":
          socket.write("250 requested file action okay, completed \r\n");
          break;
        case "RETR":
          socket.write("150 File Status okay: about open data connection \r\n");
          break;
        case "STOR":
          socket.write("226 Closing data connection \r\n");
          break;
        case "PWD":
          socket.write(process.cwd());
          break;
        case "HELP":
          displayList:
          socket.write("211 USER <username>: check if the user exist \r\n PASS <password>: authentificate the user with a password \r\n LIST: list the current directory of the server \r\n CWD: Change the current directory of the server \r\n RETR: Transfer a copy of the file from the server to the client. \r\n STOR: Transfer a copy of the file FILE from the client to the server. \r\n PWD: Display the name of the current directory of the server. \r\n Quit: Close the connection and stop the program. ")
        case "QUIT":
          socket.write(process.exit());
          break;
        // case "SYST":
        //   socket.write("215 \r\n");
        //   break;
        // case "FEAT":
        //   socket.write("211 \r\n");
        //   break;
        // case "TYPE":
        //   socket.write("200 \r\n");
        //   break;

        default:
          console.log("command not supported:", command, args);
      }
    });
  });

  server.listen(port, () => {
    console.log(`server started at localhost:${port}`);
  });
}


