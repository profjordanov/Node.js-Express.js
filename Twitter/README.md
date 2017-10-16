# Twitter-like app

##Route / - List 100 tweets ordered by their creation date.

##Route /tweet - This route should allow all authorized users to add a tweet to the feed. Each tweet has a message containing
maximum 140 symbols.

##Parse tags - All words starting with # in message should be considered tags.

##Route /tag/{tagName} - show all tweet messages containing the tag with tagName name. List only the latest 100 tweets.

##/profile/{username} - show information about the user with the provided username. Show his/her latest 100 tweets.
Visible to authorized users only.

##Administrator are able to edit or delete tweets.

##Routes /admins/all and admins/add - administrators can add
other users as administrators too.

##Handles - They start with @ and allow one user to mention another by his/her username.

##Likes and Views
