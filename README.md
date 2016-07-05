# Blog application

Simple Blog application for reading, writing blogs. Write the blogs and when moderator publish them everyone can see your blogs.

##setup

Run following commands to run the server after installing node and npm.

``` npm install ```

``` bower install ```

##Features:

* Reading blogs.
* Writing blogs.
* Blog Moderations.
* Search in blogs.
* Sorting of users with different parameters.
* Search in users for admin.


##User And Data Flow

There are two types of users:

* normal user
* admin

### Normal User:

* Can read blogs
* Can write Blogs  -> Moderation by admin -> Published

### Admin:

* Can read blogs.
* Publish the blogs.
* Can view the list of all the users.
* Can activate of deactivate user.
