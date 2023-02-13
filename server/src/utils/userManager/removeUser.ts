import User from "../../models/user.js";
import UserData from "./UserData.js";

//Function removes a user from the database and returns a resulting message as output to the console.
async function removeUser() {
  const userData = new UserData();
  await userData.setUsername().then(async () => {
    const { username } = userData.getUserData();
    const response = await User.deleteOne({ username });
    const { deletedCount } = response;
    console.log(
      deletedCount === 1
        ? `User: ${username} deleted from data base`
        : `User: ${username} doesn't exist in data base`
    );
  });
}

export default removeUser;
