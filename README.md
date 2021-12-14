# Forum system

Regular forum system based on technologies:
* Frontend is developed using reactjs
* Backend is firebase, including auth, firestore and file storage services.

##Features
* Core user content in the forum system is loaded in categories, subcategories, posts and comments. Over the registration user can upload and avatar as image, which will be loaded on any post where the user has a comment/s. Every comment have additional feature where any registered user can like or dislike selected comment, with this approach all readers can find fast valuable comments. Categories, subcategories, posts and comments are rendered on frontend in real time.

##Available user roles:
* Guest - user who don't have registration in the forum.
* User and Admin roles - they require additional registration in the forum.

##Permissions
* Guest role - can browse over all categories, subcategories, posts and comments. There no restriction regarding read permissions over counted things. Have also access to register and login page.
* User role - can change profile data e.g. display name, avatar. Also can edit the post and comments which he create it.
* Admin role. have full read and write permissions over catagories, subcategories, posts and comments. Have additional access to admin menu.

