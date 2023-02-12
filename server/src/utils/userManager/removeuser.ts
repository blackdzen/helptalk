import User from "../../models/user.js";
import UserData from "./UserData.js";

async function removeUser() {
  const userData = new UserData();
  await userData.setUsername().then(async () => {
    const { username } = userData.getUserData();
    console.log(`Username: ${username}`);
    const response = await User.deleteOne({ username });
    console.log(`Response: ${response}`);
    const { acknowledged, deletedCount } = response;
    console.log(
      `acknowledged -> ${acknowledged} deletedCount -> ${deletedCount}`
    );
    return response;
  });
}

export default removeUser;
