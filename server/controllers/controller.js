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
      male,
      female,
      email,
      phone,
      dob,
      about,
      street,
      city,
      state,
      zip,
      lng,
      lat,
      address,
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
      pets,
      image
    } = req.body;

    const newProfile = new Profile({
      _id: userID,
      name,
      email,
      phone,
      birthday: dob,
      interestsDescription: description,
      aboutMe: about,
      address: {
        street,
        city,
        state,
        zip,
        fullAddress: address,
        lat,
        lng
      },
      gender: {
        male,
        female
      },
      title,
      companyName: company,
      profilePic: image,
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
      console.log(profile);
      res.status(200).send(profile);
    });
  },

  getProfileByAuthId: (req, res) => {
    const { authID } = req.params;
    // console.log(authID);

    Profile.findOne({ _id: authID }).then(profile => {
      console.log(profile);
      res.status(200).send(profile);
    });
  },

  getListingById: (req, res) => {
    const { id } = req.params;

    Listing.findOne({ _id: id }).then(listing => {
      console.log(listing);
      res.status(200).send(listing);
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
      city,
      state,
      zip,
      lat,
      lng,
      address,
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
      images,
      userID,
      description
    } = req.body;

    // let smokeBool = smoke === "true";
    // let cleanBool = clean === "true";
    // let guestsBool = guests === "true";
    // let petsBool = pets === "true";
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
    let maleBool = male === "true";
    let femaleBool = female === "true";

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
          male: maleBool,
          female: femaleBool
        }
      },
      address: {
        street,
        city,
        state,
        zip: Number(zip),
        fullAddress: address,
        lat: Number(lat),
        lng: Number(lng)
      },
      rent: {
        monthlyCost: Number(monthlyCost),
        depositCost: Number(depositCost),
        moveInDate,
        rentLength: Number(rentLength)
      },
      amenities: {
        washer: washerBool,
        wifi: wifiBool,
        utilities: utilitiesBool,
        furnished: furnishedBool,
        elevator: elevatorBool,
        doorman: doormanBool,
        airConditioning: airConditioningBool,
        heating: heatingBool,
        gym: gymBool,
        tv: tvBool,
        privateBathroom: privateBathroomBool,
        outdoorSpace: outdoorSpaceBool,
        hasPet: hasPetBool
      },
      images,
      description
    });

    console.log(req.body);

    newListing.save().then(response => res.status(200).send(response));
  },

  getListingById: (req, res) => {
    const { id } = req.params;

    Listing.findOne({ _id: id }).then(listing => {
      res.status(200).send(listing);
    });
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
      female,
      monthlyCost
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
    let maleBool = male === "true";
    let femaleBool = female === "true";

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
      "amenities.hasPet": hasPetBool,
      "human.gender.male": maleBool,
      "human.gender.female": femaleBool,
      "address.state": { $regex: selectedState, $options: "i" },
      "rent.rentLength": { $gte: Number(rentLength) },
      "rent.monthlyCost": { $lte: Number(monthlyCost) }
    }).then(rooms => res.status(200).send(rooms));
  },
  getListingById: (req, res) => {
    const { id } = req.params;
    Listing.findOne({ _id: id }).then(listing => {
      res.status(200).send(listing);
    });
  },
  getListingByState: (req, res) => {
    const { adress } = req.params;

    Listing.find({ "adress.state": adress }).then(listing => {
      res.status(200).send(listing);
    });
  },

  getListingByAuthId: (req, res) => {
    const { id } = req.params;

    Listing.find({ userID: id }).then(listing => res.status(200).send(listing));
  }
};
