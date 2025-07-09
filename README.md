## Reflections

Added by az-m:

- Created modal to inform guest users they will need to log in to vote.
- Created user profile page to show user's posts and comments.
- Fixed broken aspects of dark mode and tweaked responsive styling.
- There wasn't a cancel X on the add-post form box, so I added one.

I couldn't replicate the issues mentioned in Moodle with the post titles and repeat voting, so I could not fix.

This was fun little assignment. I think people were a bit surprised that simply cloning and deploying the repo 'as is' met all the requirements! The fixes on Moodle were mainly things that I couldn't replicate - my post titles are fine and vote buttons act like a toggle as the code suggests they're meant to.

The first things I did were around fixing the dark mode CSS because I couldn't see what I was doing in the app until I did.

The one Moodle fix I definitely could replicate was the unhandled error when guest users voted, so I tackled that first with a modal.

Moving on to the features I went for the easiest one and created a profile page. Using reddit's profile page for reference, I decided to add the user's own posts and replies. On the replies view I wanted to also show the title of the post being replied to and the name of the poster. On reddit, if you reply to a comment, it tells you who you replied to, so I did the same thing.

The profile page is just for the logged in user, so attempting to access via the url when logged out, or trying other /profile/ids will give you a message and a link back to the homepage.

I believe I've met the requirements:

- deploy on Vercel and log in

and the stretch goals:

- Handle the error when you click to vote while not logged in to show a nice error message
- Future features: User profiles
