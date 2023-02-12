import bcrypt from "bcrypt";
import User from "../../models/user.js";
import UserData from "./UserData.js";

//Function adds new user to Mongo data base and return result message
async function addUser() {
  const userData = new UserData();
  await userData
    .setUsername()
    .then(() => userData.setName())
    .then(() => userData.setPassword())
    .then(async () => {
      try {
        const { username, name, password } = userData.getUserData();
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
          username,
          name,
          passwordHash,
        });
        if (await User.findOne({ username })) {
          console.log(
            `Username: ${username} exist in data base. Username must be unique.`
          );
        } else {
          await user.save().then(() => {
            console.log(`User: ${username} saved successfull.`);
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
}

export default addUser;
