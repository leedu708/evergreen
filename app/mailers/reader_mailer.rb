# Reader Mailer will host all emails associated with a READER.
# That is, someone who is not a curator or admin.
class ReaderMailer < ApplicationMailer

	
	default from: "welcome@evergreen.com"

	
	# Email that gets sent after user creation
	def signup(user)
		@user = user
		mail(to: @user.email, subject: "Welcome to Evergreen!")
	end


	# Weekly email to send out to all users
	def weekly_email(user, collections)
		@user = user

		# Let's only send the last 5 categories in our email
		@collections = collections.last(5)
		mail(to: @user.email, subject: "What's new this week from Evergreen")
	end


end
