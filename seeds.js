const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt')
const User = require('./models/User.js');
const Post = require('./models/Post.js');
const mongoose = require('mongoose');

const mongoDb = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.dhmkhyn.mongodb.net/odin_book?retryWrites=true&w=majority"
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

 async function createRandomUser(){
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(faker.internet.password(), 10, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
        });
      }) 
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const img_url = faker.image.cats(200, 200, true)
    const user =  new User({
        first_name: firstName,
        last_name: lastName,
        email: email,
        img_url: img_url,
        password: hashedPassword
    })
    user.save((err,user)=>{
        if(err) console.log(err)
        console.log(user)
        //Create some posts
        const author_id = user._id
        const author_name = user.first_name + " " + user.last_name
       
        Array.from({ length: 3 }).forEach(() => {
          const content = faker.lorem.sentences(2)
          const date = faker.date.recent()
          const post = new Post({
           author_id: author_id,
           author_name: author_name,
           content: content,
           date: date
          })
          post.save(err=>{console.log(err)})
         });
    })
    
}

Array.from({ length: 5 }).forEach(() => {
 createRandomUser();
});
