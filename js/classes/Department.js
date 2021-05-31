export default class Department {
    //Class constructor for Department objects
    id;
    name;
    address;
    weekHours;
    weekendHours;
    phoneNumber;
    emailAddress;
    mapLocation;
    constructor(
        id,
        name,
        address,
        weekHours,
        weekendHours,
        phoneNumber,
        emailAddress,
        mapLocation
    ){
        this.id = id;
        this.name = name;
        this.address = address;
        this.weekHours = weekHours;
        this.weekendHours = weekendHours;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.mapLocation = mapLocation;
    }
}