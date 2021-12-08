import { createServer } from "net";

export function launch(port) {
  const server = createServer((socket) => {
    console.log("new connection.");
    socket.on("data", (data) => {
      const message = data.toString();

      const [command, ...args] = message.trim().split(" ");
      console.log(command, args);

      switch(command) {
        case "USER":
          socket.write("230 User logged in, proceed.\r\n");
          break;
        case "PASS":
          socket.write("331 User name ok, need pass.\r\n");
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
          socket.write("211 USER <username>: check if the user exist \r\n PASS <password>: authentificate the user with a password \r\n LIST: list the current")
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

function checkuser(name){
  let response = "user doesn't exist";
  let rawdata = fs.readFileSync('${directory}/user.json');
  let user = JSON.parse(rawdata);
  if (user[name] != null) {
    response = "user exist";
  }
  return response
}
