RSpec.describe Upvote, type: :model do

  it { should belong_to(:user) }
  it { should belong_to(:resource) }
  it { should validate_uniqueness_of(:resource_id).scoped_to(:user_id) }

end