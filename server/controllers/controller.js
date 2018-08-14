const Profile = require("../Models/Profile");
const Listing = require("../Models/Listing");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const myBucket = "barc-housing";
const myKey = process.env.MY_KEY;

let flattenObject = function(ob) {
  let toReturn = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object") {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

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
      street,
      city,
      state,
      zip,
      apt,
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
      street,
      city,
      state,
      zip,
      apt,
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
        let newObj = flattenObject(response);

        res.status(200).send(newObj);
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
    const { id } = req.params;

    Profile.findOne({ _id: id }).then(profile => {
      res.status(200).send(profile);
    });
  },

  addListing: (req, res) => {
    const {
      earlyTwenties,
      lateTwenties,
      thirties,
      fortiesAndOlder,
      male,
      female,
      street,
      apt,
      city,
      state,
      zip,
      monthlyCost,
      depositCost,
      moveInDate,
      rentLength,
      washer,
      wifi,
      utilities,
      furnished,
      elevator,
      doorman,
      airConditioning,
      heating,
      gym,
      tv,
      privateBathroom,
      outdoorSpace,
      hasPet,
      roomImage,
      userID
    } = req.body;

    const newListing = new Listing({
      userID,
      human: {
        age: {
          earlyTwenties,
          lateTwenties,
          thirties,
          fortiesAndOlder
        },
        gender: {
          male,
          female
        }
      },
      address: {
        street,
        apt,
        city,
        state,
        zip
      },
      rent: {
        monthlyCost,
        depositCost,
        moveInDate,
        rentLength
      },
      amenities: {
        washer,
        wifi,
        utilities,
        furnished,
        elevator,
        doorman,
        airConditioning,
        heating,
        gym,
        tv,
        privateBathroom,
        outdoorSpace,
        hasPet
      }
    });

    newListing.save().then(response => res.status(200).send(response));
  },
  getListings: (req, res) => {
    const {
      smoke,
      clean,
      guests,
      pets,
      washer,
      wifi,
      utilities,
      furnished,
      elevator,
      doorman,
      airConditioning,
      heating,
      gym,
      tv,
      privateBathroom,
      outdoorSpace,
      hasPet,
      selectedState,
      rentLength,
      male,
      female
    } = req.query;

    let smokeBool = smoke === "true";
    let cleanBool = clean === "true";
    let guestsBool = guests === "true";
    let petsBool = pets === "true";
    let washerBool = washer === "true";
    let wifiBool = wifi === "true";
    let utilitiesBool = utilities === "true";
    let furnishedBool = furnished === "true";
    let elevatorBool = elevator === "true";
    let doormanBool = doorman === "true";
    let airConditioningBool = airConditioning === "true";
    let heatingBool = heating === "true";
    let gymBool = gym === "true";
    let tvBool = tv === "true";
    let privateBathroomBool = privateBathroom === "true";
    let outdoorSpaceBool = outdoorSpace === "true";
    let hasPetBool = hasPet === "true";

    Listing.find({
      "prefs.smoke": smokeBool,
      "prefs.clean": cleanBool,
      "prefs.guests": guestsBool,
      "prefs.pets": petsBool,
      "amenities.washer": washerBool,
      "amenities.wifi": wifiBool,
      "amenities.utilities": utilitiesBool,
      "amenities.furnished": furnishedBool,
      "amenities.elevator": elevatorBool,
      "amenities.doorman": doormanBool,
      "amenities.airConditioning": airConditioningBool,
      "amenities.heating": heatingBool,
      "amenities.gym": gymBool,
      "amenities.tv": tvBool,
      "amenities.privateBathroom": privateBathroomBool,
      "amenities.outdoorSpace": outdoorSpaceBool,
      "amenities.hasPet": hasPetBool
      // "address.state": selectedState
      // "rent.rentLength": rentLength
      // "human.gender.male": male,
      // "human.gender.female": female
    }).then(rooms => res.status(200).send(rooms));
  },

  getListingByID: (req, res) => {
    const { id } = req.params;

    Listing.find({ _id: id }).then(listing => {
      res.status(200).send(listing);
    });
  }
};
