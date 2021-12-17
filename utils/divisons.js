const Receiver = require('../models/ReceiverSchema')
const volunteer = require('../models/UserSchema')


const haversine = ('./haversine')
const kmeans = require('node-kmeans')

async function findClosestVolunteer(email){
    const receiver = await Receiver.findOne(receiverEmail)
    const address = receiver.address
    
    const volunteers = await Receiver.findAll({userType: UserType.Volunteer})
    const addresses = volunteers.map(volunteer => volunteer.address)
    const landmarks = addresses.map(address => { return { lat: address.lat, lon: address.lon } })

    const zipped = zip([volunteers, landmarks])

    const haversines = zipped.map(element => {
        return {
            volunteer: element[0], distance: haversine(
                address.lat,
                address.lon, element[1].lat, element[1].lon)
        }
    })

    haversines.sort((a, b) => a.distance - b.distance)
    return haversines[0].volunteer.email

}















module.exports

