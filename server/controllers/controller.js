const Profile = require("../Models/Profile");
const Listing = require("../Models/Listing");
const Chat = require("../Models/Chat");
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
      },
      wishList: []
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
    // console.log(req.file);
    let imageLink = "";

    s3.createBucket({ Bucket: myBucket }, function(err, data) {
      if (err) {
        // console.log(err);
      } else {
        params = {
          Bucket: myBucket,
          Key: `${myKey}/${req.file.filename}`,
          Body: req.file.data,
          ContentType: req.file.mimetype,
          ACL: "public-read"
        };

        // console.log(req.file);

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
    const {
      smoke,
      guests,
      pets,
      clean,
      selectedState,
      organized,
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
    } = req.query;

    let smokeBool = smoke === "true";
    let guestsBool = guests === "true";
    let petsBool = pets === "true";
    let cleanBool = clean === "true";
    let organizedBool = organized === "true";
    let healthyBool = healthy === "true";
    let professionalBool = professional === "true";
    let studentBool = student === "true";
    let earlyBirdBool = earlyBird === "true";
    let nightOwlBool = nightOwl === "true";
    let fitnessEnthusiastBool = fitnessEnthusiast === "true";
    let creativeBool = creative === "true";
    let bookwormBool = bookworm === "true";
    let foodieBool = foodie === "true";
    let partyAnimalBool = partyAnimal === "true";
    let veganBool = vegan === "true";
    let introvertedBool = introverted === "true";

    Profile.find({
      "prefs.smoke": smokeBool,
      "prefs.guests": guestsBool,
      "prefs.pets": petsBool,
      "prefs.clean": cleanBool,
      "traits.organized": organizedBool,
      "traits.healthy": healthyBool,
      "traits.professional": professionalBool,
      "traits.student": studentBool,
      "traits.earlyBird": earlyBirdBool,
      "traits.nightOwl": nightOwlBool,
      "traits.fitnessEnthusiast": fitnessEnthusiastBool,
      "traits.creative": creativeBool,
      "traits.bookworm": bookwormBool,
      "traits.foodie": foodieBool,
      "traits.partyAnimal": partyAnimalBool,
      "traits.vegan": veganBool,
      "traits.introverted": introvertedBool,
      "address.state": { $regex: selectedState, $options: "i" }
    }).then(response => res.status(200).send(response));
  },

  getProfilesByName: (req, res) => {
    const { search } = req.query;

    Profile.find({ name: { $regex: search, $options: "i" } }).then(people =>
      res.status(200).send(people)
    );
  },

  getProfileById: (req, res) => {
    const { id } = req.params;

    Profile.findOne({ _id: id }).then(profile => {
      // console.log(profile);
      res.status(200).send(profile);
    });
  },

  getProfileByAuthId: (req, res) => {
    const { authID } = req.params;
    // console.log(authID);

    Profile.findOne({ _id: authID }).then(profile => {
      // console.log(profile);
      res.status(200).send(profile);
    });
  },

  getListingsById: (req, res) => {
    const { id } = req.params;

    Listing.find({ userID: id }).then(listings => {
      // console.log(listing);
      res.status(200).send(listings);
    });
  },

  getListingById: (req, res) => {
    const { id } = req.params;

    Listing.findOne({ _id: id }).then(listing => {
      res.status(200).send(listing);
    });
  },

  deleteListingById: (req, res) => {
    const { id } = req.params;

    Listing.deleteOne({ _id: id }).then(() => res.status(200).send());
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
      pets,
      clean,
      guests,
      smoke,
      images,
      userID,
      description
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
      prefs: {
        smoke,
        clean,
        guests,
        pets
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
        outdoorSpace
      },
      images,
      description
    });

    newListing.save().then(response => res.status(200).send(response));
  },
  getListingByState: (req, res) => {
    const {
      selectedState
      // selectedCity
    } = req.query;
    Listing.find({
      "address.state": { $regex: selectedState, $options: "i" }
      // "address.city": { $regex: selectedCity, $options: "i" }
    }).then(listing => {
      res.status(200).send(listing);
    });
  },
  getListingByCity: (req, res) => {
    const { selectedCity } = req.query;
    Listing.find({
      "address.city": { $regex: selectedCity, $options: "i" }
    }).then(listing => {
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
      "human.gender.male": maleBool,
      "human.gender.female": femaleBool,
      "address.state": { $regex: selectedState, $options: "i" },
      "rent.rentLength": { $gte: Number(rentLength) },
      "rent.monthlyCost": { $lte: Number(monthlyCost) }
    }).then(rooms => res.status(200).send(rooms));
  },

  getListingByAuthId: (req, res) => {
    const { id } = req.params;

    Listing.find({ userID: id }).then(listing => res.status(200).send(listing));
  },

  addToWishList: (req, res) => {
    const {
      id,
      userID,
      loggedInUser,
      monthlyCost,
      city,
      state,
      moveInDate,
      rentLength,
      image
    } = req.body;

    Profile.update(
      { _id: loggedInUser },
      { $push: { wishList: req.body } }
    ).then(response => console.log(response));
  },

  getWishList: (req, res) => {
    const { id } = req.params;

    Profile.findOne({ _id: id }).then(profile => res.status(200).send(profile));
  },
  // SOCKET.IO
  getChats: (req, res) => {
    const { id } = req.params;

    Chat.find({ _id: id }).then(chats => res.status(200).send(chats[0]));
  },

  addChat: (req, res) => {
    const { chatIdObj, name, messages, users, typingUsers } = req.body;
    const newChat = new Chat({
      _id: chatIdObj,
      name,
      messages,
      users,
      typingUsers
    });
    newChat
      .save()
      .then(response => {
        res.status(200).send(newChat);
      })
      .catch(err => console.log("Can't add chat " + err));
  },

  addMessageToChat: (req, res) => {
    const { id } = req.body;
    const newMessages = req.body.chatArray[0].messages;
    console.log("messages ------ ", newMessages);

    Chat.findById(id, (err, chat) => {
      chat.set({ "chats.0.messages": newMessages });
      chat.save((err, updatedChat) => {
        // console.log(updatedChat);
      });
    });
  }
};
