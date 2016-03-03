RSpec.describe Resource, type: :model do

  it { should belong_to(:owner) }
  it { should belong_to(:collection) }
  it { should have_many(:upvotes).dependent(:destroy) }
  it { should have_many(:upvoted_users).through(:upvotes) }

end