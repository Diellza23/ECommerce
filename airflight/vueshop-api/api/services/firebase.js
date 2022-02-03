import admin from 'firebase-admin';

import serviceAccount from "../../credentials/vue-projectuni-firebase-adminsdk-tsfp8-db2c999b4a.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;