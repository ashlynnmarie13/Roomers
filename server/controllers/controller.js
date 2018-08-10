const Profile = require("../Models/Profile");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new AWS.S3();
const myBucket = "barc-housing";
const myKey = process.env.MY_KEY;
const FormData = require("form-data");

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
    });
    newProfile
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
      })
      .catch(err => console.log("User already has a profile " + err));
  },

  uploadPhoto: (req, res) => {
    console.log(req.file);
    let imageLink = "";

    s3.createBucket({ Bucket: myBucket }, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        params = {
          Bucket: myBucket,
          Key: `${myKey}/${req.file.filename}`,
          Body: req.file.data,
          ContentType: req.file.mimetype,
          ACL: "public-read"
        };

        console.log(req.file);

        s3.putObject(params, function(err, data) {
          if (err) {
            console.log(err);
          } else {
            imageLink = `https://${myBucket}.s3.amazonaws.com/${myKey}/${
              req.file.filename
            }`;

            res.status(200).send(imageLink);
          }
        });
      }
    });
  },

  getAllProfiles: (req, res) => {
    const { smoke, guests, pets, clean, state } = req.query;

    let smokeBool = smoke === "true";
    let guestsBool = guests === "true";
    let petsBool = pets === "true";
    let cleanBool = clean === "true";

    Profile.find({
      "prefs.smoke": smokeBool,
      "prefs.guests": guestsBool,
      "prefs.pets": petsBool,
      "prefs.clean": cleanBool
    }).then(response => res.status(200).send(response));
  },

  getProfileById: (req, res) => {
    Profile.findOne({ user: req.params._id })
      .populate("_id", ["name, profilePic"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile for user";
          res.status(404).json(errors);
        }
        res.json(profile);
      });
  }
};
