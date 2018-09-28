import {Component, ElementRef, OnInit,
  AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import {HttpClientService} from '../../services/http-client.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Params} from '@angular/router';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/img/profile_placeholder.png';


@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit, AfterViewInit {

  pageToDisplay: string;
  submitSet: boolean;
  submitOption: string;
  _htmlMarkup: SafeHtml;
  hasScriptSet: boolean;
  hasHtmlSet: boolean;

  user: Observable<firebase.User>;
  currentUser: firebase.User;
  messages: Observable<any>;
  messagesReplies: Observable<any>;
  profilePicStyles: {};
  topics = '';
  value = '';
  uniqueIdSet: string;
  list$: Observable<any>;
  referance = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  constructor(private httpClient: HttpClientService, public db: AngularFireDatabase, private af: AngularFireDatabase, public afAuth: AngularFireAuth, private sanitizer: DomSanitizer, private elementRef: ElementRef) {
    this.user = afAuth.authState;
    this.uniqueIdSet = '';
    this.submitOption = 'comments';
    this.submitSet = false;
    this.user.subscribe((user: firebase.User) => {
      this.currentUser = user;

      if (user) { // User is signed in!
        this.profilePicStyles = {
          'background-image':  `url(${this.currentUser.photoURL})`
        };

        // We load currently existing chat messages.
        this.messages = this.db.list<any>('/messages', ref => ref.limitToLast(12)).valueChanges();
        // console.log(this.messages);
        this.messagesReplies = this.db.list<any>('/messagesReplies', ref => ref.limitToLast(5)).valueChanges();

        console.log(Object.keys(this.messages))
        this.messages.subscribe((messages) => {
          // Calculate list of recently discussed topics
          const topicsMap = {};
          const topics = [];
          let hasEntities = false;
          messages.forEach((message) => {
            if (message.entities) {
              for (let entity of message.entities) {
                if (!topicsMap.hasOwnProperty(entity.name)) {
                  topicsMap[entity.name] = 0
                }
                topicsMap[entity.name] += entity.salience;
                hasEntities = true;
              }
            }
          });
          if (hasEntities) {
            for (let name in topicsMap) {
              topics.push({ name, score: topicsMap[name] });
            }
            topics.sort((a, b) => b.score - a.score);
            this.topics = topics.map((topic) => topic.name).join(', ');
          }

          // Make sure new message scroll into view
          setTimeout(() => {
            const messageList = document.getElementById('messages');
            messageList.scrollTop = messageList.scrollHeight;
            document.getElementById('message').focus();
          }, 500);
        });

        // We save the Firebase Messaging Device token and enable notifications.
        // this.saveMessagingDeviceToken();
      } else { // User is signed out!
        this.profilePicStyles = {
          'background-image':  PROFILE_PLACEHOLDER_IMAGE_URL
        };
        this.topics = '';
      }
    });
  }

  ngOnInit() {
    this.httpClient.get('dataStore/observatoryContents/help-faqs.json').subscribe((helpPage) => {
      if (helpPage) {
              this.pageToDisplay = helpPage['pageContent'];
              try {
                this._htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(
                  this.pageToDisplay
                );
                this.hasHtmlSet = true;
              } catch (e) {
                console.log(JSON.stringify(e));
              }
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // TODO: Refactor into text message form component
  update(value: string) {
    this.value = value;
  }

  // Returns true if user is signed-in. Otherwise false and displays a message.
  checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    if (this.currentUser) {
      return true;
    }

    return false;
  }

  // TODO: Refactor into text message form component
  saveMessage(event: any, el: HTMLInputElement) {
    event.preventDefault();

    if (this.value && this.checkSignedInWithMessage()) {
      // Add a new message entry to the Firebase Database.
      const messages = this.db.list('/messages');
      let uniqueId = '';
      for (let i = 0; i < 10; i++) {
        uniqueId += this.referance.charAt(Math.floor(Math.random() * this.referance.length));
      }
      messages.push({
        name: this.currentUser.displayName,
        text: this.value,
        uniqueId: uniqueId,
        photoUrl: this.currentUser.photoURL || PROFILE_PLACEHOLDER_IMAGE_URL
      }).then(() => {
        // Clear message text field and SEND button state.
        el.value = '';
      }, (err) => {
        console.error(err);
      });
    }
  }

  // TODO: Refactor into image message form component
  saveImageMessage(event: any) {
    event.preventDefault();
    const file = event.target.files[0];

    // Clear the selection in the file picker input.
    const imageForm = <HTMLFormElement>document.getElementById('image-form');
    imageForm.reset();

    // Check if the file is an image.
    if (!file.type.match('image.*')) {
      return;
    }

    // Check if the user is signed-in
    if (this.checkSignedInWithMessage()) {

      // We add a message with a loading icon that will get updated with the shared image.
      const messages = this.db.list('/messages');
      messages.push({
        name: this.currentUser.displayName,
        imageUrl: LOADING_IMAGE_URL,
        photoUrl: this.currentUser.photoURL || PROFILE_PLACEHOLDER_IMAGE_URL
      }).then((data) => {
        // Upload the image to Cloud Storage.
        const filePath = `${this.currentUser.uid}/${data.key}/${file.name}`;
        console.log('filePath', filePath)
        return firebase.storage().ref(filePath).put(file)
          .then((snapshot) => {
            // Get the file's Storage URI and update the chat message placeholder.
            const fullPath = snapshot.metadata.fullPath;
            const imageUrl = firebase.storage().ref(fullPath).toString();
            return firebase.storage().refFromURL(imageUrl).getMetadata();
          }).then((metadata) => {
            // TODO: Instead of saving the download URL, save the GCS URI and
            //       dynamically load the download URL when displaying the image
            //       message.
            return data.update({
              imageUrl: metadata.downloadURLs[0]
            });
          });
      }).then(console.log, (err) => {
        console.error(err);
      });
    }
  }

  // TODO: Refactor into image message form component
  onImageClick(event: any) {
    event.preventDefault();
    document.getElementById('mediaCapture').click();
  }

  // Saves the messaging device token to the datastore.
  saveMessagingDeviceToken() {
    return firebase.messaging().getToken()
      .then((currentToken) => {
        if (currentToken) {
          console.log('Got FCM device token:', currentToken);
          // Save the Device Token to the datastore.
          firebase.database()
            .ref('/fcmTokens')
            .child(currentToken)
            .set(this.currentUser.uid);
        } else {
          // Need to request permissions to show notifications.
          return this.requestNotificationsPermissions();
        }
      }).catch((err) => {
        console.error(err);
      });
  }

  // Requests permissions to show notifications.
  requestNotificationsPermissions() {
    console.log('Requesting notifications permission...');
    return firebase.messaging().requestPermission()
    // Notification permission granted.
      .then(() => this.saveMessagingDeviceToken())
      .catch((err) => {
        console.error(err);
      });
  }

  replyTheMessage(event, key, el: HTMLInputElement) {
    const messagesReplies = this.db.list('/messagesReplies');
    messagesReplies.push({
      messageKey: key,
      name: this.currentUser.displayName,
      replyMessage: this.value,
    }).then(() => {
      // Clear message text field and SEND button state.
      el.value = '';
    }, (err) => {
      console.error(err);
    });
  }

  submitQuestion(e, option, el: HTMLInputElement) {

    const qns = this.db.list('/' + option);
    let qnUniqueId = '';
    for (let i = 0; i < 10; i++) {
      qnUniqueId += this.referance.charAt(Math.floor(Math.random() * this.referance.length));
    }
    qns.push({
      name: this.currentUser.displayName,
      question: this.value,
      uniqueId: qnUniqueId,
      photoUrl: this.currentUser.photoURL || PROFILE_PLACEHOLDER_IMAGE_URL
    }).then(() => {
      // Clear message text field and SEND button state.
      el.value = '';
    }, (err) => {
      console.error(err);
    });
  }

  setSubmit(bol) {
    this.submitSet = bol;
  }

  setTheUniqueId(id) {
    this.uniqueIdSet = id;
  }

  OnDestroy() {
  }

  ngAfterViewInit() {
    this.setScriptsOnHtmlContent(
      this.getScriptsContents(this.pageToDisplay)
    );
    this.setStylesOnHtmlContent(
      this.getStylesContents(this.pageToDisplay)
    );
  }

  getStylesContents(html) {
    const matchedScriptArray = html.match(
      /<style[^>]*>([\w|\W]*)<\/style>/im
    );
    return matchedScriptArray && matchedScriptArray.length > 0
      ? matchedScriptArray[0].replace(/(<([^>]+)>)/gi, ':separator:').split(':separator:').filter(content => content.length > 0)
      : [];
  }

  getScriptsContents(html) {
    const matchedScriptArray = html.match(
      /<script[^>]*>([\w|\W]*)<\/script>/im
    );
    if (matchedScriptArray.length > 1) {
      console.log('html test', matchedScriptArray);
      return matchedScriptArray;
    } else {
      return matchedScriptArray;
    }
  }

  setStylesOnHtmlContent(stylesContentsArray) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = stylesContentsArray.join('');
    this.elementRef.nativeElement.appendChild(style);
    this.hasScriptSet = true;
  }

  setScriptsOnHtmlContent(scriptsContentsArray) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    // script.innerHTML = scriptsContentsArray[0];
    this.elementRef.nativeElement.appendChild(scriptsContentsArray[0]);
    this.hasScriptSet = true;
  }

  getScriptUrl(scriptsContents) {
    let url = '';
    if (scriptsContents && scriptsContents.split('<script').length > 0) {
      scriptsContents.split('<script').forEach((scriptsContent: any) => {
        if (scriptsContent !== '') {
          url = scriptsContent.split('src=')[1].split('>')[0];
        }
      });
    }
    return url;
  }
}
