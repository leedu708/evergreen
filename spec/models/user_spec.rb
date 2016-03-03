RSpec.describe User, type: :model do

  it { should have_many(:resources).with_foreign_key(:owner_id).dependent(:destroy) }

  it { should have_many(:upvotes).dependent(:destroy) }
  it { should have_many(:upvoted_resources).through(:upvotes) }

end