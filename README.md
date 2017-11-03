# README

Slic: [Live site](http://slic.herokuapp.com/)

Slic is a single-page messaging app modeled after Slack. It is built on Rails back-end and React/Redux front-end and utilizes RESTful architecture. It employs Pusher to establish a live connection.

### Features

1. Users

2. Channels and Invites

3. Messages

4. Private and Group Messaging

5. Channel Details Panel

*Note: gifs will be added once notifications are implemented*

#### Users

Users can sign up for Slic or log in via the front page. Slic will automatically redirect users to the login page when the user attempts to view a channel without being logged in. A guest login is conveniently provided for quick access to Slic's features.

#### Channels and Invites

Users can create channels and invite users to channels. Users can also view and join non-private channels. Invited users will have the channels added to their sidebar automatically. Users can create private channels, which can be joined only through invites and are not visible to others.



#### Messages

Slic enables its users to send and receive messages in real-time via Pusher.

#### Direct and Group Messaging

Slic allows its users to create and browse through direct messages and group messages with select people. A search bar enables quick lookup of users.

#### Channel Details Panel

A details panel shows information depending on the communication type. A channel shows its name, description, and users; a direct message shows the recipient; and a group message shows its members.

#### Features to Implement

* Notifications
* Editing a user
* Editing a channel
