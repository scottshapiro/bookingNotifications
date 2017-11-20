# bookingNotifications

## Who should use this?
Anyone who uses Booking.com to reserve hotels and doesn't want to miss the cancellation window

### Assumes that you:
1. Use booking.com to book hotels that allow for cancellations
2. Have booking.com confirmation emails sent to your gmail address
3. Use Google Calendar and receive notifications

This works by scanning your email for booking.com confirmations, 
then creating calendar events 48 hours before a booking needs to be cancelled. 
It emails you every time a calendar event is created to confirm successful operation. 

## How to
1. Copy the google script into a new project at https://script.google.com (you have to register beforehand)
2. Click the 'play' button and save the project (create whatever name)
3. Accept the permissions - click "Review permissions" in the pop up
4. Choose your gmail account
5. You'll get blocked by a "this app isn't verified", so click "advanced" in the bottom left
6. Then click "go to X" app where X is the name you chose for your project, and then click "Allow"
7. Create a "trigger" by going to "edit" -> "current project triggers". Choose whichever schedule you want

# Disclaimer

Do not solely rely on this for tracking your confirmations! 

This is simply one additional method to keep track. 

The author takes no responsibility for anything this code does, including failed notifications/

Warning: This will break if Booking changes its email template or formatting.

