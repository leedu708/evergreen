desc "Weekly email update for our users"
task :weekly_email => :environment do
  puts "Should we send this email? (Only on Sundays)"
  
  if Time.now.wday == 0
  	puts "Yes, sending weekly email..."
  	users = User.all
  	collections = Collection.all

  	# Right now we're going to send this to every user on Sunday
  	users.each do |user|
  		ReaderMailer.weekly_email(user, collections).deliver_now
  	end
  	
  end
  
  puts "All emails sent"
end