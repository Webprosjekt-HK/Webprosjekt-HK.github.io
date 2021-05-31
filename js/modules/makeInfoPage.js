export default class makeInfoPage {
    deploy = (name, address, weekHours, weekendHours, phoneNumber, email, mapImage) => {
        //HTML-content to send to info section (parameters are contents deployed)
        let info = `
        <p class="title card-header">${name}</p>
        <p>${weekHours}</p>
        <p>${weekendHours}</p>
        <i class='bx bxs-phone bx-flip-horizontal' ></i>
        <span>Telefon: ${phoneNumber}</span></br>
        <i class='bx bxs-home bx-flip-horizontal' ></i>
        <span>Adresse: ${address}</snap></br>
        <i class='bx bxs-envelope bx-flip-horizontal' ></i>
        <a href="mailto:${email}">${email}</a>
        `;

        //image of map for the relevant resturant
        let map = `
        <img src="/images/locations/${mapImage}">
        `;

        //HTML section that info and map is deployed to
        let infoSection = `
        <div class="tile is-4 is-vertical is-parent">
                              <div class="tile is-child box card">
                                <div id="resturant-info"></div>
                              </div>
                              <div class="tile is-child box card">
                                <div id="map-image"></div>
                              </div>
                            </div>
                            <div class="tile is-parent">
                              <div class="is-child box card">
                                <p class="title card-header">Ansatte</p>
                                <div id="employees" class="columns is-multiline is-gapless employees-box"></div>
                              </div>
                            </div>
        `;

        //Sending all the HTML to the correct sections of document
        document.getElementById("main").innerHTML += infoSection;
        document.getElementById("resturant-info").innerHTML += info;
        document.getElementById("map-image").innerHTML += map;
    };
}