RSpec.describe Category, type: :model do

  it { should belong_to(:sector) }
  it { should have_many(:collections).with_foreign_key(:category_id).dependent(:nullify) }

end