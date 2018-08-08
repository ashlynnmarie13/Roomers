const Profile = require("../Models/Profile");

module.exports = {
  addUserInfo: (req, res) => {
    const {
      userID,
      name,
      gender,
      email,
      phone,
      dob,
      about,
      profilePic,
      title,
      company,
      description,
      clean,
      healthy,
      professional,
      student,
      earlyBird,
      nightOwl,
      fitnessEnthusiast,
      creative,
      bookworm,
      foodie,
      partyAnimal,
      vegan,
      introverted,
      smoke,
      guests,
      pets
    } = req.body;

    const newProfile = new Profile({
      _id: userID,
      name,
      gender,
      email,
      phone,
      birthday: dob,
      interestsDescription: description,
      aboutMe: about,
      title,
      companyName: company,
      profilePic,
      pref: {
        smoke,
        guests,
        pets
      },
      traits: {
        clean,
        healthy,
        professional,
        student,
        earlyBird,
        nightOwl,
        fitnessEnthusiast,
        creative,
        bookworm,
        foodie,
        partyAnimal,
        vegan,
        introverted
      }
    })
      .save()
      .then(response => {
        let toReturn = {};

        for (let i in response) {
          if (!response.hasOwnProperty(i)) continue;

          if (typeof response[i] == "object") {
            let flatObject = flattenObject(response[i]);
            for (let x in flatObject) {
              if (!flatObject.hasOwnProperty(x)) continue;

              toReturn[i + "." + x] = flatObject[x];
            }
          } else {
            toReturn[i] = response[i];
          }
        }

        res.status(200).send(toReturn);
      });
  }
};
