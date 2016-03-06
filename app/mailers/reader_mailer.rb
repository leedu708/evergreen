# Reader Mailer will host all emails associated with a READER.
# That is, someone who is not a curator or admin.
class ReaderMailer < ApplicationMailer

	
	default from: "welcome@evergreen.com"

	
	# Email that gets sent after user creation
	def signup(user)
		@user = user
		mail(to: @user.email, subject: "Welcome to Evergreen!")
	end


end
