# YOUTUBE CLONE 2020.09.03 ~ 2020.10.20

Cloning Youtube with VanillaJS and NodeJS

9/3 : #0.0 ~ 2.10
9/4 : #2.11 ~ 2.14
9/5 : #2.15 ~ 2.18
9/6 ~ 9/7 : CSS Layout challenge
9/8 : #2.19 ~ 2.22
9/9 : CSS Layout challenge
9/10 : #2.23 ~ 3.4
9/11 ~ 9/12 : CSS Layout challenge
9/14 : #3.5 ~ 3.7
9/15 ~ 9/19 : challenge & review #0.0 ~ 2.17
9/21 : #3.8 ~ #3.12
9/22 : #4.0 ~ #5.0
9/23 : #5.0 ~ #5.2
9/24 : review #2.18 ~ 2.25
9/25 : challenge & #6.0 ~ 6.5
9/27 : #6.6 ~ #6.10
9/28 : #7.0 ~ #7.3
9/29 : #7.4
9/30 : #8.0
10/5 : #8.1 & JSchallenge
10/6 : #8.2 ~ #8.6 & JSchallenge
10/7 : #9.0 ~ #9.2 & JSchallenge
10/8 : #10.0 ~ #10.2 & JSchallege
10/9 : JSchallenge
10/10 : #10.3 ~ #10.5 finish
10/12 : #11.0 ~ #11.1 AWS S3
10/13 : #11.4 MongoDB Cloud
10/14 ~ 10/15 : # 11.5 Building for Production
10/16 ~ 10/19 : #11.6 ~ #11.7 Heroku
10/20 : #11.8 ~ #11.9 Flash Message

## Pages:

- [x] Home
- [x] Join
- [x] Login
- [x] Social Login
- [x] Search
- [x] User Detail
- [x] Edit Profile
- [x] Change Password
- [x] Upload
- [x] Video Detail
- [x] Edit Video

## Server Start

- npm run dev:server
- npm run dev:assets (different console) // webpack
- brew services run mongodb-community // mongoDB실행
- mongo & mongod 실행시켜 mongoDB 정상작동 확인해주기.
- npm start | heroku
- npm run build && npm run start | #11.5 이후 (css변동시 재시작 필요)

## Heroku

- code 변동시 순서대로 진행

  > git add .
  > git commit -m "변동내용"
  > git push heroku master

- env, db등 변동시
  > heroku config:push
  > heroku config 으로 변동 내용 확인후 진행

## Data Base

> use yourube > show collections > video

> use yourube > db.users.find({})

> use yourube > db.users.remove({}) || db.videos.remove({})
