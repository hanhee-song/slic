# Database Schema

#### Users

* ```id```: integer, not null, primary key
* ```username```: string, not null, unique, indexed
* ```img_url```: string, not null
* ```password_digest```: string, not null
* ```session_token```: not null, indexed, unique
* ```created_at```: datetime, not null
* ```updated_at```: datetime, not null

#### Channels
* ```id```: integer, not null, primary key
* ```name```: string, not null, indexed, unique
* ```description```: string, not null
* ```img_url```: string, not null
* ```created_at```: datetime, not null
* ```updated_at```: datetime, not null

#### Messages
* ```id```: integer, not null, primary key
* ```body```: string, not null
* ```author_id```: integer, not null, indexed, foreign_key
* ```channel_id```: integer, not null, indexed, foreign_key
* ```parent_message_id```: integer, indexed, foreign_key
* ```created_at```: datetime, not null
* ```updated_at```: datetime, not null


* ```author_id``` references ```users```
* ```channel_id``` references ```channels```
* ```parent_message_id``` references ```messages```

#### Channel Subscriptions
* ```id```: integer, not null, primary key
* ```user_id```: integer, not null, indexed, foreign_key
* ```channel_id```: integer, not null, indexed, foreign_key
* ```[user_id, channel_id]```: indexed, unique
* ```created_at```: datetime, not null
* ```updated_at```: datetime, not null


* ```user_id``` references ```users```
* ```channel_id``` references ```channels```
