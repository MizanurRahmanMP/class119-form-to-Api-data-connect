

// Get element start

const skills = document.querySelector('#skill_list');
const devs_add_form = document.querySelector('#devs_add_form');
const devs_data_list = document.querySelector('#devs_data_list');
const devs_edit_form = document.querySelector('#devs_edit_form');
const devs_edit_btn = document.querySelectorAll('.devs_edit_btn');


// Loade skills api area start

const loadSkills = () => {

    axios.get( 'http://localhost:5050/devs' ).then(data =>{

        let skills_list = '';
        data.data.map(devs => {
    
            skills_list += `
            <option value="${ devs.skill }"> ${ devs.skill } </option>
            
            `;
        });
    
        skills.insertAdjacentHTML( 'beforeend',skills_list );

    })
};

loadSkills();

/**
 * Loads developers
 */
 getDevelopers();
function getDevelopers () {
    
    axios.get( 'http://localhost:5050/devs' ).then( res=> {

    let davs_data = '';
    res.data.map(( dev, index ) =>{

        davs_data += `
        
        <tr>
            <td> ${ index + 1 } </td>
            <td> ${ dev.name } </td>
            <td> ${ dev.email } </td>
            <td> ${ dev.cell } </td>
            <td><img style="object-fit:cover; width:50px; height:50px" src="${ dev.photo }" alt=""></td>
            <td>
                <a data-bs-toggle="modal" class="btn btn-primary btn-sm" href="#modal_view"><i class="fa fa-eye"></i></a>
                <a data-bs-toggle="modal" class="btn btn-warning" onclick="editDeveloper(${ dev.id })" href="#modal_edit"><i class="fa fa-edit"></i></a>
                <a data-bs-toggle="modal" class="btn btn-danger btn-sm" href="#modal_delete"><i class="fa fa-trash"></i></a>
            </td>
        </tr>

        `;
    } )

    devs_data_list.innerHTML = davs_data

    } )
};



/**
 * Add new davs
 */

 devs_add_form.addEventListener('submit', function(e){

    e.preventDefault();

    let name       = this.querySelector('#name');
    let email      = this.querySelector('#email');
    let cell       = this.querySelector('#cell');
    let photo      = this.querySelector('#photo');
    let skill_list = this.querySelector('#skill_list');

    
    if( name.value == '' || email.value == '' || cell.value == '' || photo.value == '' || skill_list.value == '' ){
        alert( 'All filds are required !' )
    }else{


        axios.post( 'http://localhost:5050/devs', {

            id            : '',
            name          : name.value,
            email         : email.value,
            cell          : cell.value,
            photo         : photo.value,
            skill_listId  : skill_list.value

        }).then( res => {

        name.value        = '';
        email.value       = '';
        cell.value        = '';
        photo.value       = '';
        skill_list.value  = '';

        getDevelopers();

        });

        

        
    };

    

 });

 
/**
 * Developer data edit
 */
 function editDeveloper( id ){

    let name    = document.getElementById('ename');
    let email   = document.getElementById('eemail');
    let cell    = document.getElementById('ecell');
    let photo   = document.getElementById('ephoto');
    let skill   = document.getElementById('eskill_list');
    let preview = document.getElementById('epreview');
    let edit_id = document.getElementById('edit_id');
    
    axios.get( `http://localhost:5050/devs/${ id }` ).then( res => {

    name.value      = res.data.name;
    email.value     = res.data.email;
    cell.value      = res.data.cell;
    photo.value     = res.data.photo;
    skill.value     = res.data.skillId;
    edit_id.value   = id;
    preview.setAttribute( 'src', res.data.photo )

    })

 };

 devs_edit_form.addEventListener( 'submit', function(e) {
    e.preventDefault();

    let name       = this.querySelector('#ename');
    let email      = this.querySelector('#eemail');
    let cell       = this.querySelector('#ecell');
    let photo      = this.querySelector('#ephoto');
    let skill_list = this.querySelector('#eskill_list');
    let edit_id    = this.querySelector('#edit_id');

    axios.patch(`http://localhost:5050/devs/${ edit_id.value }`, {

        id            : '',
        name          : name.value,
        email         : email.value,
        cell          : cell.value,
        photo         : photo.value,
        skill_listID  : skill_list.value

    }).then( res => {

        name.value        = '';
        email.value       = '';
        cell.value        = '';
        photo.value       = '';
        skill_list.value  = '';

        getDevelopers();

    });

 })


