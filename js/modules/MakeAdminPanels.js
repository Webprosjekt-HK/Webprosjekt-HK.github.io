import DepartmentCollection from "/js/classes/DepartmentCollection.js";

export default class MakeAdminPanels {
    constructor(departmentsWithAdmin) {
        this.departmentsWithAdmin = departmentsWithAdmin;
    }

    getPanel = () => {
        const containerElement = document.createElement("div");
        const departmentCollection = new DepartmentCollection();
        const checkBoxes = departmentCollection
            .fetchDepartments()
            .map((e) => {
                return (
                    '<div class="panel-block department-registration"><div class="control"><label class="checkbox" for="' +
                    e.id +
                    '"> Ansatt ved: ' +
                    e.name +
                    '</label><input class="checkbox" type="checkbox" name="' +
                    e.id +
                    '" value="' +
                    e.id +
                    '"></div><div class="control"><p>Er leder?</p><input class="radio is-leader" type="radio" value="true" name="' +
                    e.id +
                    '" ><label for="' +
                    e.id +
                    '"> Ja </label>' +
                    '</label><input class="radio" checked type="radio" value="false" name="' +
                    e.id +
                    '"><label for="' +
                    e.id +
                    '"> Nei </label></div></div>'
                );
            })
            .join(" ");

        containerElement.innerHTML = ` 
        <div class="panel">
            <p class="panel-heading">
                Legg til ansatt
            </p>
            <div class="panel-block">
                <p class="is-danger" id="status-msg-admin"></p>
            </div>
            <div class="panel-block">
                <div class="control">
                    <input
                        required
                        id="add-first-name"
                        class="input is-focuesed first-name"
                        type="text"
                        placeholder="Fornavn"
                    >
                </div>
            </div>
            <div class="panel-block">
                <div class="control">
                    <input
                        required
                        id="add-last-name"
                        class="input last-name"
                        type="text"
                        placeholder="etternavn"
                    >
                </div>
            </div>
            <div class="panel-block">
                <div class="control">
                    <input
                        required
                        id="add-username"
                        class="input add-username"
                        type="text"
                        placeholder="brukernavn/epost"
                    >
                </div>
            </div>      
            <div class="panel-block">
                <div class="control">
                    <input
                        required
                        id="add-password"
                        class="input"
                        type="password"
                        placeholder="Passord"
                    >
                </div>
            </div>                  
            <div class="panel-block">
                <div class="control">
                    <input
                        required
                        id="add-role"
                        class="input add-role"
                        type="text"
                        placeholder="Rolle"
                    >
                </div>
            </div>    
            <div class="panel-block">
                <div class="control">
                    <input
                        required
                        id="add-phone"
                        class="input"
                        type="text"
                        placeholder="telefonnummer"
                    >
                </div>
            </div>                    
            <div class="panel-block">
                <div class="control">
                    <input
                        required
                        id="add-profile-picture"
                        class="input profile-picture"
                        type="text"
                        placeholder="profilbilde"
                    >
                </div>
            </div>
            <div class="panel-block">
                <div class="control">
                    <input
                        required
                        id="add-birth-date"
                        class="input birth-date"
                        type="date"
                        placeholder="MM-DD-YYYY"
                    />
                </div>
            </div>
            <div class="panel-block">
                <div class="control">
                    <textarea
                        required
                        id="add-address"
                        class="input address"
                        type="text"
                        rows="5"
                        placeholder="adresse"
                    ></textarea>
                </div>
            </div>
            ${checkBoxes}
            <div class="panel-block"><button class="button" id="admin-save-btn">Lagre</button> </div>
        </div>`;
        return containerElement;
    };
}
