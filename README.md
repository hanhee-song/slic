# README

Slic: [Live site](http://www.slic.live/)

Slic is a single-page messaging app modeled after Slack. It is built on Rails back-end and React/Redux front-end and utilizes RESTful architecture. It employs Pusher to establish a live connection.

### Features

1. Users

2. Channels and Invites

3. Messages

4. Private and Group Messaging

#### Users

Users can sign up for Slic or log in via the front page. Slic will automatically redirect users to the login page when the user attempts to view a channel without being logged in. A guest login is conveniently provided for quick access to Slic's features.

#### Channels and Invites

Users can create channels and invite users to channels. Users can also view and join non-private channels. Invited users will have the channels added to their sidebar automatically, and the channel's users list will update in real-time when users join or leave a channel.

![Join Channel](https://thumbs.gfycat.com/EthicalConstantGhostshrimp-max-14mb.gif)

Users can create private channels, which can be joined only through invites and are not visible to others. Private channels are protected on the server side; the server will reject a request to access or view the messages of a channel that the user is not a part of. Attempts to access an invalid or inaccessible channel ID will automatically redirect the user back to their previous channel.

![Private Channels](https://thumbs.gfycat.com/AridRigidDegu-max-14mb.gif)

#### Messages

Slic enables its users to send and receive messages in real-time via Pusher. Joining a channel generates a new connection to the server. When a user submits a new message, the client notifies the server to push the new message to those who are connected to that specific channel.

![Channel Message](https://thumbs.gfycat.com/BrokenMajesticKakarikis-max-14mb.gif)

#### Direct and Group Messaging

Slic allows its users to create, browse, and hide direct messages and group messages with select people.

![DM](https://thumbs.gfycat.com/OddballEdibleHydra-max-14mb.gif)

The message index will sort itself in real-time according to the most recent activity.

![Message Index](https://thumbs.gfycat.com/FragrantLikableJackal-max-14mb.gif)

Users can create group messages by inviting multiple users to a DM.

![Group Message](https://thumbs.gfycat.com/JoyousGrizzledJavalina-max-14mb.gif)

Users can hide direct messages if the sidebar becomes too cluttered. When attempting to create a DM with a previously messaged user, Slic will show the previous DM instead of creating a new one.

![Find Preexisting DM](https://thumbs.gfycat.com/ScaryFreeFanworms-max-14mb.gif)

#### Features to Implement

* Notifications
* Editing a user
* Editing a channel
