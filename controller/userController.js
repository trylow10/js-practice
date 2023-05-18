const User = require('../model/User');
const usersMap = new Map();

exports.getRegister = (req, res) => {
  res.render('register');
};
exports.getLogin =(req,res)=>{
  res.render('login')
}

exports.postLogin=(req,res)=>{
  const formData = req.body;
  res.status(200).json({"user":formData})
}

exports.postRegister = (req, res) => {
  const { firstName, lastName, userName } = req.body;
  const profilePicture = req.file.filename;

  const user = new User(firstName, lastName, userName, profilePicture);

  usersMap.set(userName, user);
  // console.log(us);

  res.redirect(`/user/${user.userName}`);
};

exports.getUser = (req, res) => {
  const { userName } = req.params;

  // Get the user with the matching username from the usersMap
  const user = usersMap.get(userName);

  // Create a new user object with the retrieved information
  const { firstName, lastName, profilePicture } = user;
  const newUser = new User(firstName, lastName, userName, profilePicture);

  // Render the user details page with the user object
  res.render('user', { user: newUser });
};
