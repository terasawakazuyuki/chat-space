## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique:true|
|email|string|null: false, unique: true|

### Assciation
- has_many :groups
- has_many :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|null: false, foreign_key: true|
|image|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Assosiation
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

###Assosiation
- has_many :users
- has_many :messages
_ has_many :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
