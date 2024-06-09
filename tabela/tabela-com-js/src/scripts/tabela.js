

"use strict";

let 
   _ = ( ...v ) => console.log( ...v )
   ,
   $ = v => document.querySelector( v )
   ,
   $$ = v => document.querySelectorAll( v )
;

const 
   usuários = []
;

function cadastrarUsuário() {
   let 
      inputs = []
   ;
   //_( "1: \n", inputs );
   inputs = [ 
      ...$$( "form input[type='number']" ),
      ...$$( "form input[type='text']" ), 
      ...$$( "form input[type='email']" ),
   ];
   /*_( "2: \n", inputs );
   inputs.forEach( i => _( "i: ", i.value = "13" ) );*/
   
   
   function FormValidation() {
      const validInputs = [];
      let res = false;
      
      inputs.forEach( i => {
         if( i.value === "" ) {
            if( 
               $( `#label_${ i.getAttribute( 'id' ) } > t > msg` )
            ) {
               $( `#label_${ i.getAttribute( 'id' ) } > t > msg` ).innerHTML = "";
               $( `#label_${ i.getAttribute( 'id' ) } > t > msg` ).innerHTML += "<content>oi</content>";
            } else {
               $( `#label_${ i.getAttribute( 'id' ) } > t` ).innerHTML += "<msg><content>oi</content></msg>";
            }
         } else {
            validInputs.push( i );
            if( 
               $( `#label_${ i.getAttribute( 'id' ) } > t > msg` )
            ) {
               $( `#label_${ i.getAttribute( 'id' ) } > t > msg` ).innerHTML = "";
            }
         }
      } );
      if( validInputs.length == inputs.length ) {
         _( `validInputs: ${ validInputs.length }`, `\ninputs: ${ inputs.length }` );
         res = true;
      } else {
         _( `validInputs: ${ validInputs.length }`, `\ninputs: ${ inputs.length }` );
      }
      _( "return res: ", res );
      return( res );
   }
   
   function ClearForm() {
      inputs.forEach( i => {
         i.value = "";
      } );
   }
   
   function CreateUser() {
      const user = {};
      
      inputs.forEach( i => {
         eval( `user.${ i.name } = "${ i.value }"` );
      } );
      
      _( user );
      usuários.push( user );
      ClearForm();
      UpdateTable();
   }
   
   function UpdateTable() {
      ClearTable();
      usuários.forEach( usuário => {
         body_table.innerHTML += `
            <tr>
               <td colspan="1">${ usuário.id }</td>
               <td colspan="2">${ usuário.primeiroNome }</td>
               <td colspan="2">${ usuário.sobrenome }</td>
               <td colspan="2">${ usuário.email }</td>
               <td colspan="2">${ usuário.senha }</td>
            </tr>
         `;
      } );
   }
   
   form.addEventListener(
      "submit",
      () => {
         event.preventDefault();
         
         let passFormValidation = FormValidation();
         
         if( passFormValidation ) {
            _( "passFormValidation: ok" );
            CreateUser();
            _( "usuários: \n", usuários );
         } else {
            _( "passFormValidation: failed" );
         }
         
      }
   );
}

function ClearTable() {
   body_table.innerHTML = "";
}

function callback() {
   cadastrarUsuário();
   ClearTable();
}

window.addEventListener(
   "load",
   callback
);