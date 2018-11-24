// import React from 'react';
// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';




// const chunk = (str) => {
//     return str.replace(/ /g, '').replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
// }

// storiesOf('Button', module)
//   .add('with some emoji', () => {
//       const MyForm = isForm((form) => (
//         <div>
//             <TextInput name="firstName" { ...form }  />
//             <TextInput name="lastName" { ...form }  />
//             <TextInput name="age" { ...form } validator={ (value) => value.length <= 5 } />
//             <TextInput name="iban" { ...form } reducer={ chunk } />  

//             <TextInput name="hobbies" index={0} initialValue="sepp" { ...form }  />
//             <TextInput name="hobbies" index={1} { ...form }  />
//             <TextInput name="hobbies" index={2} { ...form }  />
//         </div>
//       ));

//       return <MyForm />
//   });