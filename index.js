const tokenString = document.getElementById("token");
const errorMessage = document.getElementById("error");
const message = document.getElementById("message");
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "AIzaSyD7mP4y3ByvRj1aB1R_pi0aSGLMGQDKBPk",
  authDomain: "fir-messaging-pwa.firebaseapp.com",
  projectId: "fir-messaging-pwa",
  storageBucket: "fir-messaging-pwa.appspot.com",
  messagingSenderId: "78003508579",
  appId: "1:78003508579:web:47f02eb1417acf8d322f56",
  measurementId: "G-W22NJNGYE9"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(() => {
    message.innerHTML = "Notifications allowed";
    return messaging.getToken();
  })
  .then(token => {
    tokenString.innerHTML = "Token Is : " + token;
    //subscribeTokenToTopic(token, "allUsers");
  })
  .catch(err => {
    errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
    console.log("Unable to get permission to notify", err);
  });

messaging.onMessage(payload => {
  console.log("Message received. ", payload);
  const { title, ...options } = payload.notification;
});

function subscribeTokenToTopic(token, topic) {
  fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic, {
    method: "POST",
    headers: new Headers({
      Authorization: "AAAAEilfFWM:APA91bHyJmjam1nXNzMxXiEt1JuY-hnkwA84jOIjGYu_Xqz0zxX4dtvymnlbM5QgEh534IZHZCtqBvbMH3YM8wJuqPs3qwzIpRDpmZ7PrFG1Ofluodm0CkKvwqJWDGvDy4CGtdxvWdxw"
    })
  })
    .then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw "Error subscribing to  the following topic: " +
          response.status +
          " - " +
          response.text();
      } else {
        console.log('Successfully subscribed to "' + topic + '"');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

  