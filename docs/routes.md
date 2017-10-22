# Routes

## HTML
* ```GET /``` ```StaticPagesController#root```

## API Endpoints

### ```users```
* ```GET /api/users``` - returns user information
* ```POST /api/users``` - sign up
* ```PATCH /api/users/user_id``` - update user
* ```DELETE /api/users/:user_id``` - delete user

### ```session```
* ```POST /api/sessions``` - log in
* ```DELETE /api/sessions``` - log out

### ```Channels```
* ```POST /api/channel``` - create channel
* ```GET /api/channel/:channel_id``` - returns channel
* ```PATCH /api/channel/:channel_id``` - update channel
* ```DELETE /api/channel/:channel_id``` - delete channel

### ```Channel Users```
* ```GET /api/channel/:channel_id/users``` - return all users of channel
* ```POST /api/channel/:channel_id/users/:user_id``` - subscribe user to channel
* ```DELETE /api/channel/:channel_id/users/:user_id``` - remove user from channel (not sure about this)

### ```Messages```
* ```POST /api/messages``` - create message
* ```DELETE /api/messages/:message_id``` - delete message

## frontend routes

* ```/``` - front page
* ```/get-started``` - sign up page
* ```/sign-in``` - sign in page
* ```/channel/:channel_id``` - channel at :channel_id
* ```/channel/:channel_id/details``` - details panel
