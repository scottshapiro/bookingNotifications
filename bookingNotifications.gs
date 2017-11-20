function BookingCancellationReminder() {
  
 //we'll use this label in gmail to keep track of the cancellations that have been added to the calendar  
 var reminderLabel = "Booking Cancellation";
 var label = GmailApp.getUserLabelByName(reminderLabel);
  
 GmailApp.createLabel(reminderLabel); //create the label in case it doesn't exist already
  
 var cals = CalendarApp.getAllOwnedCalendars(); 
 var mycalendar = cals[0]; //assumes that the first calendar is the one we want to use
          
 var now = new Date();
  
 var threads = GmailApp.search('from:booking.com subject:confirmed OR subject:confirmation'); // gather all the booking.com confirmation emails
 
 //iterate over every confirmation email from booking.com
 for (i=0; i<threads.length; i++) {
   
   var thread = threads[i];
   var message = thread.getMessages()[0]; // Get first message  
   var PlainBody = message.getPlainBody();
   
   var res = PlainBody.slice(PlainBody.search('Until')+5,PlainBody.search('Cancellation cost')+100); //find the section about the cancellation
   
   var justthedate = res.match("\[A-Z\].*\(PM\|AM\)"); //grab the cancellation date
   
   var changelog;   
   if (justthedate != null) //only do this if there's a real cancellation date (some are non-cancellable)
   {  
     var cancelDate = new Date(justthedate[0]);
     
     var reminderDate = new Date();
     reminderDate.setTime(cancelDate.getTime()-(24*60*60*1000)*2); //remind 48 hours before cancellation 
     
     var propertyName = message.getFrom().match(".*<"); //grab the property name from the 'from' email address
     
     //iterate through all the labels on the thread to see if we've marked this as previously canceled.
     //this avoids multiple calendar events for the same reservation 
     var alreadyCreated=0;   
     var labels = thread.getLabels(); 
     for (var j = 0; j < labels.length; j++) {
       if(labels[j].getName()==label.getName()){
         alreadyCreated++;
       }
     }
     
     //Add to calendar if not already created, deteremined by gmail label
     if(alreadyCreated==0 && reminderDate.getTime()>now.getTime())
     {
       creation = mycalendar.createEvent(reminderLabel + '- '+ propertyName,
                                      reminderDate,
                                      cancelDate);
       label.addToThread(thread); //add the label
       changelog += "added "+propertyName+" on "+reminderDate+"\n";
     }

   
 }
 } 

  //email yourself the set of changes
  if (changelog != null) {
    MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: 'Booking.com Cancellation script ran on: ' + new Date(),
    htmlBody: changelog,
  });
  }
  
}
