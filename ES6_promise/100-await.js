import { uploadPhoto, createUser } from './utils.js';

export default async function asyncUploadUser() {
  try {
    const photo = await uploadPhoto();
    const user = await createUser();
    return { photo, user };
  } catch (error) {
    return { photo: null, user: null };
  }
}

// try {
//     // Using Array Destructuring
//     const [photo, user] = await Promise.all([uploadPhoto(), createUser()]);
//     return { photo, user };
//   } catch (error) {
//     return { photo: null, user: null };
//   }
