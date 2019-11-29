const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.createUserInDatabase = functions.auth.user().onCreate(async user => {
  const email = user.email;

  try {
    const snapshot = await admin
      .database()
      .ref("users/" + user.uid)
      .set({ email: email, uid: user.uid });
    return snapshot;
  } catch (error) {
    console.log(error);
    return error;
  }
});
