import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Twilio } from "twilio";
const accountSid = functions.config().twilio.sid
const authToken  = functions.config().twilio.token
const client = new Twilio(accountSid, authToken);
const twilioNumber = '+44' //  Our twilio phone number

var serviceAccount = require("./lotto.json"); // link

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});

const db= admin.firestore()
let query = db.collection('users')


export const phonenumberauth = functions.firestore.document('users/{userId}').onUpdate(async(snap,context) => {

const dataBefore = snap.before.data()
const dataAfter = snap.after.data()
const phonenumber  = dataAfter.phonenumber
 if (dataBefore.phonenumber == dataAfter.phonenumber || dataBefore.Phonevalid == dataAfter.Phonevalid)  {
   return null ;
}
    if (!validE164) {
    throw new Error('number must be E164 format!');
  }
 const TwiilloCall =  twillio(phonenumber)
 // if true then add 

  if  (TwiilloCall == true) {
    let documentRef = db.collection('users').doc(`${context}`);  // figure out how to use context to add data 
    documentRef.set(phonenumber).then(res => {
      console.log(`Document written at `);
    });



    // change data 
  }

   // call function that sends twillo api 
 

// const valueafter
});




// });

//validate format of number
function validE164(num: string ) :any  {
  return /^\+?[1-9]\d{1,14}$/.test(num)
}


function twillio(phonenumber: string) :boolean  {

  const messagebody = {
    from: twilioNumber ,
    to: phonenumber,
    body: "You Have now received Twillo Sms please verify code. ",

  }
  client.messages.create(messagebody).then(message =>(
    console.log(message.sid))


  ).catch(err => console.log(err));
  return true;
}

// create a cloud functiton that determines the winner
interface Data {
  email: string; 
  phonenumber: string;
  phonevaild: boolean;
  


};
  // use this function when you want to get data from all documents in users collection
function queryUserData ()  :any{
  let query = db.collection('users')
  let users = [];
query.get().then(querySnapshot => {
  querySnapshot.forEach(documentSnapshot => {
  let   email = documentSnapshot.data().email ;
  let phonenumber = documentSnapshot.data().phonenumber;
  let phonevalid = documentSnapshot.data().phonevalid;
  let data = {email,phonenumber,phonevalid}
  users.push(data);
  });

});
return users;
  // returns an array of data queried 
  // use this function when you want to get data from all documents in users collection
}
function queryTicketData ()  :any{
  let query = db.collection('lottoTickets')
  let lottoTickets = [];
query.get().then(querySnapshot => {
  querySnapshot.forEach(documentSnapshot => {
  let   email = documentSnapshot.data().email ;
  let phonenumber = documentSnapshot.data().phonenumber;
  let token =  documentSnapshot.data().token;
  let data = {email,phonenumber,token}
  lottoTickets.push(data);
  });

});
return lottoTickets;
  // returns an array of data queried 
  // use this function when you want to get data from all documents in users collection
}
// Using modern Fisher–Yates shuffle
function randomisearray(TicketArray :string[]) :any {
  for (let i = TicketArray.length - 1; i > 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1))
    const currentCard = TicketArray[i]
    const cardToSwap = TicketArray[swapIndex]
    TicketArray[i] = cardToSwap
    TicketArray[swapIndex] = currentCard
  }
  return TicketArray
  // randomize values in the array
}

function winner (winner:boolean , prizenumber:number) :any {
  let TicketArray = [];
  let Winner = []
    TicketArray = queryTicketData ();
   const RandomizedArray =  randomisearray(TicketArray);
   Winner.push(RandomizedArray[0])
   return[Winner] ;




  //query all documents ticket holders 
  // query all  documents in the collection and grab id of ticket holders
  // randomise order of objects in array 
  // now randomly choose ticket holder object in array as winner
}


function prize1 (choice : boolean , prize: number) {
winner(choice, prize)

  // call this function for someone to win 1st prize

}

function prize2 (choice: boolean , prize: number) {
  winner (choice, prize)
  // call this function for winners of  2nd prize

}

function prize3 (choice: boolean , prize: number) {
  winner(choice,prize)

  // call this function for winners to win 3rd prize

}
