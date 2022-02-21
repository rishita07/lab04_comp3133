const mongoose = require('mongoose');

const userData = require('../UserData.json')





var validateEmail = function (email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

var validateCity = function (city) {
    var validations = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
    return validations.test(city)
};


function validateHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}



const UserSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        lowercase: true
    },

    username: {
        type: String,
        required: [true, 'Please enter username'],
        trim: true,
        lowercase: true,
        minlength: 4,

    },

    email: {
        type: String,
        required: [true, 'Please enter email'],
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please enter valid email address...'],
    },


    address: {
        street: {
            type: String,
            required: [true, 'Please enter street'],
            trim: true,
            lowercase: true
        },
        suite: {
            type: String,
            required: [true, 'Please enter suite'],
            trim: true,
            lowercase: true
        },
        city: {
            type: String,
            required: [true, 'Please enter city'],
            trim: true,
            lowercase: true,
            validate: [validateCity, "Please enter alphabets and space only"]
        },

        zipcode: {

            type: String,
            required: [true, 'Please enter zipcode'],
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /\d{5}-\d{4}/.test(v)
                },
                message: props => `${props.value} opps, it is not valid`
            }
        },
        geo: {
            lat: {
                type: Number,
                rrequired: [true, 'Please enter lat'],
                trim: true,
                lowercase: true
            },
            lng: {
                type: Number,
                required: [true, 'Please enter lng'],
                trim: true,
                lowercase: true
            }
        }

    },


    phone: {
        type: String,
        required: [true, 'Please enter phone'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },

    },

    website: {
        type: String,
        required: [true, 'Please enter website'],
        validate: [validateHttpUrl, 'Please enter valid website address'],
        trim: true,
        lowercase: true
    },
    company: {
        name: {
            type: String,
            required: [true, 'Please enter company name'],
            trim: true,
            lowercase: true

        },
        catchPhrase: {
            type: String,
            required: [true, 'Please enter catch phrase'],
            trim: true,
            lowercase: true
        },
        bs: {
            type: String,
            required: [true, 'Please enter bs'],
            trim: true,
            lowercase: true
        }
    }



});




const User = mongoose.model("User", UserSchema);
module.exports = User;



User.insertMany(userData);

