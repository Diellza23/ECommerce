const functions = require("firebase-functions");

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

// const stripe = require("stripe")("sk_test_l0inZI9YYmU0R1M1izdHwk4000uXCMz6sG")

const stripe = require('stripe')('sk_test_51KT96rDvrPmUXctBHblfU8kKdIVjoKgeRX0SId8M1jt57PQ4CUTuLUdEmxlXScutTy0denPQ8sOCi1E3IFmuf1rE00haFesDE8');



exports.addUserRole = functions.auth.user().onCreate(async (user) => {
    try{
        if(user.email.includes('ubt-uni.net')){
            const userClaims = {admin: true};

            await admin.auth().setCustomUserClaims(user.uid, userClaims);

            db.collection('roles').doc(user.uid).set({
                email: user.email,
                role:userClaims
            })
        }
    }
    catch(err){
        console.log(err);
    }
})

// exports.CheckoutSession = functions.https.onRequest((request, response) => {
//     const session = await stripe.checkout.sessions.create({
//     success_url: 'https://example.com/success',
//     cancel_url: 'https://example.com/cancel',
//     line_items: [
//         {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
//     ],
//     mode: 'payment',
    
//     });
// })